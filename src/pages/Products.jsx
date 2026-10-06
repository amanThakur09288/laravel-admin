// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import toast from "react-hot-toast";

// import {
//   getProducts,
//   createProduct,
//   updateProduct,
//   deleteProduct,
// } from "../api/productApi";

// import {
//   setProducts,
//   addProduct,
//   updateProductState,
//   removeProduct,
// } from "../redux/slices/productSlice";

// import ProductTable from "../components/products/ProductTable";
// import ProductForm from "../components/products/ProductForm";
// import Modal from "../components/common/Modal";
// import PageLoader from "../components/common/PageLoader";
// import Button from "../components/common/Button";

// import { getApiErrorMessage } from "../utils/apiError";

// export default function Products() {
//   const dispatch = useDispatch();

//   // Products come from Redux
//   const products = useSelector((state) => state.products.items);

//   // UI state stays local
//   const [loading, setLoading] = useState(false);

//   const [actionLoading, setActionLoading] = useState(false);

//   const [modalOpen, setModalOpen] = useState(false);

//   const [selectedProduct, setSelectedProduct] = useState(null);

//   // --------------------------------
//   // GET PRODUCTS
//   // --------------------------------

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);

//       const response = await getProducts();

//       dispatch(setProducts(response.data));
//     } catch (error) {
//       console.error("Failed to fetch products:", error);

//       toast.error(getApiErrorMessage(error));
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   // --------------------------------
//   // OPEN CREATE MODAL
//   // --------------------------------

//   const handleCreate = () => {
//     setSelectedProduct(null);
//     setModalOpen(true);
//   };

//   // --------------------------------
//   // OPEN EDIT MODAL
//   // --------------------------------

//   const handleEdit = (product) => {
//     setSelectedProduct(product);
//     setModalOpen(true);
//   };

//   // --------------------------------
//   // DELETE PRODUCT
//   // --------------------------------

//   const handleDelete = async (product) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${product.name}"?`,
//     );

//     if (!confirmed) {
//       return;
//     }

//     try {
//       setActionLoading(true);

//       await deleteProduct(product.id);

//       dispatch(removeProduct(product.id));

//       toast.success("Product deleted successfully");
//     } catch (error) {
//       console.error("Failed to delete product:", error);

//       toast.error(getApiErrorMessage(error));
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // --------------------------------
//   // CREATE / UPDATE PRODUCT
//   // --------------------------------

//   const handleSubmit = async (data) => {
//     try {
//       setActionLoading(true);

//       // UPDATE
//       if (selectedProduct) {
//         const response = await updateProduct(selectedProduct.id, data);

//         dispatch(updateProductState(response.data));

//         toast.success("Product updated successfully");
//       }

//       // CREATE
//       else {
//         const response = await createProduct(data);

//         dispatch(addProduct(response.data));

//         toast.success("Product created successfully");
//       }

//       // Close modal after success
//       setModalOpen(false);
//       setSelectedProduct(null);
//     } catch (error) {
//       console.error("Product operation failed:", error);

//       toast.error(getApiErrorMessage(error));
//     } finally {
//       setActionLoading(false);
//     }
//   };

//   // --------------------------------
//   // CLOSE MODAL
//   // --------------------------------

//   const handleCloseModal = () => {
//     if (actionLoading) {
//       return;
//     }

//     setModalOpen(false);
//     setSelectedProduct(null);
//   };

//   // --------------------------------
//   // PAGE
//   // --------------------------------

//   return (
//     <div className="space-y-6">
//       {/* PAGE HEADER */}

//       <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//             Products
//           </h1>

//           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//             Manage your products.
//           </p>
//         </div>

//         <Button onClick={handleCreate}>+ Add Product</Button>
//       </div>

//       {/* PRODUCTS TABLE */}

//       <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
//         {loading ? (
//           <PageLoader />
//         ) : products.length === 0 ? (
//           <div className="p-10 text-center">
//             <p className="text-gray-500 dark:text-gray-400">
//               No products found.
//             </p>

//             <button
//               type="button"
//               onClick={handleCreate}
//               className="mt-3 text-sm font-medium text-blue-600 hover:underline"
//             >
//               Create your first product
//             </button>
//           </div>
//         ) : (
//           <ProductTable
//             products={products}
//             loading={actionLoading}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         )}
//       </div>

//       <Modal
//         isOpen={modalOpen}
//         onClose={handleCloseModal}
//         title={selectedProduct ? "Edit Product" : "Create Product"}
//       >
//         <ProductForm
//           product={selectedProduct}
//           onSubmit={handleSubmit}
//           onCancel={handleCloseModal}
//           loading={actionLoading}
//         />
//       </Modal>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getProducts, deleteProduct } from "../api/productApi";
import { setProducts, removeProduct } from "../redux/slices/productSlice";
import ProductTable from "../components/products/ProductTable";
import PageLoader from "../components/common/PageLoader";
import Button from "../components/common/Button";
import { getApiErrorMessage } from "../utils/apiError";

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [products, setProductsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await getProducts();

      setProductsState(response.data);
      dispatch(setProducts(response.data));
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

  const handleView = (product) => {
    navigate(`/products/${product.id}`);
  };

  // Navigate to edit page
  const handleEdit = (product) => {
    navigate(`/products/${product.id}/edit`);
  };

  // Delete product
  const handleDelete = async (product) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"?`,
    );
    if (!confirmed) {
      return;
    }
    try {
      setDeletingId(product.id);
      await deleteProduct(product.id);
      dispatch(removeProduct(product.id));
      setProductsState((previousProducts) =>
        previousProducts.filter((item) => item.id !== product.id),
      );

      toast.success("Product deleted successfully");
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
      {/* Page Header */}
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
    </div>
  );
}
