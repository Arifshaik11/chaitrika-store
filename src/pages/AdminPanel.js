import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import { 
  Edit, 
  Save, 
  X, 
  Package,
  Minus,
  Trash2,
  Plus
} from 'lucide-react';

const AdminPanel = () => {
  const { isAdmin } = useAuth();
  const { products, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'magnetic',
    basePrice: '',
    description: '',
    sizes: [{ size: '', price: '' }],
    shapes: [{ shape: '', price: '' }]
  });

  useEffect(() => {
    if (!isAdmin) {
      navigate('/admin');
    }
  }, [isAdmin, navigate]);

  if (!isAdmin) {
    return null;
  }

  const resetForm = () => {
    setFormData({
      name: '',
      category: 'magnetic',
      basePrice: '',
      description: '',
      sizes: [{ size: '', price: '' }],
      shapes: [{ shape: '', price: '' }]
    });
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (index, field, value) => {
    const newSizes = [...formData.sizes];
    newSizes[index][field] = value;
    setFormData(prev => ({ ...prev, sizes: newSizes }));
  };

  const addSizeField = () => {
    setFormData(prev => ({
      ...prev,
      sizes: [...prev.sizes, { size: '', price: '' }]
    }));
  };

  const removeSizeField = (index) => {
    if (formData.sizes.length > 1) {
      const newSizes = formData.sizes.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, sizes: newSizes }));
    }
  };

  const handleShapeChange = (index, field, value) => {
    const newShapes = [...formData.shapes];
    newShapes[index][field] = value;
    setFormData(prev => ({ ...prev, shapes: newShapes }));
  };

  const addShapeField = () => {
    setFormData(prev => ({
      ...prev,
      shapes: [...prev.shapes, { shape: '', price: '' }]
    }));
  };

  const removeShapeField = (index) => {
    if (formData.shapes.length > 1) {
      const newShapes = formData.shapes.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, shapes: newShapes }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.description) {
      alert('Please fill in all required fields');
      return;
    }

    // Validate sizes
    const validSizes = formData.sizes.filter(size => size.size && size.price);
    if (validSizes.length === 0) {
      alert('Please add at least one size with price');
      return;
    }

    // Validate shapes
    const validShapes = formData.shapes.filter(shape => shape.shape && shape.price !== '');
    if (validShapes.length === 0) {
      alert('Please add at least one shape with price');
      return;
    }

    setIsSubmitting(true);

    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        basePrice: parseInt(formData.basePrice) || Math.min(...validSizes.map(s => parseInt(s.price))),
        sizes: validSizes.map(size => ({
          size: size.size,
          price: parseInt(size.price)
        })),
        shapes: validShapes.map(shape => ({
          shape: shape.shape,
          price: parseInt(shape.price)
        })),
        customizable: true
      };

      await updateProduct(editingProduct.id, productData);
      alert('Product updated successfully!');

      resetForm();
    } catch (error) {
      console.error("Error updating product: ", error);
      alert("Failed to update product: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    console.log('Editing product:', product); // Debug log
    setFormData({
      name: product.name,
      category: product.category,
      basePrice: product.basePrice.toString(),
      description: product.description,
      sizes: product.sizes.map(size => ({
        size: size.size,
        price: size.price.toString()
      })),
      shapes: product.shapes ? product.shapes.map(shape => ({
        shape: shape.shape,
        price: shape.price.toString()
      })) : [{ shape: '', price: '' }]
    });
    setEditingProduct(product);
    console.log('Form data set:', formData); // Debug log
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      alert('Product deleted successfully!');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Product Management</h1>
        <div className="text-sm text-gray-600">
          Edit existing products below
        </div>
      </div>

      {/* Edit Product Form */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Product: {editingProduct.name}</h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Debug info */}
            <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
              Editing: {editingProduct.name} | Form loaded: {formData.name ? 'Yes' : 'No'}
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Product category"
                  readOnly
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter product description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sizes & Prices *
                </label>
                {formData.sizes.map((size, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={size.size}
                      onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                      placeholder="Size (e.g., 4x6)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="number"
                      value={size.price}
                      onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                      placeholder="Price"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {formData.sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSizeField(index)}
                        className="text-red-500 hover:text-red-700 px-2"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSizeField}
                  className="text-primary hover:text-blue-600 text-sm flex items-center space-x-1 bg-blue-50 px-3 py-2 rounded-md hover:bg-blue-100 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Size</span>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shapes & Prices *
                </label>
                {formData.shapes.map((shape, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={shape.shape}
                      onChange={(e) => handleShapeChange(index, 'shape', e.target.value)}
                      placeholder="Shape (e.g., Square, Round, Heart)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="number"
                      value={shape.price}
                      onChange={(e) => handleShapeChange(index, 'price', e.target.value)}
                      placeholder="Price (0 for base)"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    {formData.shapes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeShapeField(index)}
                        className="text-red-500 hover:text-red-700 px-2"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addShapeField}
                  className="text-primary hover:text-blue-600 text-sm flex items-center space-x-1 bg-blue-50 px-3 py-2 rounded-md hover:bg-blue-100 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Shape</span>
                </button>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`flex-1 text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center space-x-2 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-primary hover:bg-blue-600'
                  }`}
                >
                  <Save className="h-4 w-4" />
                  <span>
                    {isSubmitting 
                      ? 'Updating Product...' 
                      : 'Update Product'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Products ({products.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price Range
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sizes
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.image.startsWith('http') || product.image.startsWith('data:') ? product.image : `${process.env.PUBLIC_URL}${product.image}`}
                        alt={product.name}
                        className="h-12 w-12 rounded-md object-cover mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{Math.min(...product.sizes.map(s => s.price))} - 
                    ₹{Math.max(...product.sizes.map(s => s.price))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {product.sizes.length} sizes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-primary hover:text-blue-600"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No products</h3>
            <p className="mt-1 text-sm text-gray-500">
              Get started by adding a new product.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;