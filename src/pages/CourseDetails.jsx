import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import { getCourse } from "../api/courseApi";

import PageLoader from "../components/common/PageLoader";
import Button from "../components/common/Button";

import { getApiErrorMessage } from "../utils/apiError";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);

  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <PageLoader />;
  }

  if (!course) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {course.course_name}
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Course details
          </p>
        </div>

        <Button
          type="button"
          onClick={() => navigate(`/courses/${course.id}/edit`)}
        >
          Edit Course
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard title="Category" value={course.category} />

        <InfoCard title="Level" value={course.level} />

        <InfoCard title="Duration" value={course.duration || "-"} />

        <InfoCard title="Total Hours" value={course.total_hours ?? "-"} />

        <InfoCard title="Status" value={course.status} />
      </div>

      <ContentCard title="Short Description">
        {course.short_description || "No description available."}
      </ContentCard>

      <ContentCard title="Course Description">
        {course.course_description || "No description available."}
      </ContentCard>

      <ArrayCard title="Learning Outcomes" items={course.learning_outcomes} />

      <ArrayCard title="Prerequisites" items={course.prerequisites} />

      <ArrayCard title="Who Should Join" items={course.who_should_join} />

      <ArrayCard title="Course Features" items={course.course_features} />

      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
          Curriculum
        </h2>

        <div className="space-y-5">
          {course.curriculum?.map((module, index) => (
            <div
              key={index}
              className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {index + 1}. {module.title}
              </h3>

              {module.description && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {module.description}
                </p>
              )}

              {module.topics?.length > 0 && (
                <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
                  {module.topics.map((topic, topicIndex) => (
                    <li key={topicIndex}>{topic}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <h2 className="mb-5 text-lg font-semibold text-gray-900 dark:text-white">
          FAQs
        </h2>

        <div className="space-y-5">
          {course.faqs?.map((faq, index) => (
            <div key={index}>
              <h3 className="font-medium text-gray-900 dark:text-white">
                {faq.question}
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <p className="text-sm text-gray-500 dark:text-gray-400">{title}</p>

      <p className="mt-2 font-semibold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  );
}

function ContentCard({ title, children }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-3 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      <p className="whitespace-pre-line text-sm leading-7 text-gray-600 dark:text-gray-400">
        {children}
      </p>
    </section>
  );
}

function ArrayCard({ title, items }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      {!items?.length ? (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No information added.
        </p>
      ) : (
        <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600 dark:text-gray-400">
          {items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
    </section>
  );
}
