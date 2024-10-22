import { useEffect, useState } from 'react';
import api from '../../api/Api';

export const useProductLogic = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // Store all products for sorting and filtering
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const token = localStorage.getItem('token'); // Assuming the token is stored in local storage

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setAllProducts(response.data); // Set both all products and products state
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Categories Response:', response.data);
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        console.error('Expected an array for categories, but received:', response.data);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // UseEffect to fetch products and categories on component mount
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  // Handle search functionality
  const handleSearch = () => {
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  // Handle filtering products by category
  const handleCategoryFilter = (categoryId) => {
    if (categoryId === '') {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter((product) => product.categoryId === parseInt(categoryId));
      setProducts(filteredProducts);
    }
    setSelectedCategory(categoryId);
  };

  // Handle sorting of products
  const handleSortOrderChange = (order) => {
    let sortedProducts = [...allProducts]; // Make a copy of the original product list

    if (order === 'asc') {
      sortedProducts.sort((a, b) => a.price - b.price); // Sort from cheapest to expensive
    } else if (order === 'desc') {
      sortedProducts.sort((a, b) => b.price - a.price); // Sort from expensive to cheapest
    }

    setProducts(sortedProducts); // Update the displayed products
  };

  // Handle product deletion
  const handleDelete = async (productId) => {
    try {
      await api.delete(`/products/${productId}`);
      fetchProducts(); // Re-fetch products after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle setting product for editing
  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  // Handle saving product (add/edit)
  const handleSave = async (product) => {
    try {
      if (product.id) {
        await api.put(`/products/${product.id}`, product);
      } else {
        await api.post('/products', product);
      }
      fetchProducts(); // Re-fetch products after saving
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  // Handle adding product to cart
  const addProductToCart = async (productId, quantity) => {
    try {
      await api.post('/cart', { productId, quantity });
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return {
    products,
    fetchProducts,
    searchTerm,
    setSearchTerm,
    editingProduct,
    selectedCategory,
    setSelectedCategory,
    categories,
    handleDelete,
    handleSearch,
    handleEdit,
    handleSave,
    addProductToCart,
    handleCategoryFilter,
    handleSortOrderChange,
  };
};
