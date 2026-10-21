import { useEffect, useMemo, useState } from "react";
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

  // null -> "" so inputs never receive null
  ...Object.fromEntries(TEXT_FIELDS.map((key) => [key, batch?.[key] ?? ""])),

  // null -> [] so lists never crash
  ...Object.fromEntries(LIST_FIELDS.map((key) => [key, batch?.[key] ?? []])),

  course_id: batch?.course_id ?? batch?.course?.id ?? "",

  // Date and time inputs need YYYY-MM-DD and HH:MM
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

  // useMemo keeps the same object between renders.
  // Without it the form would reset (and lose typed text) after every re-render.
  const initialValues = useMemo(
    () => (batch ? toFormValues(batch) : null),
    [batch],
  );

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
  if (!initialValues) return null;

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
        initialValues={initialValues}
        onSubmit={handleSubmit}
        loading={submitting}
        submitText="Update Batch"
      />
    </div>
  );
}
