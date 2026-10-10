import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { removeContactMessage } from "../../redux/slices/contactMessageSlice";
import PageLoader from "../../components/common/PageLoader";
import {
  getContactMessage,
  deleteContactMessage,
} from "../../api/contactMessageApi";
import { getApiErrorMessage } from "../../utils/apiError";
import DeleteModal from "../../components/common/DeleteModal";

const formatDateTime = (value) =>
  value
    ? new Date(value).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

export default function ContactMessageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadMessage = async () => {
      try {
        setLoading(true);
        const response = await getContactMessage(id);
        setMessage(response?.data ?? null);
      } catch (error) {
        console.error("Failed to load message:", error);
        toast.error(getApiErrorMessage(error));
        navigate("/contact-messages");
      } finally {
        setLoading(false);
      }
    };

    loadMessage();
  }, [id, navigate]);

  const handleConfirmDelete = async () => {
    try {
      setDeleting(true);

      await deleteContactMessage(id);
      dispatch(removeContactMessage(Number(id)));
      toast.success("Message deleted successfully.");
      navigate("/contact-messages");
    } catch (error) {
      console.error("Failed to delete message:", error);
      toast.error(getApiErrorMessage(error));
      setDeleting(false);
    }
  };

  if (loading) return <PageLoader />;
  if (!message) return null;

  const details = [
    ["Name", message.name],
    ["Email", message.email],
    // ["Company", message.company || "-"],
    ["Received", formatDateTime(message.created_at)],
    ["IP address", message.ip_address || "-"],
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Message Details
          </h1>
          <Link
            to="/contact-messages"
            className="mt-1 inline-block text-sm text-blue-600 hover:underline"
          >
            ← Back to messages
          </Link>
        </div>

        <div className="flex gap-3">
          <a
            href={`mailto:${message.email}?subject=${encodeURIComponent(
              `Re: ${message.subject}`,
            )}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            Reply by Email
          </a>

          <button
            type="button"
            onClick={() => setConfirmOpen(true)}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>

      <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
        <h2 className="break-words text-xl font-semibold text-gray-900 dark:text-white">
          {message.subject}
        </h2>

        <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-3">
          {details.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs text-gray-500 dark:text-gray-400">
                {label}
              </dt>
              <dd className="break-words font-medium text-gray-800 dark:text-gray-100">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-6">
          <p className="text-xs text-gray-500 dark:text-gray-400">Message</p>

          {/* React escapes this text, so it is safe to display */}
          <p className="mt-1 whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-4 text-sm leading-6 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
            {message.message}
          </p>
        </div>
      </div>

      <DeleteModal
        isOpen={confirmOpen}
        onClose={() => !deleting && setConfirmOpen(false)}
        onConfirm={handleConfirmDelete}
        name={message.subject}
        loading={deleting}
      />
    </div>
  );
}
