import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

const FirestoreDebug = () => {
  const [status, setStatus] = useState('Connecting...');
  const [productCount, setProductCount] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    const testConnection = () => {
      try {
        const productsRef = collection(db, 'products');
        const unsubscribe = onSnapshot(productsRef, 
          (snapshot) => {
            setStatus('✅ Connected');
            setProductCount(snapshot.size);
            setError(null);
            console.log('🔥 Firestore Debug - Products:', snapshot.size);
          },
          (err) => {
            setStatus('❌ Error');
            setError(err.message);
            console.error('🔥 Firestore Debug Error:', err);
          }
        );
        
        return unsubscribe;
      } catch (err) {
        setStatus('❌ Failed');
        setError(err.message);
      }
    };

    const cleanup = testConnection();
    return cleanup;
  }, []);

  const testWrite = async () => {
    try {
      setStatus('🔄 Testing write...');
      await setDoc(doc(db, 'test', 'debug'), {
        timestamp: new Date().toISOString(),
        test: 'Firebase connection test'
      });
      setStatus('✅ Write successful');
    } catch (err) {
      setStatus('❌ Write failed');
      setError(err.message);
    }
  };

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px', 
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 9999,
      minWidth: '200px'
    }}>
      <div><strong>Firebase Status:</strong> {status}</div>
      <div><strong>Products:</strong> {productCount}</div>
      {error && <div style={{ color: 'red' }}><strong>Error:</strong> {error}</div>}
      <button 
        onClick={testWrite}
        style={{ 
          background: '#007bff', 
          color: 'white', 
          border: 'none', 
          padding: '5px 10px', 
          borderRadius: '3px',
          marginTop: '5px',
          cursor: 'pointer'
        }}
      >
        Test Write
      </button>
    </div>
  );
};

export default FirestoreDebug;