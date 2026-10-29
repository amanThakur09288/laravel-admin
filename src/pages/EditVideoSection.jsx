import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import {
  getCourses,
  getCourseSection,
  updateCourseSection,
} from "../api/courseApi";

import VideoLessonForm from "../components/videoSection/VideoLessonForm";
import PageLoader from "../components/common/PageLoader";
import { getApiErrorMessage } from "../utils/apiError";

export default function EditVideoSection() {
  const { id: sectionId } = useParams();

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const courseId = searchParams.get("course_id");

  const [courses, setCourses] = useState([]);

  const [section, setSection] = useState(null);

  const [loading, setLoading] = useState(true);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!courseId || !sectionId) {
      toast.error("Course or section information is missing.");

      navigate("/video-sections");

      return;
    }

    const load = async () => {
      try {
        setLoading(true);

        const [coursesResponse, sectionResponse] = await Promise.all([
          getCourses(),
          getCourseSection(courseId, sectionId),
        ]);

        setCourses(
          Array.isArray(coursesResponse.data) ? coursesResponse.data : [],
        );

        setSection(sectionResponse.data);
      } catch (error) {
        toast.error(getApiErrorMessage(error));

        navigate("/video-sections");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [courseId, sectionId, navigate]);

  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);

      const response = await updateCourseSection(courseId, sectionId, formData);

      toast.success("Video section updated successfully.");

      const newCourseId = response.data.course_id;

      navigate(
        `/video-sections/${response.data.id}/lessons?course_id=${newCourseId}`,
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

  if (!section) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Edit Video Section
        </h1>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Update the section and all of its lessons/videos.
        </p>
      </div>

      <VideoLessonForm
        courses={courses}
        initialData={section}
        onSubmit={handleSubmit}
        submitting={submitting}
        submitText="Update Video Section"
        onCancel={() => navigate("/video-sections")}
      />
    </div>
  );
}
