import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getCourses,
  getCourseSections,
  deleteCourseSection,
} from "../api/courseApi";

import Button from "../components/common/Button";
import DeleteModal from "../components/common/DeleteModal";
import PageLoader from "../components/common/PageLoader";

import { getApiErrorMessage } from "../utils/apiError";

export default function VideoSections() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingSections, setLoadingSections] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | Load Courses
  |--------------------------------------------------------------------------
  */

  const fetchCourses = async () => {
    try {
      const response = await getCourses();
      const data = Array.isArray(response.data) ? response.data : [];
      setCourses(data);
      if (data.length > 0) {
        setSelectedCourseId(String(data[0].id));
      }
    } catch (error) {
      console.error("Failed to fetch courses:", error);
      toast.error(getApiErrorMessage(error));
    }
  };

  /*
  |--------------------------------------------------------------------------
  | Load Sections
  |--------------------------------------------------------------------------
  */

  const fetchSections = async (courseId) => {
    if (!courseId) {
      setSections([]);
      return;
    }

    try {
      setLoadingSections(true);
      const response = await getCourseSections(courseId);
      setSections(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Failed to fetch video sections:", error);
      toast.error(getApiErrorMessage(error));
    } finally {
      setLoadingSections(false);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchCourses();
      setLoading(false);
    };
    load();
  }, []);

  useEffect(() => {
    if (selectedCourseId) {
      fetchSections(selectedCourseId);
    }
  }, [selectedCourseId]);

  /*
  |--------------------------------------------------------------------------
  | Delete
  |--------------------------------------------------------------------------
  */

  const handleDelete = (section) => {
    setSelectedSection(section);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    if (deletingId) {
      return;
    }

    setDeleteModalOpen(false);
    setSelectedSection(null);
  };

  const confirmDelete = async () => {
    if (!selectedSection) {
      return;
    }

    try {
      setDeletingId(selectedSection.id);
      await deleteCourseSection(selectedSection.course_id, selectedSection.id);
      setSections((previous) =>
        previous.filter((section) => section.id !== selectedSection.id),
      );
      toast.success("Video section deleted successfully.");
      setDeleteModalOpen(false);
      setSelectedSection(null);
    } catch (error) {
      console.error("Failed to delete video section:", error);
      toast.error(getApiErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  const selectedCourse = courses.find(
    (course) => String(course.id) === String(selectedCourseId),
  );

  return (
    <>
      <div className="space-y-6">
        {/* Header */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Video Sections
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage course video sections and lessons.
            </p>
          </div>

          <Button
            type="button"
            onClick={() => navigate("/video-sections/create")}
          >
            + Add Video Section
          </Button>
        </div>

        {/* Course Filter */}

        <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Course
          </label>

          <select
            value={selectedCourseId}
            onChange={(event) => setSelectedCourseId(event.target.value)}
            className="w-full max-w-xl rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            {courses.length === 0 && (
              <option value="">No courses available</option>
            )}

            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.course_name}
              </option>
            ))}
          </select>
        </div>

        {/* Sections */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          {loadingSections ? (
            <div className="p-10 text-center text-sm text-gray-500 dark:text-gray-400">
              Loading video sections...
            </div>
          ) : !sections.length ? (
            <div className="p-10 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No video sections found for{" "}
                {selectedCourse?.course_name ?? "this course"}.
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/video-sections/create?course_id=${selectedCourseId}`,
                  )
                }
                className="mt-3 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
              >
                + Create first video section
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px]">
                <thead className="border-b border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-800/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Section
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Lessons
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Sort Order
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {sections.map((section) => (
                    <tr
                      key={section.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/40"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {section.title}
                          </p>

                          {section.description && (
                            <p className="mt-1 max-w-lg truncate text-sm text-gray-500 dark:text-gray-400">
                              {section.description}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {section.lessons_count ?? 0}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-300">
                        {section.sort_order}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-medium ${
                            section.status === "published"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300"
                          }`}
                        >
                          {section.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/video-sections/${section.id}/lessons?course_id=${section.course_id}`,
                              )
                            }
                            className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/20"
                          >
                            Lessons
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              navigate(
                                `/video-sections/${section.id}/edit?course_id=${section.course_id}`,
                              )
                            }
                            className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(section)}
                            disabled={deletingId === section.id}
                            className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-50 dark:text-red-400 dark:hover:bg-red-900/20"
                          >
                            {deletingId === section.id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        name={selectedSection?.title}
        loading={!!deletingId}
      />
    </>
  );
}
