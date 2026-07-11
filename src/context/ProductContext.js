import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { doc, setDoc, collection, onSnapshot, addDoc, updateDoc, deleteDoc, getDocs, query } from 'firebase/firestore';
import { db } from '../firebase';

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
  const [products, setProducts] = useState(() => {
    // Load from localStorage on initial load
    try {
      const saved = localStorage.getItem('chaitrika_products');
      return saved ? JSON.parse(saved) : defaultProducts;
    } catch (error) {
      console.error('Error loading products from localStorage:', error);
      return defaultProducts;
    }
  });

  const [isInitialized, setIsInitialized] = useState(false);

  // Fetch products from Firestore on component mount
  useEffect(() => {
    const fetchProductsFromFirestore = async () => {
      try {
        const productsRef = collection(db, 'products');
        const unsubscribe = onSnapshot(productsRef, async (snapshot) => {
          if (!snapshot.empty) {
            const firestoreProducts = snapshot.docs.map(doc => ({
              id: doc.id,
              ...doc.data()
            }));
            setProducts(firestoreProducts);
            localStorage.setItem('chaitrika_products', JSON.stringify(firestoreProducts));
            console.log('Products loaded from Firestore:', firestoreProducts);
            setIsInitialized(true);
          } else {
            // If Firestore is empty, initialize with default products
            console.log('Firestore is empty, initializing with default products...');
            await initializeDefaultProducts();
            setIsInitialized(true);
          }
        });
        return unsubscribe;
      } catch (error) {
        console.error('Error fetching products from Firestore:', error);
        setIsInitialized(true);
      }
    };

    const initializeDefaultProducts = async () => {
      try {
        for (const product of defaultProducts) {
          await setDoc(doc(db, 'products', product.id), product);
        }
        setProducts(defaultProducts);
        localStorage.setItem('chaitrika_products', JSON.stringify(defaultProducts));
        console.log('Default products initialized in Firestore');
      } catch (error) {
        console.error('Error initializing default products:', error);
      }
    };

    fetchProductsFromFirestore();
  }, []);

  // Save to localStorage whenever products change
  useEffect(() => {
    try {
      localStorage.setItem('chaitrika_products', JSON.stringify(products));
      console.log('Products saved to localStorage');
    } catch (error) {
      console.error('Error saving products to localStorage:', error);
    }
  }, [products]);

  const addProduct = (productData) => {
    try {
      const newProduct = {
        ...productData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };
      
      // Add to Firestore
      setDoc(doc(db, 'products', newProduct.id), newProduct).then(() => {
        console.log('Product saved to Firestore:', newProduct);
      }).catch(error => {
        console.error('Error saving to Firestore:', error);
      });

      setProducts([...products, newProduct]);
      console.log('Product added successfully:', newProduct);
    } catch (error) {
      console.error("Error adding product: ", error);
      throw error;
    }
  };

  const updateProduct = (id, productData) => {
    try {
      const updatedProducts = products.map(p => 
        p.id === id ? { ...p, ...productData } : p
      );
      
      // Update in Firestore
      updateDoc(doc(db, 'products', id), productData).then(() => {
        console.log('Product updated in Firestore');
      }).catch(error => {
        console.error('Error updating in Firestore:', error);
      });

      setProducts(updatedProducts);
      console.log('Product updated successfully');
    } catch (error) {
      console.error("Error updating product: ", error);
      throw error;
    }
  };

  const deleteProduct = (id) => {
    try {
      const filteredProducts = products.filter(p => p.id !== id);
      
      // Delete from Firestore
      deleteDoc(doc(db, 'products', id)).then(() => {
        console.log('Product deleted from Firestore');
      }).catch(error => {
        console.error('Error deleting from Firestore:', error);
      });

      setProducts(filteredProducts);
      console.log('Product deleted successfully');
    } catch (error) {
      console.error("Error deleting product: ", error);
      throw error;
    }
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