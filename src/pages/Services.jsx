import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import ServiceTable from "../components/service/ServiceTable";

import { getServices, deleteService } from "../api/serviceApi";

import { setServices, removeService } from "../redux/slices/serviceSlice";

import PageLoader from "../components/common/PageLoader";
import Button from "../components/common/Button";
import DeleteModal from "../components/common/DeleteModal";

import { getApiErrorMessage } from "../utils/apiError";

export default function Services() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const services = useSelector((state) => state.services.items);

  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedService, setSelectedService] = useState(null);

  // --------------------------------------------------
  // Fetch Services
  // --------------------------------------------------

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getServices();

      const serviceData = Array.isArray(response.data) ? response.data : [];

      dispatch(setServices(serviceData));
    } catch (error) {
      console.error("Failed to fetch services:", error);

      const message = getApiErrorMessage(error);

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // --------------------------------------------------
  // Create
  // --------------------------------------------------

  const handleCreate = () => {
    navigate("/services/create");
  };

  // --------------------------------------------------
  // View
  // --------------------------------------------------

  const handleView = (service) => {
    navigate(`/services/${service.id}`);
  };

  // --------------------------------------------------
  // Edit
  // --------------------------------------------------

  const handleEdit = (service) => {
    navigate(`/services/${service.id}/edit`);
  };

  // --------------------------------------------------
  // Delete
  // --------------------------------------------------

  const handleDelete = (service) => {
    setSelectedService(service);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    if (deletingId) {
      return;
    }

    setDeleteModalOpen(false);
    setSelectedService(null);
  };

  const confirmDelete = async () => {
    if (!selectedService) {
      return;
    }

    try {
      setDeletingId(selectedService.id);

      await deleteService(selectedService.id);

      dispatch(removeService(selectedService.id));

      toast.success("Service deleted successfully.");

      setDeleteModalOpen(false);
      setSelectedService(null);
    } catch (error) {
      console.error("Failed to delete service:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  // --------------------------------------------------
  // Loading
  // --------------------------------------------------

  if (loading) {
    return <PageLoader />;
  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Services
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your website services.
            </p>
          </div>

          <Button type="button" onClick={handleCreate}>
            + Add Service
          </Button>
        </div>

        {/* Error */}
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/30">
            <h3 className="font-semibold text-red-700 dark:text-red-300">
              Unable to load services
            </h3>

            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchServices}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            {services.length === 0 ? (
              <div className="p-10 text-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  No services found
                </h3>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Create your first service to display it here.
                </p>

                <div className="mt-5">
                  <Button type="button" onClick={handleCreate}>
                    + Add Service
                  </Button>
                </div>
              </div>
            ) : (
              <ServiceTable
                services={services}
                deletingId={deletingId}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        name={selectedService?.service_name}
        loading={!!deletingId}
      />
    </>
  );
}
