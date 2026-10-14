// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// import { getBatches, deleteBatch } from "../../api/batchApi";
// import { setBatches, removeBatch } from "../../redux/slices/batchSlice";

// import BatchTable from "../../components/batch/BatchTable";
// import PageLoader from "../../components/common/PageLoader";
// import Button from "../../components/common/Button";
// import DeleteModal from "../../components/common/DeleteModal";

// import { getApiErrorMessage } from "../../utils/apiError";

// export default function Batches() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const batches = useSelector((state) => state.batches.items);

//   const [loading, setLoading] = useState(false);
//   const [deletingId, setDeletingId] = useState(null);
//   const [error, setError] = useState("");

//   // Delete modal
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [selectedBatch, setSelectedBatch] = useState(null);

//   const fetchBatches = async () => {
//     try {
//       setLoading(true);
//       setError("");

//       const response = await getBatches();

//       const batchData = Array.isArray(response.data) ? response.data : [];

//       dispatch(setBatches(batchData));
//     } catch (error) {
//       console.error("Failed to fetch batches:", error);

//       const message = getApiErrorMessage(error);

//       setError(message);
//       toast.error(message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBatches();
//   }, []);

//   const handleCreate = () => {
//     navigate("/batches/create");
//   };

//   const handleView = (batch) => {
//     navigate(`/batches/${batch.id}`);
//   };

//   const handleEdit = (batch) => {
//     navigate(`/batches/${batch.id}/edit`);
//   };

//   // Open delete modal
//   const handleDelete = (batch) => {
//     setSelectedBatch(batch);
//     setDeleteModalOpen(true);
//   };

//   // Close delete modal
//   const handleCloseDeleteModal = () => {
//     if (deletingId) {
//       return;
//     }

//     setDeleteModalOpen(false);
//     setSelectedBatch(null);
//   };

//   // Delete batch
//   const confirmDelete = async () => {
//     if (!selectedBatch) {
//       return;
//     }

//     try {
//       setDeletingId(selectedBatch.id);

//       await deleteBatch(selectedBatch.id);

//       dispatch(removeBatch(selectedBatch.id));

//       toast.success("Batch deleted successfully.");

//       setDeleteModalOpen(false);
//       setSelectedBatch(null);
//     } catch (error) {
//       console.error("Failed to delete batch:", error);

//       toast.error(getApiErrorMessage(error));
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   if (loading) {
//     return <PageLoader />;
//   }

//   return (
//     <>
//       <div className="space-y-6">
//         {/* Header */}
//         <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//               Upcoming Batches
//             </h1>

//             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//               Manage your upcoming training batches.
//             </p>
//           </div>

//           <Button type="button" onClick={handleCreate}>
//             + Add Batch
//           </Button>
//         </div>

//         {/* Error */}
//         {error ? (
//           <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/30">
//             <h3 className="font-semibold text-red-700 dark:text-red-300">
//               Unable to load batches
//             </h3>

//             <p className="mt-1 text-sm text-red-600 dark:text-red-400">
//               {error}
//             </p>

//             <button
//               type="button"
//               onClick={fetchBatches}
//               className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : (
//           <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
//             <BatchTable
//               batches={batches}
//               loading={false}
//               deletingId={deletingId}
//               onView={handleView}
//               onEdit={handleEdit}
//               onDelete={handleDelete}
//             />
//           </div>
//         )}
//       </div>

//       {/* Reusable Delete Modal */}
//       <DeleteModal
//         isOpen={deleteModalOpen}
//         onClose={handleCloseDeleteModal}
//         onConfirm={confirmDelete}
//         name={selectedBatch?.batch_name}
//         loading={!!deletingId}
//       />
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getBatches, deleteBatch } from "../../api/batchApi";

import { setBatches, removeBatch } from "../../redux/slices/batchSlice";

