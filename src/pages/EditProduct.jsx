import { useEffect, useState } from "react";
import {
    useNavigate,
    useParams,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import {
    getProduct,
    updateProduct,
} from "../api/productApi";

import {
    updateProductState,
} from "../redux/slices/productSlice";

import ProductForm from "../components/products/ProductForm";
import PageLoader from "../components/common/PageLoader";

import {
    getApiErrorMessage,
} from "../utils/apiError";

export default function EditProduct() {
    const { id } = useParams();

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [product, setProduct] =
        useState(null);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);

                const response =
                    await getProduct(id);

                setProduct(response.data);
            } catch (error) {
                console.error(
                    "Failed to fetch product:",
                    error
                );

                toast.error(
                    getApiErrorMessage(error)
                );

                navigate("/products");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate]);

    const handleSubmit = async (data) => {
        try {
            setSaving(true);

            const response =
                await updateProduct(
                    id,
                    data
                );

            dispatch(
                updateProductState(
                    response.data
                )
            );

            toast.success(
                "Product updated successfully"
            );

            navigate("/products");
        } catch (error) {
            console.error(
                "Failed to update product:",
                error
            );

            toast.error(
                getApiErrorMessage(error)
            );
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <PageLoader />;
    }

    if (!product) {
        return null;
    }

    return (
        <div className="space-y-6">
            {/* Header */}

            <div>
                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            "/products"
                        )
                    }
                    className="mb-3 text-sm font-medium text-blue-600 hover:underline"
                >
                    ← Back to Products
                </button>

                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Edit Product
                </h1>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Update product information.
                </p>
            </div>

            {/* Form */}

            <div className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <ProductForm
                    product={product}
                    onSubmit={handleSubmit}
                    onCancel={() =>
                        navigate(
                            "/products"
                        )
                    }
                    loading={saving}
                />
            </div>
        </div>
    );
}