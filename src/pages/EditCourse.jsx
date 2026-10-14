import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import CourseForm from "../components/course/CourseForm";

import { getCourse, updateCourse } from "../api/courseApi";

import PageLoader from "../components/common/PageLoader";

import { getApiErrorMessage } from "../utils/apiError";

function prepareCoursePayload(data) {
  return {
    ...data,

    curriculum: data.curriculum.map((module) => ({
      ...module,

      topics: Array.isArray(module.topics)
        ? module.topics
        : String(module.topics || "")
            .split(",")
            .map((topic) => topic.trim())
            .filter(Boolean),
    })),
  };
}

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const fetchCourse = async () => {
    try {
      setLoading(true);

      const response = await getCourse(id);

      setCourse(response.data);
    } catch (error) {
      console.error("Failed to fetch course:", error);

      toast.error(getApiErrorMessage(error));

      navigate("/courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);

  const handleSubmit = async (data) => {
    try {
      setSubmitting(true);

      const payload = prepareCoursePayload(data);

      await updateCourse(id, payload);

      toast.success("Course updated successfully.");

      navigate("/courses");
    } catch (error) {
      console.error("Failed to update course:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  if (!course) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Course
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update course information.
        </p>
      </div>

      <CourseForm
        initialData={course}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitText="Update Course"
      />
    </div>
  );
}
