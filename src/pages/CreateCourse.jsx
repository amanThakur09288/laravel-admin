import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import CourseForm from "../components/course/CourseForm";
import { createCourse } from "../api/courseApi";
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

export default function CreateCourse() {
  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data) => {
    try {
      setSubmitting(true);

      const payload = prepareCoursePayload(data);

      await createCourse(payload);

      toast.success("Course created successfully.");

      navigate("/courses");
    } catch (error) {
      console.error("Failed to create course:", error);

      toast.error(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Course
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Create a new training course.
        </p>
      </div>

      <CourseForm
        onSubmit={handleSubmit}
        submitting={submitting}
        submitText="Create Course"
      />
    </div>
  );
}
