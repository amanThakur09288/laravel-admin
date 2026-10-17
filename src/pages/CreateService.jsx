import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ServiceForm from "../components/service/ServiceForm";
import { createService } from "../api/serviceApi";
import { addService } from "../redux/slices/serviceSlice";
import { getApiErrorMessage } from "../utils/apiError";

export default function CreateService() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setLoading(true);

      const response = await createService(data);

      const createdService = response.data;

      dispatch(addService(createdService));

      toast.success("Service created successfully.");

      navigate("/services");
    } catch (error) {
      console.error("Failed to create service:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/services");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Service
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Add a new service to your website.
        </p>
      </div>

      <ServiceForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        loading={loading}
      />
    </div>
  );
}
