import { useState } from "react";

const Order = () => {
  const { orders, deleteOrder } = useOrderLogic();
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(null);

  const filteredOrders = orders.filter((order) =>
    order.id.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">My Orders</h1>
      {orders && orders.length > 0 ? (
        <div className="container mx-auto py-10 px-4">
          <h1 className="text-2xl font-bold mb-6">My Orders</h1>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
            <div className="relative w-full md:w-auto">
              <input
                type="search"
                placeholder="Search orders..."
                className="pl-4 pr-4 py-2 w-full md:w-[300px] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-md">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left">Order ID</th>
                  <th className="py-2 px-4 border-b text-left">Date</th>
                  <th className="py-2 px-4 border-b text-left">Total</th>
                  <th className="py-2 px-4 border-b text-left">Status</th>
                  <th className="py-2 px-4 border-b text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="py-2 px-4 border-b font-medium">
                      {order.id}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${order.status}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b text-right">
                      <div className="relative inline-block text-left">
                        <button
                          onClick={() =>
                            setIsDropdownOpen(
                              isDropdownOpen === order.id ? null : order.id
                            )
                          }
                          className="px-2 py-1 rounded-md bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          Actions
                        </button>
                        {isDropdownOpen === order.id && (
                          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div
                              className="py-1"
                              role="menu"
                              aria-orientation="vertical"
                              aria-labelledby="options-menu"
                            >
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                View details
                              </a>
                              <a
                                href="#"
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                Track shipment
                              </a>
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100"
                                role="menuitem"
                              >
                                Delete order
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  );
};
export default Order;
