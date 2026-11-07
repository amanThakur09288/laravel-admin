import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import {
  getStudents,
  updateStudent,
  updateStudentStatus,
  deleteStudent,
} from "../api/studentApi";

const initialForm = {
  name: "",
  username: "",
  email: "",
  password: "",
  password_confirmation: "",
};

export default function Students() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [editingStudent, setEditingStudent] = useState(null);
  const [form, setForm] = useState(initialForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadStudents = async () => {
    try {
      setError("");

      const response = await getStudents();

      const list = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
          ? response.data
          : [];

      setStudents(list);
    } catch (err) {
      console.error("Failed to load students:", err);

      setError(err?.response?.data?.message || "Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return students;

    return students.filter((student) =>
      [student.name, student.username, student.email].some((value) =>
        value?.toLowerCase().includes(query),
      ),
    );
  }, [students, search]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setEditingStudent(null);
    setForm(initialForm);
  };

  const beginEdit = (student) => {
    setEditingStudent(student);

    setForm({
      name: student.name || "",
      username: student.username || "",
      email: student.email || "",
      password: "",
      password_confirmation: "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const cancelEdit = () => {
    resetForm();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!editingStudent) return;

    if (form.password && form.password !== form.password_confirmation) {
      toast.error("Passwords do not match.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
    };

    if (form.password) {
      payload.password = form.password;
      payload.password_confirmation = form.password_confirmation;
    }

    try {
      setSaving(true);

      await updateStudent(editingStudent.id, payload);

      toast.success("Student updated successfully.");

      resetForm();
      await loadStudents();
    } catch (err) {
      console.error("Student update failed:", err);

      const validationErrors = err?.response?.data?.errors;
      const firstValidationError = validationErrors
        ? Object.values(validationErrors).flat()[0]
        : null;

      toast.error(
        firstValidationError ||
          err?.response?.data?.message ||
          "Unable to update student.",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleStatus = async (student) => {
    const nextStatus = !student.is_active;

    try {
      await updateStudentStatus(student.id, nextStatus);

      toast.success(nextStatus ? "Student activated." : "Student deactivated.");

      await loadStudents();
    } catch (err) {
      console.error("Student status update failed:", err);

      toast.error(
        err?.response?.data?.message || "Unable to update student status.",
      );
    }
  };

  const handleDelete = async (student) => {
    const hasQuizHistory = (student.quiz_attempts_count ?? 0) > 0;

    if (hasQuizHistory) {
      toast.error(
        "This student has quiz history. Deactivate the account instead.",
      );
      return;
    }

    const confirmed = window.confirm(
      `Permanently delete student "${student.name}"? This action cannot be undone.`,
    );

    if (!confirmed) return;

    try {
      await deleteStudent(student.id);

      toast.success("Student deleted successfully.");

      await loadStudents();
    } catch (err) {
      console.error("Student deletion failed:", err);

      toast.error(err?.response?.data?.message || "Unable to delete student.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Student Management
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          View and manage student accounts registered on the website.
        </p>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400">
          {error}
        </div>
      )}

      {editingStudent && (
        <section className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
            Edit Student
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Full name
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>

              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Username
                <input
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>

              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Email
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>

              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                New password (optional)
                <input
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={form.password}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>

              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm new password
                <input
                  name="password_confirmation"
                  type="password"
                  autoComplete="new-password"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  required={Boolean(form.password)}
                  className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                />
              </label>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={saving}
                className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>

              <button
                type="button"
                onClick={cancelEdit}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm dark:border-gray-700 dark:text-gray-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex flex-col justify-between gap-3 border-b border-gray-200 p-5 dark:border-gray-800 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              Registered Students
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Total students: {students.length}
            </p>
          </div>

          <div className="flex gap-2">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search name, username or email"
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:w-72"
            />

            <button
              type="button"
              onClick={() => {
                setLoading(true);
                loadStudents();
              }}
              disabled={loading}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:text-gray-200"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-sm text-gray-500">
            Loading students...
          </div>
        ) : filteredStudents.length === 0 ? (
          <div className="p-8 text-center text-sm text-gray-500 dark:text-gray-400">
            No students found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                <tr>
                  <th className="px-5 py-3">Student</th>
                  <th className="px-5 py-3">Username</th>
                  <th className="px-5 py-3">Quiz attempts</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {filteredStudents.map((student) => (
                  <tr key={student.id}>
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900 dark:text-white">
                        {student.name}
                      </p>

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {student.email}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                      {student.username}
                    </td>

                    <td className="px-5 py-4 text-gray-700 dark:text-gray-300">
                      {student.quiz_attempts_count ?? 0}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          student.is_active
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {student.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => beginEdit(student)}
                          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium dark:border-gray-700 dark:text-gray-200"
                        >
                          Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatus(student)}
                          className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium dark:border-gray-700 dark:text-gray-200"
                        >
                          {student.is_active ? "Deactivate" : "Activate"}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(student)}
                          disabled={(student.quiz_attempts_count ?? 0) > 0}
                          title={
                            (student.quiz_attempts_count ?? 0) > 0
                              ? "Student has quiz history; deactivate instead to preserve results."
                              : "Permanently delete student"
                          }
                          className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-red-950/30 dark:text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