import BatchTable from "../../components/batch/BatchTable";
import PageLoader from "../../components/common/PageLoader";
import Button from "../../components/common/Button";
import DeleteModal from "../../components/common/DeleteModal";
import { getApiErrorMessage } from "../../utils/apiError";



export default function Batches() {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const batches = useSelector((state) => state.batches.items);

  /*
    |--------------------------------------------------------------------------
    | Local State
    |--------------------------------------------------------------------------
    */

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [deletingId, setDeletingId] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedBatch, setSelectedBatch] = useState(null);

  /*
    |--------------------------------------------------------------------------
    | Fetch Batches
    |--------------------------------------------------------------------------
    */

  const fetchBatches = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getBatches();

      const batchData = Array.isArray(response?.data) ? response.data : [];

      dispatch(setBatches(batchData));
    } catch (error) {
      console.error("Failed to fetch batches:", error);

      const message = getApiErrorMessage(error);

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  /*
    |--------------------------------------------------------------------------
    | Initial Load
    |--------------------------------------------------------------------------
    */

  useEffect(() => {
    fetchBatches();
  }, []);

  /*
    |--------------------------------------------------------------------------
    | Create Batch
    |--------------------------------------------------------------------------
    */

  const handleCreate = () => {
    navigate("/batches/create");
  };

  /*
    |--------------------------------------------------------------------------
    | View Batch
    |--------------------------------------------------------------------------
    */

  const handleView = (batch) => {
    navigate(`/batches/${batch.id}`);
  };

  /*
    |--------------------------------------------------------------------------
    | Edit Batch
    |--------------------------------------------------------------------------
    */

  const handleEdit = (batch) => {
    navigate(`/batches/${batch.id}/edit`);
  };

  /*
    |--------------------------------------------------------------------------
    | Open Delete Modal
    |--------------------------------------------------------------------------
    */

  const handleDelete = (batch) => {
    setSelectedBatch(batch);
    setDeleteModalOpen(true);
  };

  /*
    |--------------------------------------------------------------------------
    | Close Delete Modal
    |--------------------------------------------------------------------------
    */

  const handleCloseDeleteModal = () => {
    /*
            | Don't allow the modal to close
            | while deletion is running.
            */

    if (deletingId) {
      return;
    }

    setDeleteModalOpen(false);
    setSelectedBatch(null);
  };

  /*
    |--------------------------------------------------------------------------
    | Confirm Delete
    |--------------------------------------------------------------------------
    */

  const confirmDelete = async () => {
    if (!selectedBatch) {
      return;
    }

    try {
      setDeletingId(selectedBatch.id);

      await deleteBatch(selectedBatch.id);

      /*
                | Remove from Redux immediately
                | after successful API deletion.
                */

      dispatch(removeBatch(selectedBatch.id));

      toast.success("Batch deleted successfully.");

      setDeleteModalOpen(false);
      setSelectedBatch(null);
    } catch (error) {
      console.error("Failed to delete batch:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

  if (loading) {
    return <PageLoader />;
  }

  /*
    |--------------------------------------------------------------------------
    | UI
    |--------------------------------------------------------------------------
    */

  return (
    <>
      <div className="space-y-6">
        {/* =====================================================
                    PAGE HEADER
                ===================================================== */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Upcoming Batches
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your upcoming training batches.
            </p>
          </div>

          <Button type="button" onClick={handleCreate}>
            + Add Batch
          </Button>
        </div>

        {/* =====================================================
                    ERROR
                ===================================================== */}

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-5 dark:border-red-900/50 dark:bg-red-950/30">
            <h3 className="font-semibold text-red-700 dark:text-red-300">
              Unable to load batches
            </h3>

            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchBatches}
              className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          /* =================================================
                       BATCH TABLE
                    ================================================= */

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
            <BatchTable
              batches={batches}
              loading={false}
              deletingId={deletingId}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}
      </div>

      {/* =========================================================
                DELETE MODAL
            ========================================================= */}

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        name={selectedBatch?.batch_name}
        loading={!!deletingId}
      />
    </>
  );
}
