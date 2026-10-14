import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { getCourses, deleteCourse } from "../api/courseApi";

import { setCourses, removeCourse } from "../redux/slices/courseSlice";

import CourseTable from "../components/course/CourseTable";
import PageLoader from "../components/common/PageLoader";
import Button from "../components/common/Button";
import DeleteModal from "../components/common/DeleteModal";

import { getApiErrorMessage } from "../utils/apiError";

export default function Courses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const courses = useSelector((state) => state.courses.items);

  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);

      const response = await getCourses();

      const courseData = Array.isArray(response.data) ? response.data : [];

      dispatch(setCourses(courseData));
    } catch (error) {
      console.error("Failed to fetch courses:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleCreate = () => {
    navigate("/courses/create");
  };

  const handleView = (course) => {
    navigate(`/courses/${course.id}`);
  };

  const handleEdit = (course) => {
    navigate(`/courses/${course.id}/edit`);
  };

  const handleDelete = (course) => {
    setSelectedCourse(course);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    if (deletingId) {
      return;
    }

    setDeleteModalOpen(false);
    setSelectedCourse(null);
  };

  const confirmDelete = async () => {
    if (!selectedCourse) {
      return;
    }

    try {
      setDeletingId(selectedCourse.id);

      await deleteCourse(selectedCourse.id);

      dispatch(removeCourse(selectedCourse.id));

      toast.success("Course deleted successfully.");

      setDeleteModalOpen(false);
      setSelectedCourse(null);
    } catch (error) {
      console.error("Failed to delete course:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Courses
            </h1>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your training courses.
            </p>
          </div>

          <Button type="button" onClick={handleCreate}>
            + Add Course
          </Button>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <CourseTable
            courses={courses}
            loading={false}
            deletingId={deletingId}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={confirmDelete}
        name={selectedCourse?.course_name}
        loading={!!deletingId}
      />
    </>
  );
}
