import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { createBatch } from "../../api/batchApi";
import { addBatch } from "../../redux/slices/batchSlice";
import { useDispatch } from "react-redux";
import { getApiErrorMessage } from "../../utils/apiError";
import BatchForm from "../../components/batch/BatchForm";
import { applyServerErrors } from "../../utils/applyServerErrors";

export default function CreateBatch() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);

  // const handleSubmit = async (formData) => {
  //   try {
  //     setSubmitting(true);
  //     const response = await createBatch(formData);
  //     dispatch(addBatch(response.data));
  //     toast.success("Batch created successfully.");
  //     navigate("/batches");
  //   } catch (error) {
  //     console.error("Failed to create batch:", error);
  //     toast.error(getApiErrorMessage(error));
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (formData, setError) => {
    try {
      setSubmitting(true);

      const response = await createBatch(formData);
      dispatch(addBatch(response?.data));

      toast.success("Batch created successfully.");
      navigate("/batches");
    } catch (error) {
      console.error("Failed to create batch:", error);

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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Batch
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Create a new upcoming training batch.
        </p>
      </div>

      <BatchForm
        onSubmit={handleSubmit}
        submitting={submitting}
        submitLabel="Create Batch"
      />
    </div>
  );
}
