import Modal from "./Modal";

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  name,
  loading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete">
      <div className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-gray-900 dark:text-white">
            "{name}"
          </span>
          ?
        </p>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3 pt-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
}
