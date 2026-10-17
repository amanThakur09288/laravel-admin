import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getService } from "../api/serviceApi";

export default function ServiceDetails() {
  const { id } = useParams();

  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getService(id);

        setService(response.data);
      } catch (error) {
        console.error("Failed to fetch service:", error);

        setError(error.response?.data?.message || "Unable to load service.");
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-gray-600">Loading service...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-lg bg-red-50 p-6 text-red-600">
          <p>{error}</p>

          <Link
            to="/services"
            className="mt-4 inline-block rounded bg-gray-800 px-4 py-2 text-white"
          >
            Back to Services
          </Link>
        </div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="p-6">
        <p className="text-gray-600">Service not found.</p>

        <Link
          to="/services"
          className="mt-4 inline-block rounded bg-gray-800 px-4 py-2 text-white"
        >
          Back to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Service Details</h1>

          <p className="mt-1 text-sm text-gray-500">View service information</p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/services"
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Back
          </Link>

          <Link
            to={`/services/${service.id}/edit`}
            className="rounded-lg bg-[#727CB6] px-4 py-2 text-sm font-medium text-white hover:bg-[#505B95]"
          >
            Edit Service
          </Link>
        </div>
      </div>

      {/* Main Card */}
      <div className="rounded-xl bg-white p-6 shadow-sm">
        {/* Basic Information */}
        <div className="border-b border-gray-200 pb-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                {service.service_name}
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {service.short_description}
              </p>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                service.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {service.status}
            </span>
          </div>
        </div>

        {/* Slug */}
        <div className="grid gap-6 border-b border-gray-200 py-6 md:grid-cols-2">
          <div>
            <p className="text-sm font-medium text-gray-500">Service ID</p>

            <p className="mt-1 text-gray-800">{service.id}</p>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-500">Slug</p>

            <p className="mt-1 text-gray-800">{service.slug}</p>
          </div>
        </div>

        {/* Description */}
        <div className="border-b border-gray-200 py-6">
          <h3 className="mb-3 text-lg font-semibold text-gray-800">
            Description
          </h3>

          <p className="whitespace-pre-line leading-7 text-gray-600">
            {service.description}
          </p>
        </div>

        {/* What We Offer */}
        {Array.isArray(service.offerings) && service.offerings.length > 0 && (
          <div className="border-b border-gray-200 py-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              What We Offer
            </h3>

            <div className="space-y-4">
              {service.offerings.map((offering, index) => (
                <div key={index} className="rounded-lg bg-gray-50 p-4">
                  <h4 className="font-semibold text-gray-800">
                    {offering.title}
                  </h4>

                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    {offering.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Process */}
        {Array.isArray(service.process) && service.process.length > 0 && (
          <div className="border-b border-gray-200 py-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">
              Our Process
            </h3>

            <div className="space-y-4">
              {service.process.map((step, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#727CB6] text-sm font-semibold text-white">
                    {index + 1}
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800">
                      {step.title}
                    </h4>

                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* FAQs */}
        {Array.isArray(service.faqs) && service.faqs.length > 0 && (
          <div className="py-6">
            <h3 className="mb-4 text-lg font-semibold text-gray-800">FAQs</h3>

            <div className="space-y-4">
              {service.faqs.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 p-4"
                >
                  <h4 className="font-semibold text-gray-800">
                    {faq.question}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
