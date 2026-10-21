import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getProducts, deleteProduct } from "../api/productApi";
import { setProducts, removeProduct } from "../redux/slices/productSlice";

import ProductTable from "../components/products/ProductTable";
import PageLoader from "../components/common/PageLoader";
import Button from "../components/common/Button";
import DeleteModal from "../components/common/DeleteModal";

import { getApiErrorMessage } from "../utils/apiError";

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProductsState] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      const productData = Array.isArray(response.data) ? response.data : [];

      setProductsState(productData);
      dispatch(setProducts(productData));
    } catch (error) {
      console.error("Failed to fetch products:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Navigate to create page
  const handleCreate = () => {
    navigate("/products/create");
  };

  // Navigate to view page
  const handleView = (product) => {
    navigate(`/products/${product.id}`);
  };

  // Navigate to edit page
  const handleEdit = (product) => {
    navigate(`/products/${product.id}/edit`);
  };

  // Open delete modal
  const handleDelete = (product) => {
    setSelectedProduct(product);
    setDeleteModalOpen(true);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    if (deletingId) {
      return;
    }

    setDeleteModalOpen(false);
    setSelectedProduct(null);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!selectedProduct) {
      return;
    }

    try {
      setDeletingId(selectedProduct.id);

      await deleteProduct(selectedProduct.id);

      dispatch(removeProduct(selectedProduct.id));

      setProductsState((previousProducts) =>
        previousProducts.filter((item) => item.id !== selectedProduct.id),
      );

      toast.success("Product deleted successfully");

      setDeleteModalOpen(false);
      setSelectedProduct(null);
    } catch (error) {
      console.error("Failed to delete product:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Products
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage your products.
          </p>
        </div>

        <Button type="button" onClick={handleCreate}>
          + Add Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <ProductTable
          products={products}
          loading={false}
          deletingId={deletingId}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        name={selectedProduct?.name}
        loading={!!deletingId}
      />
    </div>
  );
}
