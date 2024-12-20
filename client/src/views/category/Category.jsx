import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Footer from "../../components/general/Footer";
import { useCategoryLogic } from "../../components/category/CategoryLogic";
import CategoryForm from "../../components/category/CategoryForm";

const Category = () => {
  const {
    categories,
    searchTerm,
    setSearchTerm,
    editingCategory,
    handleDelete,
    handleSearch,
    handleEdit,
    handleSave,
    handleCreate,
  } = useCategoryLogic();

  const userRole = localStorage.getItem("role");

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <main className="flex-grow p-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-4">
            <Link
              to="/"
              className="flex items-center text-green-400 hover:text-green-300 transition"
            >
              <ArrowLeftIcon className="h-6 w-6 mr-2" />
              Return Home
            </Link>
          </div>

          <h1 className="text-4xl font-bold text-center text-green-400 mb-8">
            Categories
          </h1>

          <div className="flex items-center mb-8 space-x-4">
            <input
              type="text"
              placeholder="Search categories by name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow px-4 py-2 bg-gray-700 text-green-300 border border-purple-600 rounded-md shadow-sm focus:ring focus:ring-green-500 focus:border-green-500"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 transition"
            >
              Search
            </button>
          </div>

          {userRole === "ADMIN" && (
            <div className="flex justify-center mb-6">
              <button
                onClick={handleCreate}
                className="mb-6 w-full px-4 py-2 bg-violet-600 text-white font-semibold rounded-md hover:bg-violet-700 transition"
              >
                Create Category
              </button>
            </div>
          )}

          {editingCategory && (
            <div className="mb-8 p-6 bg-gray-800 rounded-lg shadow-lg">
              <CategoryForm category={editingCategory} onSave={handleSave} />
            </div>
          )}

          <ul className="space-y-6">
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <li
                  key={category.id}
                  className="p-6 bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
                >
                  <div className="flex-grow md:ml-6 space-y-2">
                    <h3 className="text-3xl font-bold text-green-400">
                      {category.description}
                    </h3>
                    <h2 className="text-sm font-bold text-gray-400 mb-2">
                      ID: {category.id}
                    </h2>
                  </div>

                  {userRole === "ADMIN" && (
                    <div className="flex space-x-4 mt-4 md:mt-0">
                      <button
                        onClick={() => handleEdit(category)}
                        className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition w-32"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-500 transition w-32"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <li className="p-6 rounded-lg shadow-md text-center text-gray-400">
                No Categories Available
              </li>
            )}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Category;
