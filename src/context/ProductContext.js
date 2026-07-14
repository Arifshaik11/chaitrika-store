import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

const defaultProducts = [
  {
    id: '1',
    name: 'Magnetic Photo Frame',
    category: 'magnetic',
    basePrice: 299,
    sizes: [
      { size: '2.5"x3.5"', price: 199 },
      { size: '4x6"', price: 299 },
      { size: '5x7"', price: 399 }
    ],
    shapes: [
      { shape: 'Rectangle', price: 0 },
      { shape: 'Square', price: 50 },
      { shape: 'Round', price: 75 },
      { shape: 'Heart', price: 100 }
    ],
    image: '/images/1.jpg',
    images: [
      '/images/1.jpg'
    ],
    description: 'Premium magnetic frames with clear acrylic - perfect for displaying your favorite moments on any metal surface',
    customizable: true
  },
  {
    id: '2',
    name: 'Custom Keychain',
    category: 'keychain',
    basePrice: 149,
    sizes: [
      { size: 'Small (2x2)', price: 149 },
      { size: 'Medium (3x3)', price: 199 }
    ],
    shapes: [
      { shape: 'Rectangle', price: 0 },
      { shape: 'Circle', price: 30 },
      { shape: 'Square', price: 30 },
      { shape: 'Star', price: 50 }
    ],
    image: '/images/keychain.jpeg',
    description: 'Personalized keychains with your favorite photos - durable and stylish accessories for your keys',
    customizable: true
  },
  {
    id: '3',
    name: 'Acrylic Photo Frame',
    category: 'acrylic',
    basePrice: 799,
    sizes: [
      { size: '4x6', price: 799 },
      { size: '5x7', price: 999 },
      { size: '8x10', price: 1299 },
      { size: '11x14', price: 1799 }
    ],
    shapes: [
      { shape: 'Rectangle', price: 0 },
      { shape: 'Square', price: 100 },
      { shape: 'Oval', price: 150 },
      { shape: 'Hexagon', price: 200 }
    ],
    image: '/images/2.jpg',
    description: 'Premium acrylic frames with crystal clear transparency - modern display solution for your treasured photos',
    customizable: true
  },
  {
    id: '4',
    name: 'MDF Photo Frame',
    category: 'mdf',
    basePrice: 399,
    sizes: [
      { size: '4x6', price: 399 },
      { size: '5x7', price: 499 },
      { size: '8x10', price: 699 },
      { size: '11x14', price: 999 }
    ],
    shapes: [
      { shape: 'Rectangle', price: 0 },
      { shape: 'Square', price: 75 },
      { shape: 'Rounded', price: 100 },
      { shape: 'Wave', price: 150 }
    ],
    image: '/images/mdf.jpeg',
    description: 'Elegant MDF frames available in multiple finishes - lightweight yet durable wooden photo frames',
    customizable: true
  }
];

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(defaultProducts);
  const [loading, setLoading] = useState(true);

  // Fetch products from Supabase on mount
  useEffect(() => {
    const fetchAndSubscribe = async () => {
      try {
        // Initial fetch
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching products:', error);
          setLoading(false);
          return;
        }

        if (data && data.length > 0) {
          console.log('Products fetched:', data.length);
          setProducts(data);
        } else {
          console.log('No products found, using defaults');
          setProducts(defaultProducts);
        }

        setLoading(false);

        // Set up real-time subscription
        const subscription = supabase
          .channel('products-realtime')
          .on(
            'postgres_changes',
            { event: '*', schema: 'public', table: 'products' },
            (payload) => {
              console.log('Product change detected:', payload);
              // Refetch all products when changes occur
              fetchAll();
            }
          )
          .subscribe();

        return () => {
          subscription.unsubscribe();
        };
      } catch (err) {
        console.error('Error in fetchAndSubscribe:', err);
        setLoading(false);
      }
    };

    const fetchAll = async () => {
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      if (data) {
        setProducts(data);
      }
    };

    fetchAndSubscribe();
  }, []);

  const addProduct = async (productData) => {
    try {
      const newProduct = {
        id: Date.now().toString(),
        name: productData.name,
        category: productData.category,
        "basePrice": productData.basePrice || 0,
        description: productData.description,
        image: productData.image,
        sizes: productData.sizes || [],
        shapes: productData.shapes || [],
        customizable: true
      };

      const { data, error } = await supabase
        .from('products')
        .insert([newProduct])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(`Failed to add product: ${error.message}`);
      }

      console.log('Product added successfully:', data);
      // Use returned data if available
      if (data && data.length > 0) {
        setProducts([...products, data[0]]);
        return data[0];
      }
      setProducts([...products, newProduct]);
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const cleanData = {
        name: productData.name,
        category: productData.category,
        "basePrice": productData.basePrice || 0,
        description: productData.description,
        image: productData.image,
        sizes: productData.sizes || [],
        shapes: productData.shapes || [],
        customizable: true
      };

      const { error } = await supabase
        .from('products')
        .update(cleanData)
        .eq('id', id);

      if (error) {
        throw new Error(`Failed to update product: ${error.message}`);
      }

      const updatedProducts = products.map(p =>
        p.id === id ? { ...p, ...cleanData } : p
      );
      setProducts(updatedProducts);
      console.log('Product updated successfully');
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const deleteProduct = async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error(`Failed to delete product: ${error.message}`);
      }

      const filteredProducts = products.filter(p => p.id !== id);
      setProducts(filteredProducts);
      console.log('Product deleted successfully');
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  };

  const getProduct = (id) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{
      products,
      loading,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};
