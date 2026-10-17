import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import ServiceForm from "../components/service/ServiceForm";
import {
    getService,
    updateService,
} from "../api/serviceApi";

import { getApiErrorMessage } from "../utils/apiError";
import PageLoader from "../components/common/PageLoader";

export default function EditService() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const fetchService = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getService(id);

            setService(response.data);
        } catch (error) {
            console.error(
                "Failed to fetch service:",
                error
            );

            const message =
                getApiErrorMessage(error);

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchService();
    }, [id]);

    const handleSubmit = async (data) => {
        try {
            setSaving(true);

            const response = await updateService(
                id,
                data
            );

            toast.success(
                "Service updated successfully."
            );

            /*
             * We intentionally do not update the URL here.
             * The Admin page continues using the service ID.
             *
             * Laravel handles slug changes on the backend.
             */

            setService(response.data);

            navigate("/services");
        } catch (error) {
            console.error(
                "Failed to update service:",
                error
            );

            toast.error(
                getApiErrorMessage(error)
            );
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        navigate("/services");
    };

    if (loading) {
        return <PageLoader />;
    }

    if (error || !service) {
        return (
            <div className="space-y-4">
                <div className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-950/30">
                    <h2 className="text-lg font-semibold text-red-700 dark:text-red-300">
                        Unable to load service
                    </h2>

                    <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {error ||
                            "Service not found."}
                    </p>

                    <button
                        type="button"
                        onClick={fetchService}
                        className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                    >
                        Try Again
                    </button>
                </div>

                <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                    Back to Services
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Edit Service
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update the service information and
                    website content.
                </p>
            </div>

            <ServiceForm
                initialData={service}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                loading={saving}
            />
        </div>
    );
}