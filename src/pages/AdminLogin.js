import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock } from 'lucide-react';
import SEO from '../components/SEO';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, isAdmin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAdmin) {
      navigate('/admin/panel');
    }
  }, [isAdmin, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = login(credentials.username, credentials.password);
      
      if (success) {
        navigate('/admin/panel');
      } else {
        setError('Invalid username or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SEO
        title="Admin Login | Chaitra Wrap & Wear"
        description="Admin login page"
        robots="noindex, nofollow"
        canonical="https://chaitrika.in/admin"
      />
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-center font-display text-3xl font-semibold text-gray-900">
            Admin Login
          </h2>
          <p className="mt-2 text-center text-xs text-gray-400 uppercase tracking-wider">
            Access the admin control center
          </p>
        </div>
        
        <div className="mt-8 bg-[#F8F8F8] border border-[#EBEBEB] py-8 px-6 rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-650 rounded-md text-xs font-medium">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm transition-colors bg-white"
                  placeholder="Enter username"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#C9897A] text-sm transition-colors bg-white"
                  placeholder="Enter password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-lg font-medium text-sm text-white flex justify-center transition-all"
              style={{
                background: isLoading ? '#9CA3AF' : '#111111',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          
          <div className="mt-6 p-4 bg-white rounded-md border border-[#EBEBEB] text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-700">
              🔐 Secure Access
            </p>
            <p className="text-[10px] text-gray-450 mt-1">
              Contact administrator for credentials.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;