import { useNavigate } from "react-router-dom";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import { createProduct } from "../api/productApi";
import { addProduct } from "../redux/slices/productSlice";
import ProductForm from "../components/products/ProductForm";
import { getApiErrorMessage } from "../utils/apiError";

export default function CreateProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await createProduct(data);

      dispatch(addProduct(response.data));

      toast.success("Product created successfully");

      navigate("/products");
    } catch (error) {
      console.error("Failed to create product:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div>
        <button
          type="button"
          onClick={handleCancel}
          className="mb-3 text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Products
        </button>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Product
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add a new product to your catalog.
        </p>
      </div>

      {/* Form */}

      <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <ProductForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={loading}
        />
      </div>
    </div>
  );
}
