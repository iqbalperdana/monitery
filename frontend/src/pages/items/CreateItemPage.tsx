import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { createItem } from "../../services/itemsService";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  price: yup
    .number()
    .required("Price is required")
    .min(0, "Price must be positive"),
  description: yup.string().optional(),
  image_url: yup.string().optional(),
});

const CreateItemPage: React.FC = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    description: "",
    image_url: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await schema.validate(formData, { abortEarly: false });
      await createItem(formData);
      navigate("/items");
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((err) => {
          if (err.path) {
            validationErrors[err.path] = err.message;
          }
        });
        setErrors(validationErrors);
      } else {
        console.error("Failed to create item:", error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-2">
        <h1 className="text-3xl font-semibold dark:text-white text-gray-900">
          Create New Item
        </h1>
      </div>
      <div className="bg-white dark:bg-[#202435] shadow-lg p-8 rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <span className="text-red-500 text-sm">{errors.name}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.price && (
                <span className="text-red-500 text-sm">{errors.price}</span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description}
                </span>
              )}
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.image_url && (
                <span className="text-red-500 text-sm">{errors.image_url}</span>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all"
          >
            Create Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateItemPage;
