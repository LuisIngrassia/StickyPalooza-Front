import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createContact,
  updateContact,
  fetchContactById,
} from "../../features/ContactSlice";

const ContactForm = ({ contactId }) => {
  const dispatch = useDispatch();

  const [contact, setContact] = useState({
    fullName: "",
    problemType: "",
    description: "",
  });

  const {
    status,
    error,
    contact: contactFromStore,
  } = useSelector((state) => state.contact);

  useEffect(() => {
    if (contactId) {
      dispatch(fetchContactById(contactId));
    }
  }, [contactId, dispatch]);

  useEffect(() => {
    if (contactFromStore) {
      setContact({
        fullName: contactFromStore.fullName,
        problemType: contactFromStore.problemType,
        description: contactFromStore.description,
      });
    }
  }, [contactFromStore]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (contactId) {
      dispatch(updateContact({ id: contactId, contactDTO: contact }));
    } else {
      dispatch(createContact(contact));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {contactId ? "Update Contact" : "Contact Us"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={contact.fullName}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="problemType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Problem Type
          </label>
          <select
            id="problemType"
            name="problemType"
            value={contact.problemType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          >
            <option value="">Select a problem</option>
            <option value="technical">Technical</option>
            <option value="billing">Billing</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={contact.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            required
          ></textarea>
        </div>
        {/* <div>
          <label htmlFor="photo" className="block text-sm font-medium text-gray-700 mb-1">
            Photo
          </label>
          <div className="mt-1 flex items-center">
            <input
              type="file"
              id="photo"
              name="photo"
              onChange={handlePhotoUpload}
              className="bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            />
          </div>
        </div> */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {status === "loading" ? "Sending..." : "Send"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
};

export default ContactForm;
