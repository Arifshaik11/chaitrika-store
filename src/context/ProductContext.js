import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

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

// Map of default product IDs to their correct image paths
const defaultImageMap = {};
defaultProducts.forEach(p => { defaultImageMap[p.id] = p.image; });

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('products');
    let productsToUse = defaultProducts;
    
    if (savedProducts) {
      try {
        const parsed = JSON.parse(savedProducts);
        // Ensure all products have correct shapes and images
        productsToUse = parsed.map(product => {
          const defaultProduct = defaultProducts.find(p => p.id === product.id);
          return {
            ...product,
            // For default products, always use the correct image path from code
            // This prevents stale/corrupted localStorage data from breaking images
            image: defaultImageMap[product.id] || product.image,
            shapes: product.shapes && product.shapes.length > 0 
              ? product.shapes 
              : defaultProduct?.shapes || []
          };
        });
      } catch (error) {
        console.error('Error parsing saved products:', error);
        productsToUse = defaultProducts;
      }
    }
    
    setProducts(productsToUse);
    localStorage.setItem('products', JSON.stringify(productsToUse));
  }, []);

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: uuidv4()
    };
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const updateProduct = (id, productData) => {
    const updatedProducts = products.map(product =>
      product.id === id ? { ...product, ...productData } : product
    );
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter(product => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
  };

  const getProduct = (id) => {
    return products.find(product => product.id === id);
  };

  return (
    <ProductContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      getProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};