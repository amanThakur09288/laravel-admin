import { useEffect, useState } from "react";
import Button from "../common/Button";

const initialForm = {
    name: "",
    price: "",
    description: "",
};

export default function ProductForm({
    product,
    onSubmit,
    onCancel,
    loading,
}) {
    const [form, setForm] =
        useState(initialForm);

    useEffect(() => {
        if (product) {
            setForm({
                name: product.name || "",
                price: product.price || "",
                description:
                    product.description || "",
            });
        } else {
            setForm(initialForm);
        }
    }, [product]);

    const handleChange = (event) => {
        const { name, value } =
            event.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        onSubmit({
            name: form.name,
            price: Number(form.price),
            description: form.description,
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-5"
        >
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Product Name
                </label>

                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="Enter product name"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Price
                </label>

                <input
                    type="number"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="Enter price"
                />
            </div>

            <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Description
                </label>

                <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                    placeholder="Enter description"
                />
            </div>

            <div className="flex justify-end gap-3">
                <Button
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    loading={loading}
                >
                    {product
                        ? "Update Product"
                        : "Create Product"}
                </Button>
            </div>
        </form>
    );
}