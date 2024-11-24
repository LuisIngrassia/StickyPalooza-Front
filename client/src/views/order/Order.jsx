import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Footer from "../../components/general/Footer";
import { useOrderLogic } from "../../components/order/OrderLogic";
import ConvertToBill from "../../components/bill/ConvertToBill";

const Order = () => {
  const {
    orders: initialOrders,
    loading,
    error,
    deleteOrder,
    searchUserId,
    handleSearchChange,
    handleSearch,
  } = useOrderLogic();
  const [orders, setOrders] = useState(initialOrders);

  useEffect(() => {
    setOrders(initialOrders);
  }, [initialOrders]);

  // if (loading) return <div className="text-green-300">Cargando...</div>;
  // if (error) return <div className="text-red-500">{error}</div>;

  const handleConversion = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  const userRole = localStorage.getItem("role");

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 p-6">
      <div className="flex items-center mb-4 mt-2 ml-2">
        <Link
          to="/"
          className="flex items-center text-green-400 hover:text-green-300 transition"
        >
          <ArrowLeftIcon className="h-6 w-6 mr-2" />
          Volver al Menú
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-green-400 text-center">
        {userRole === "ADMIN" ? "Orders" : "Tus Ordenes"}
      </h1>

      {userRole === "ADMIN" && (
        <div className="mb-6 text-center">
          <input
            type="text"
            value={searchUserId}
            onChange={handleSearchChange}
            placeholder="Enter User ID"
            className="border rounded-md p-2 border-purple-600 bg-gray-700 text-green-300 focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-200"
          />
          <button
            onClick={handleSearch}
            className="bg-green-600 text-white px-4 py-2 rounded-md ml-2 transition duration-200 hover:bg-purple-500"
          >
            Buscar Ordenes
          </button>
        </div>
      )}

      <div className="flex flex-col items-center space-y-4 flex-grow">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border border-gray-700 p-6 rounded-lg bg-gray-800 shadow-md transition duration-200 hover:shadow-lg w-full max-w-2xl"
          >
            <h2 className="font-bold text-purple-300 mb-2">
              Orden ID: {order.id} | Fecha:{" "}
              {new Date(order.orderDate).toLocaleDateString()}
            </h2>

            <div className="mt-2">
              <h3 className="font-semibold text-green-300 mb-2">Productos:</h3>
              <table className="table-auto w-full text-gray-400">
                <thead>
                  <tr className="border-b border-gray-600">
                    <th className="px-4 py-2 text-left">Nombre Producto</th>
                    <th className="px-4 py-2 text-left">Cantidad</th>
                    <th className="px-4 py-2 text-left">Precio Unitario</th>
                    <th className="px-4 py-2 text-left">Precio Total</th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderProducts.map((product) => (
                    <tr
                      key={product.productId}
                      className="border-b border-gray-600"
                    >
                      <td className="px-4 py-2">{product.productName}</td>
                      <td className="px-4 py-2">{product.quantity}</td>
                      <td className="px-4 py-2">
                        ${product.productPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-2">
                        ${(product.productPrice * product.quantity).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-center mt-4">
              <p className="font-bold text-purple-400 mb-4">
                Cantidad Total: ${order.totalAmount.toFixed(2)}
              </p>
            </div>

            {!order.convertedToBill && userRole === "USER" && (
              <div className="flex justify-center mt-4">
                <ConvertToBill
                  orderId={order.id}
                  onConvert={handleConversion}
                />
              </div>
            )}

            <div className="flex justify-center mt-4">
              {order.convertedToBill ? (
                <p className="text-red-500">Sellado</p>
              ) : (
                <button
                  onClick={() => deleteOrder(order.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md transition duration-200 hover:bg-red-500"
                >
                  Borrar Orden
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Order;
