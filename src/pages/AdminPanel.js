import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProducts } from '../context/ProductContext';
import SEO from '../components/SEO';
import { 
   Plus,
   Edit, 
   Save, 
   X, 
   Package,
   Minus,
   Trash2,
   Upload
} from 'lucide-react';

const AdminPanel = () => {
  const { isAdmin } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const navigate = useNavigate();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState(['magnetic', 'keychain', 'acrylic', 'mdf']);
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategoryInput, setShowNewCategoryInput] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'magnetic',
    basePrice: '',
    image: '',
    imageFile: null,
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
      image: '',
      imageFile: null,
      description: '',
      sizes: [{ size: '', price: '' }],
      shapes: [{ shape: '', price: '' }]
    });
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData(prev => ({
          ...prev,
          image: event.target.result,
          imageFile: file
        }));
      };
      reader.readAsDataURL(file);
    }
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
    if (!formData.name || !formData.description || !formData.image) {
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
      let imageUrl = formData.image;

      const productData = {
        name: formData.name,
        category: formData.category,
        description: formData.description,
        image: imageUrl,
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

      if (editingProduct) {
        await updateProduct(editingProduct.id, productData);
        alert('Product updated successfully!');
      } else {
        await addProduct(productData);
        alert('Product added successfully!');
      }

      resetForm();
    } catch (error) {
      console.error("Error saving product: ", error);
      alert("Failed to save product: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      category: product.category,
      basePrice: product.basePrice.toString(),
      image: product.image,
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
    setShowAddForm(true);
  };

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(productId);
      alert('Product deleted successfully!');
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim() === '') {
      alert('Please enter a category name');
      return;
    }
    if (categories.includes(newCategory.toLowerCase())) {
      alert('This category already exists');
      return;
    }
    setCategories([...categories, newCategory.toLowerCase()]);
    setNewCategory('');
    setShowNewCategoryInput(false);
    alert(`Category "${newCategory}" added successfully!`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-white min-h-screen text-gray-900">
      <SEO
        title="Admin Panel | Chaitra Wrap & Wear"
        description="Admin panel"
        robots="noindex, nofollow"
        canonical="https://chaitrika.in/admin/panel"
      />
      <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
        <h1 className="font-display text-3xl font-semibold text-gray-900">Admin Panel</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-ink text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition-all text-xs font-semibold uppercase tracking-wider flex items-center space-x-1.5"
        >
          <Plus className="h-4 w-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Add/Edit Product Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto border border-gray-100 shadow-xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-display text-xl font-semibold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-400 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm text-gray-900 transition-colors"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Category *
                </label>
                <div className="flex space-x-2">
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm text-gray-900 transition-colors bg-white"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowNewCategoryInput(!showNewCategoryInput)}
                    className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-xs font-medium text-gray-650 transition-colors flex items-center space-x-1"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>Add Category</span>
                  </button>
                </div>
                
                {showNewCategoryInput && (
                  <div className="mt-3 flex space-x-2">
                    <input
                      type="text"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      placeholder="Enter new category name"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm text-gray-900 transition-colors"
                    />
                    <button
                      type="button"
                      onClick={handleAddCategory}
                      className="px-3 py-2 bg-ink text-white rounded-lg text-xs font-semibold"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewCategoryInput(false);
                        setNewCategory('');
                      }}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Product Image *
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full px-4 py-4 border border-dashed border-gray-200 rounded-lg cursor-pointer hover:border-[#C9897A] transition-colors bg-[#F8F8F8]"
                  >
                    <div className="text-center">
                      {formData.image ? (
                        <div>
                          <img
                            src={formData.image}
                            alt="Preview"
                            className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                          />
                          <p className="text-xs text-[#C9897A] font-semibold uppercase tracking-wider">Change image</p>
                        </div>
                      ) : (
                        <div>
                          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs text-gray-600 font-medium">Click to upload image</p>
                          <p className="text-[10px] text-gray-400 mt-0.5">PNG, JPG, GIF</p>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm text-gray-900 transition-colors resize-none"
                  placeholder="Enter product description"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Sizes & Prices *
                </label>
                {formData.sizes.map((size, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={size.size}
                      onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                      placeholder="Size (e.g., 4x6)"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm text-gray-900 transition-colors"
                    />
                    <input
                      type="number"
                      value={size.price}
                      onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                      placeholder="Price"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm text-gray-900 transition-colors"
                    />
                    {formData.sizes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSizeField(index)}
                        className="text-gray-400 hover:text-red-500 px-2"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addSizeField}
                  className="inline-flex items-center space-x-1 bg-gray-50 border border-gray-155 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Size</span>
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                  Shapes & Prices *
                </label>
                {formData.shapes.map((shape, index) => (
                  <div key={index} className="flex space-x-2 mb-2">
                    <input
                      type="text"
                      value={shape.shape}
                      onChange={(e) => handleShapeChange(index, 'shape', e.target.value)}
                      placeholder="Shape (e.g., Square)"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm text-gray-900 transition-colors"
                    />
                    <input
                      type="number"
                      value={shape.price}
                      onChange={(e) => handleShapeChange(index, 'price', e.target.value)}
                      placeholder="Price (0 for base)"
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm text-gray-900 transition-colors"
                    />
                    {formData.shapes.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeShapeField(index)}
                        className="text-gray-400 hover:text-red-500 px-2"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addShapeField}
                  className="inline-flex items-center space-x-1 bg-gray-50 border border-gray-155 text-gray-600 px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                  <span>Add Shape</span>
                </button>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2 rounded-lg font-semibold text-xs uppercase tracking-wider text-white flex items-center justify-center space-x-1.5 transition-all"
                  style={{
                    background: isSubmitting ? '#9CA3AF' : '#111111',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Save className="h-4 w-4" />
                  <span>
                    {isSubmitting 
                      ? 'Saving...' 
                      : (editingProduct ? 'Update Product' : 'Add Product')}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={isSubmitting}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider hover:bg-gray-250 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Products List */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-sm font-semibold uppercase tracking-wider flex items-center text-gray-700">
            <Package className="h-4 w-4 mr-2 text-[#C9897A]" />
            Products ({products.length})
          </h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F8F8F8]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Price Range
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Sizes
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {products.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={product.image.startsWith('http') || product.image.startsWith('data:') ? product.image : `${process.env.PUBLIC_URL}${product.image}`}
                        alt={product.name}
                        className="h-10 w-10 rounded border border-gray-100 object-cover mr-4"
                      />
                      <div>
                        <div className="text-xs font-semibold text-gray-900">
                          {product.name}
                        </div>
                        <div className="text-xs text-gray-400 truncate max-w-xs mt-0.5">
                          {product.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-[#F2E8E5] text-[#C9897A] capitalize">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-semibold text-gray-900">
                    ₹{Math.min(...product.sizes.map(s => s.price))} - 
                    ₹{Math.max(...product.sizes.map(s => s.price))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-500">
                    {product.sizes.length} sizes
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs font-medium">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="text-gray-400 hover:text-[#C9897A] transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
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
            <Package className="mx-auto h-12 w-12 text-gray-300" />
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