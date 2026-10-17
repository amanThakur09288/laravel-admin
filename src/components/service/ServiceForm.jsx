import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { serviceSchema } from "../../utils/serviceSchema";
import Button from "../common/Button";

const defaultValues = {
    service_name: "",
    short_description: "",
    description: "",
    offerings: [],
    process: [],
    faqs: [],
    status: "Active",
};

export default function ServiceForm({
    initialData = null,
    onSubmit,
    onCancel,
    loading = false,
}) {
    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(serviceSchema),

        defaultValues: initialData
            ? {
                  service_name: initialData.service_name ?? "",
                  short_description:
                      initialData.short_description ?? "",
                  description: initialData.description ?? "",
                  offerings: initialData.offerings ?? [],
                  process: initialData.process ?? [],
                  faqs: initialData.faqs ?? [],
                  status: initialData.status ?? "Active",
              }
            : defaultValues,
    });

    useEffect(() => {
        if (initialData) {
            reset({
                service_name: initialData.service_name ?? "",
                short_description:
                    initialData.short_description ?? "",
                description: initialData.description ?? "",
                offerings: initialData.offerings ?? [],
                process: initialData.process ?? [],
                faqs: initialData.faqs ?? [],
                status: initialData.status ?? "Active",
            });
        } else {
            reset(defaultValues);
        }
    }, [initialData, reset]);

    const {
        fields: offeringFields,
        append: appendOffering,
        remove: removeOffering,
    } = useFieldArray({
        control,
        name: "offerings",
    });

    const {
        fields: processFields,
        append: appendProcess,
        remove: removeProcess,
    } = useFieldArray({
        control,
        name: "process",
    });

    const {
        fields: faqFields,
        append: appendFaq,
        remove: removeFaq,
    } = useFieldArray({
        control,
        name: "faqs",
    });

    const submitForm = (data) => {
        onSubmit({
            ...data,
            offerings: data.offerings ?? [],
            process: data.process ?? [],
            faqs: data.faqs ?? [],
        });
    };

    return (
        <form
            onSubmit={handleSubmit(submitForm)}
            className="space-y-8"
        >
            {/* Basic Information */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Basic Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Enter the main information about this service.
                    </p>
                </div>

                <div className="space-y-5">
                    {/* Service Name */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Service Name
                        </label>

                        <input
                            type="text"
                            {...register("service_name")}
                            placeholder="e.g. Cloud Services"
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                        />

                        {errors.service_name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.service_name.message}
                            </p>
                        )}
                    </div>

                    {/* Short Description */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Short Description
                        </label>

                        <textarea
                            rows={3}
                            {...register("short_description")}
                            placeholder="Short description shown in service cards and hero section."
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                        />

                        {errors.short_description && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.short_description.message}
                            </p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Service Description
                        </label>

                        <textarea
                            rows={7}
                            {...register("description")}
                            placeholder="Write the complete service overview."
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                        />

                        {errors.description && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.description.message}
                            </p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                            Status
                        </label>

                        <select
                            {...register("status")}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                        >
                            <option value="Active">
                                Active
                            </option>

                            <option value="Inactive">
                                Inactive
                            </option>
                        </select>

                        {errors.status && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.status.message}
                            </p>
                        )}
                    </div>
                </div>
            </section>

            {/* What We Offer */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            What We Offer
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Add the main services or offerings.
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={() =>
                            appendOffering({
                                title: "",
                                description: "",
                            })
                        }
                    >
                        + Add Offering
                    </Button>
                </div>

                <div className="space-y-5">
                    {offeringFields.length === 0 && (
                        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                            No offerings added yet.
                        </div>
                    )}

                    {offeringFields.map((field, index) => (
                        <div
                            key={field.id}
                            className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                    Offering {index + 1}
                                </h3>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeOffering(index)
                                    }
                                    className="text-sm font-medium text-red-600 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Title
                                    </label>

                                    <input
                                        type="text"
                                        {...register(
                                            `offerings.${index}.title`
                                        )}
                                        placeholder="e.g. Cloud Migration"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                                    />

                                    {errors.offerings?.[index]?.title && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {
                                                errors.offerings[index]
                                                    .title.message
                                            }
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Description
                                    </label>

                                    <textarea
                                        rows={4}
                                        {...register(
                                            `offerings.${index}.description`
                                        )}
                                        placeholder="Describe this offering."
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                                    />

                                    {errors.offerings?.[index]
                                        ?.description && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {
                                                errors.offerings[index]
                                                    .description.message
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Process */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Our Process
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Add the steps customers go through.
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={() =>
                            appendProcess({
                                title: "",
                                description: "",
                            })
                        }
                    >
                        + Add Step
                    </Button>
                </div>

                <div className="space-y-5">
                    {processFields.length === 0 && (
                        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                            No process steps added yet.
                        </div>
                    )}

                    {processFields.map((field, index) => (
                        <div
                            key={field.id}
                            className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                    Step {index + 1}
                                </h3>

                                <button
                                    type="button"
                                    onClick={() =>
                                        removeProcess(index)
                                    }
                                    className="text-sm font-medium text-red-600 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Title
                                    </label>

                                    <input
                                        type="text"
                                        {...register(
                                            `process.${index}.title`
                                        )}
                                        placeholder="e.g. Consultation"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                                    />

                                    {errors.process?.[index]?.title && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {
                                                errors.process[index].title
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Description
                                    </label>

                                    <textarea
                                        rows={4}
                                        {...register(
                                            `process.${index}.description`
                                        )}
                                        placeholder="Describe this step."
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                                    />

                                    {errors.process?.[index]
                                        ?.description && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {
                                                errors.process[index]
                                                    .description.message
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* FAQs */}
            <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
                <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Frequently Asked Questions
                        </h2>

                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            Add common customer questions and answers.
                        </p>
                    </div>

                    <Button
                        type="button"
                        onClick={() =>
                            appendFaq({
                                question: "",
                                answer: "",
                            })
                        }
                    >
                        + Add FAQ
                    </Button>
                </div>

                <div className="space-y-5">
                    {faqFields.length === 0 && (
                        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:text-gray-400">
                            No FAQs added yet.
                        </div>
                    )}

                    {faqFields.map((field, index) => (
                        <div
                            key={field.id}
                            className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
                        >
                            <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-medium text-gray-900 dark:text-white">
                                    FAQ {index + 1}
                                </h3>

                                <button
                                    type="button"
                                    onClick={() => removeFaq(index)}
                                    className="text-sm font-medium text-red-600 hover:text-red-700"
                                >
                                    Remove
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Question
                                    </label>

                                    <input
                                        type="text"
                                        {...register(
                                            `faqs.${index}.question`
                                        )}
                                        placeholder="e.g. What cloud services do you provide?"
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                                    />

                                    {errors.faqs?.[index]?.question && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {
                                                errors.faqs[index].question
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                                        Answer
                                    </label>

                                    <textarea
                                        rows={4}
                                        {...register(
                                            `faqs.${index}.answer`
                                        )}
                                        placeholder="Write the answer."
                                        className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-950 dark:text-white"
                                    />

                                    {errors.faqs?.[index]?.answer && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {
                                                errors.faqs[index].answer
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Form Actions */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={loading}
                    className="rounded-lg border border-gray-300 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                >
                    Cancel
                </button>

                <Button
                    type="submit"
                    disabled={loading}
                >
                    {loading
                        ? "Saving..."
                        : initialData
                        ? "Update Service"
                        : "Create Service"}
                </Button>
            </div>
        </form>
    );
}