import { useEffect, useState } from 'react';
import api from '../../api/Api';

export const useProductLogic = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [productAdded, setProductAdded] = useState(false);
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setAllProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories/getAll', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (productAdded) {
      fetchProducts();
      setProductAdded(false);
    }
  }, [productAdded]);

  const handleSearch = () => {
    const filteredProducts = allProducts.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const handleCategoryFilter = (categoryId) => {
    if (categoryId === '') {
      setProducts(allProducts);
    } else {
      const filteredProducts = allProducts.filter((product) => product.categoryId === parseInt(categoryId));
      setProducts(filteredProducts);
    }
    setSelectedCategory(categoryId);
  };

  const handleSortOrderChange = (order) => {
    if (!['asc', 'desc'].includes(order)) {
      console.error("Invalid sort order. Use 'asc' or 'desc'.");
      return;
    }
  
    const sortedProducts = [...allProducts].sort((a, b) => {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
  
    setProducts(sortedProducts);
  };
  

  const handleDelete = async (productId) => {
    console.log('Deleting product with ID:', productId);
    console.log('Token:', token); 
    console.log('User Role:', localStorage.getItem('role')); 
    try {
      await api.delete(`/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
      setProducts(products.filter(product => product.id !== productId));
      setAllProducts(allProducts.filter(product => product.id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleSave = async (product) => {
    try {
      if (product.id) {
        await api.put(`/products/${product.id}`, product);
      } else {
        await api.post('/products', product);
      }
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await api.get(`/carts/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`, 
        },
      });

      const cartId = response.data.id;

      return cartId;
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };
  
  const addProductToCart = async (productId, quantity) => {
    const cartId = await fetchCart();

    try {
      await api.post('/carts/addProduct', {
        cartId,
        productId,
        quantity,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      setProductAdded(true);

    } catch (err) {
      console.error('Error adding product:', err);
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
