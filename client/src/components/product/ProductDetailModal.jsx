import React from 'react';
import Modal from '../../components/product/Modal'; 

const ProductDetailModal = ({ isOpen, onClose, product }) => {
  if (!product) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-2xl mx-auto p-4"> 
      <h2 className="text-xl font-bold text-green-400 text-center mb-4">{product.name}</h2> 
      <img 
        src={product.image ? `http://localhost:5000${product.image}` : '/images/placeholder.png'} 
        alt={product.name} 
        className="w-48 h-auto mx-auto rounded-md mb-4" /> 

      <div className="text-center"> 
        <p className="text-purple-400 mt-2">{product.description}</p> 
        <p className="text-gray-400">Precio: ${product.price}</p>
        <p className="text-gray-400">Stock: {product.stockQuantity}</p>
        <p className="text-gray-400">Categoria: {product.categoryDescription}</p>
      </div>
      
      <div className="flex justify-center mt-4"> 
        <button 
          onClick={onClose} 
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default ProductDetailModal;
