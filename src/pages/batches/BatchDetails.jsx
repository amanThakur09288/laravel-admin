import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getBatch } from "../../api/batchApi";
import Button from "../../components/common/Button";
import PageLoader from "../../components/common/PageLoader";
import { getApiErrorMessage } from "../../utils/apiError";

const formatDate = (date) => {
  if (!date) {
    return "-";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatCurrency = (value) => {
  if (value === null || value === undefined) {
    return "-";
  }

  return `₹${Number(value).toLocaleString("en-IN")}`;
};

export default function BatchDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [batch, setBatch] = useState(null);

  const [loading, setLoading] = useState(true);

  const fetchBatch = async () => {
    try {
      setLoading(true);

      const response = await getBatch(id);

      setBatch(response.data);
    } catch (error) {
      console.error("Failed to fetch batch:", error);

      toast.error(getApiErrorMessage(error));

      navigate("/batches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatch();
  }, [id]);

  if (loading) {
    return <PageLoader />;
  }

  if (!batch) {
    return null;
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {batch.batch_name}
          </h1>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {batch.course_name}
          </p>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate("/batches")}
          >
            Back
          </Button>

          <Button
            type="button"
            onClick={() => navigate(`/batches/${batch.id}/edit`)}
          >
            Edit Batch
          </Button>
        </div>
      </div>

      {/* BASIC INFO */}

      <Section title="Batch Information">
        <Info label="Batch Name" value={batch.batch_name} />

        <Info label="Course" value={batch.course_name} />

        <Info label="Slug" value={batch.slug} />

        <Info label="Status" value={batch.status} />

        <Info label="Mode" value={batch.mode} />

        <Info label="Location" value={batch.location} />
      </Section>

      {/* SCHEDULE */}

      <Section title="Schedule">
        <Info label="Start Date" value={formatDate(batch.start_date)} />

        <Info label="End Date" value={formatDate(batch.end_date)} />

        <Info label="Duration" value={batch.duration_text} />

        <Info label="Class Days" value={batch.class_days} />

        <Info label="Class Timing" value={batch.class_timing} />

        <Info label="Total Classes" value={batch.total_classes} />
      </Section>

      {/* SEATS */}

      <Section title="Seats & Pricing">
        <Info label="Total Seats" value={batch.total_seats} />

        <Info label="Available Seats" value={batch.available_seats} />

        <Info label="Original Fee" value={formatCurrency(batch.fee)} />

        <Info
          label="Discounted Fee"
          value={
            batch.discounted_fee ? formatCurrency(batch.discounted_fee) : "-"
          }
        />

        <Info label="Offer" value={batch.offer_text} />
      </Section>

      {/* DESCRIPTION */}

      <Section title="Descriptions">
        <TextBlock title="Short Description" value={batch.short_description} />

        <TextBlock
          title="Course Description"
          value={batch.course_description}
        />

        <TextBlock title="Batch Overview" value={batch.batch_overview} />
      </Section>

      {/* INSTRUCTOR */}

      <Section title="Instructor">
        <Info label="Name" value={batch.instructor_name} />

        <Info label="Designation" value={batch.instructor_designation} />

        <Info label="Experience" value={batch.instructor_experience} />

        <div className="md:col-span-2">
          <TextBlock title="Bio" value={batch.instructor_bio} />
        </div>
      </Section>

      {/* CURRICULUM */}

      {batch.curriculum?.length > 0 && (
        <Section title="Curriculum">
          <div className="md:col-span-2 space-y-4">
            {batch.curriculum.map((module, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {module.title}
                </h3>

                {module.description && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {module.description}
                  </p>
                )}

                {module.topics?.length > 0 && (
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-600 dark:text-gray-400">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex}>{topic}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* FAQ */}

      {batch.faqs?.length > 0 && (
        <Section title="FAQs">
          <div className="md:col-span-2 space-y-4">
            {batch.faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 p-4 dark:border-gray-700"
              >
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* SUPPORT */}

      <Section title="Support Information">
        <div className="md:col-span-2 space-y-5">
          <TextBlock title="Live Classes" value={batch.live_class_info} />

          <TextBlock
            title="Recorded Classes"
            value={batch.recorded_class_info}
          />

          <TextBlock title="Doubt Support" value={batch.doubt_support} />
        </div>
      </Section>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
      <h2 className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
        {title}
      </h2>

      <div className="grid gap-5 md:grid-cols-2">{children}</div>
    </section>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-sm text-gray-900 dark:text-gray-200">
        {value || "-"}
      </p>
    </div>
  );
}

function TextBlock({ title, value }) {
  return (
    <div>
      <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </p>

      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-gray-600 dark:text-gray-400">
        {value || "-"}
      </p>
    </div>
  );
}
