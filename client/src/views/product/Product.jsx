import React from 'react';
import { useProductLogic } from '../../components/product/ProductLogic';
import ProductForm from '../../components/product/ProductForm';

const Product = () => {
  const {
    products,
    searchTerm,
    setSearchTerm,
    editingProduct,
    handleDelete,
    handleSearch,
    handleEdit,
    handleSave
  } = useProductLogic();

  return (
    <div>
      <h1>Products</h1>
      <input
        type="text"
        placeholder="Search products by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {editingProduct && (
        <ProductForm product={editingProduct} onSave={handleSave} />
      )}

      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Stock: {product.stockQuantity}</p>
            <p>Category ID: {product.categoryId}</p>
            {product.image && (
              <img src={product.image} alt={product.name} width="100" />
            )}
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Product;
