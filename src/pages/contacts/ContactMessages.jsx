import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getContactMessages,
  deleteContactMessage,
} from "../../api/contactMessageApi";
import {
  setContactMessages,
  removeContactMessage,
} from "../../redux/slices/contactMessageSlice";

import ContactMessageTable from "../../components/contacts/ContactMessageTable";
import PageLoader from "../../components/common/PageLoader";
import DeleteModal from "../../components/common/DeleteModal";

import { getApiErrorMessage } from "../../utils/apiError";

export default function ContactMessages() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const messages = useSelector((state) => state.contactMessages.items);

  const [loading, setLoading] = useState(true);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Fetch messages
  const fetchMessages = async () => {
    try {
      setLoading(true);

      const response = await getContactMessages();
      const data = Array.isArray(response?.data) ? response.data : [];

      dispatch(setContactMessages(data));
    } catch (error) {
      console.error("Failed to fetch contact messages:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Navigate to view page
  const handleView = (message) => {
    navigate(`/contact-messages/${message.id}`);
  };

  // Open delete modal
  const handleDelete = (message) => {
    setSelectedMessage(message);
    setDeleteModalOpen(true);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    if (deletingId) {
      return;
    }

    setDeleteModalOpen(false);
    setSelectedMessage(null);
  };

  // Confirm delete
  const confirmDelete = async () => {
    if (!selectedMessage) {
      return;
    }

    try {
      setDeletingId(selectedMessage.id);

      await deleteContactMessage(selectedMessage.id);

      dispatch(removeContactMessage(selectedMessage.id));

      toast.success("Message deleted successfully.");

      setDeleteModalOpen(false);
      setSelectedMessage(null);
    } catch (error) {
      console.error("Failed to delete message:", error);

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
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Contact Messages
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Messages sent from the website contact form.
        </p>
      </div>

      {/* Messages Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <ContactMessageTable
          messages={messages}
          loading={false}
          deletingId={deletingId}
          onView={handleView}
          onDelete={handleDelete}
        />
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        name={selectedMessage?.subject}
        loading={!!deletingId}
      />
    </div>
  );
}
