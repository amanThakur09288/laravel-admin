// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import toast from "react-hot-toast";
// import BatchForm from "../../components/batch/BatchForm";
// import PageLoader from "../../components/common/PageLoader";
// import { getBatch, updateBatch } from "../../api/batchApi";
// import { updateBatchState } from "../../redux/slices/batchSlice";
// import { getApiErrorMessage } from "../../utils/apiError";

// export default function EditBatch() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [batch, setBatch] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [submitting, setSubmitting] = useState(false);

//   const formatTimeForInput = (time) => {
//     if (!time) {
//         return "";
//     }
//     return time.substring(0, 5);
// };

//   const fetchBatch = async () => {
//     try {
//       setLoading(true);
//       const response = await getBatch(id);
//       setBatch(response.data);
//     } catch (error) {
//       console.error("Failed to fetch batch:", error);
//       toast.error(getApiErrorMessage(error));
//       navigate("/batches");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchBatch();
//   }, [id]);

//   const handleSubmit = async (formData) => {
//     try {
//       setSubmitting(true);
//       const response = await updateBatch(id, formData);
//       dispatch(updateBatchState(response.data));
//       toast.success("Batch updated successfully.");
//       navigate("/batches");
//     } catch (error) {
//       console.error("Failed to update batch:", error);
//       toast.error(getApiErrorMessage(error));
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   if (loading) {
//     return <PageLoader />;
//   }

//   if (!batch) {
//     return null;
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//           Edit Batch
//         </h1>

//         <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//           Update batch information.
//         </p>
//       </div>

//       <BatchForm
//         initialValues={{
//           ...batch,
//           class_start_time: formatTimeForInput(batch.class_start_time),
//           class_end_time: formatTimeForInput(batch.class_end_time),
//           total_classes: Number(batch.total_classes),
//           total_seats: Number(batch.total_seats),
//           available_seats: Number(batch.available_seats),
//           fee: Number(batch.fee),
//           discounted_fee:
//             batch.discounted_fee !== null ? Number(batch.discounted_fee) : null,
//           learning_outcomes: batch.learning_outcomes || [],
//           curriculum: batch.curriculum || [],
//           prerequisites: batch.prerequisites || [],
//           who_should_join: batch.who_should_join || [],
//           faqs: batch.faqs || [],
//           payment_info: batch.payment_info || [],
//         }}
//         onSubmit={handleSubmit}
//         submitting={submitting}
//         submitLabel="Update Batch"
//       />
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import BatchForm from "../../components/batch/BatchForm";
import PageLoader from "../../components/common/PageLoader";
import { getBatch, updateBatch } from "../../api/batchApi";
import { updateBatchState } from "../../redux/slices/batchSlice";
import { getApiErrorMessage } from "../../utils/apiError";
import { applyServerErrors } from "../../utils/applyServerErrors";

const TEXT_FIELDS = [
  "course_description",
  "batch_overview",
  "location",
  "offer_text",
  "instructor_name",
  "instructor_designation",
  "instructor_experience",
  "instructor_bio",
  "live_class_info",
  "recorded_class_info",
  "doubt_support",
];

const LIST_FIELDS = [
  "learning_outcomes",
  "curriculum",
  "prerequisites",
  "who_should_join",
  "faqs",
  "payment_info",
];

const numberOrEmpty = (value) =>
  value === null || value === undefined || value === "" ? "" : Number(value);

// Convert the API response into the shape the form expects
const toFormValues = (batch) => ({
  ...batch,
  ...Object.fromEntries(TEXT_FIELDS.map((key) => [key, batch?.[key] ?? ""])),
  ...Object.fromEntries(LIST_FIELDS.map((key) => [key, batch?.[key] ?? []])),

  start_date: batch?.start_date?.slice(0, 10) ?? "",
  end_date: batch?.end_date?.slice(0, 10) ?? "",
  class_start_time: batch?.class_start_time?.slice(0, 5) ?? "",
  class_end_time: batch?.class_end_time?.slice(0, 5) ?? "",

  total_classes: numberOrEmpty(batch?.total_classes),
  total_seats: numberOrEmpty(batch?.total_seats),
  available_seats: numberOrEmpty(batch?.available_seats),
  fee: numberOrEmpty(batch?.fee),
  discounted_fee: numberOrEmpty(batch?.discounted_fee),
});

export default function EditBatch() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [batch, setBatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadBatch = async () => {
      try {
        setLoading(true);
        const response = await getBatch(id);
        setBatch(response?.data ?? null);
      } catch (error) {
        console.error("Failed to fetch batch:", error);
        toast.error(getApiErrorMessage(error));
        navigate("/batches");
      } finally {
        setLoading(false);
      }
    };

    loadBatch();
  }, [id, navigate]);

  const handleSubmit = async (formData, setError) => {
    try {
      setSubmitting(true);

      const response = await updateBatch(id, formData);
      dispatch(updateBatchState(response?.data));

      toast.success("Batch updated successfully.");
      navigate("/batches");
    } catch (error) {
      console.error("Failed to update batch:", error);

      const handled = applyServerErrors(error, setError);
      toast.error(
        handled
          ? "Please fix the highlighted fields."
          : getApiErrorMessage(error),
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <PageLoader />;
  if (!batch) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Batch
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update batch information.
        </p>
      </div>

      <BatchForm
        initialValues={toFormValues(batch)}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel="Update Batch"
      />
    </div>
  );
}
