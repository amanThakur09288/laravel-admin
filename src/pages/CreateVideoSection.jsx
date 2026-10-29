import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import { getCourses, createCourseSection } from "../api/courseApi";

import VideoLessonForm from "../components/videoSection/VideoLessonForm";
import PageLoader from "../components/common/PageLoader";
import { getApiErrorMessage } from "../utils/apiError";

export default function CreateVideoSection() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [courses, setCourses] = useState([]);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  const selectedCourseId = searchParams.get("course_id") || "";

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await getCourses();

        setCourses(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        toast.error(getApiErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, []);

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);

      const response = await createCourseSection(formData.course_id, formData);

      toast.success("Video section created successfully.");

      navigate(
        `/video-sections/${response.data.id}/lessons?course_id=${response.data.course_id}`,
      );
    } catch (error) {
      toast.error(getApiErrorMessage(error));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Create Video Section
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Create a section and add all video lessons in one form.
        </p>
      </div>

      <VideoLessonForm
        courses={courses}
        initialData={{
          course_id: selectedCourseId,
        }}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitText="Create Video Section"
        onCancel={() => navigate("/video-sections")}
      />
    </div>
  );
}
