import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { courseSchema } from "../../utils/courseSchema";
import Button from "../common/Button";

const defaultValues = {
  course_name: "",
  category: "",
  level: "Beginner",
  short_description: "",
  course_description: "",
  duration: "",
  total_hours: "",
  status: "Active",
  learning_outcomes: [],
  curriculum: [],
  prerequisites: [],
  who_should_join: [],
  course_features: [],
  faqs: [],
};

function TextInput({
  label,
  register,
  name,
  error,
  type = "text",
  placeholder = "",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none transition dark:bg-gray-900 dark:text-white ${
          error
            ? "border-red-500"
            : "border-gray-300 focus:border-blue-500 dark:border-gray-700"
        }`}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

function TextArea({
  label,
  register,
  name,
  error,
  rows = 4,
  placeholder = "",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      <textarea
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        className={`w-full resize-y rounded-lg border px-4 py-3 text-sm outline-none transition dark:bg-gray-900 dark:text-white ${
          error
            ? "border-red-500"
            : "border-gray-300 focus:border-blue-500 dark:border-gray-700"
        }`}
      />

      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
}

export default function CourseForm({
  initialData = null,
  onSubmit,
  submitting = false,
  submitText = "Save Course",
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(courseSchema),
    defaultValues,
  });

  const {
    fields: outcomeFields,
    append: appendOutcome,
    remove: removeOutcome,
  } = useFieldArray({
    control,
    name: "learning_outcomes",
  });

  const {
    fields: curriculumFields,
    append: appendCurriculum,
    remove: removeCurriculum,
  } = useFieldArray({ control, name: "curriculum" });

  const {
    fields: prerequisiteFields,
    append: appendPrerequisite,
    remove: removePrerequisite,
  } = useFieldArray({
    control,
    name: "prerequisites",
  });

  const {
    fields: whoFields,
    append: appendWho,
    remove: removeWho,
  } = useFieldArray({
    control,
    name: "who_should_join",
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "course_features",
  });

  const {
    fields: faqFields,
    append: appendFaq,
    remove: removeFaq,
  } = useFieldArray({
    control,
    name: "faqs",
  });

  useEffect(() => {
    if (!initialData) {
      reset(defaultValues);
      return;
    }

    reset({
      course_name: initialData.course_name ?? "",
      category: initialData.category ?? "",
      level: initialData.level ?? "Beginner",
      short_description: initialData.short_description ?? "",
      course_description: initialData.course_description ?? "",
      duration: initialData.duration ?? "",
      total_hours: initialData.total_hours ?? "",
      status: initialData.status ?? "Active",
      learning_outcomes: Array.isArray(initialData.learning_outcomes)
        ? initialData.learning_outcomes.map((item) => ({
            value: item ?? "",
          }))
        : [],

      curriculum: Array.isArray(initialData.curriculum)
        ? initialData.curriculum.map((module) => ({
            title: module.title ?? "",
            description: module.description ?? "",
            topicsText: Array.isArray(module.topics)
              ? module.topics.join(", ")
              : "",
          }))
        : [],

      prerequisites: Array.isArray(initialData.prerequisites)
        ? initialData.prerequisites.map((item) => ({
            value: item ?? "",
          }))
        : [],

      who_should_join: Array.isArray(initialData.who_should_join)
        ? initialData.who_should_join.map((item) => ({
            value: item ?? "",
          }))
        : [],

      course_features: Array.isArray(initialData.course_features)
        ? initialData.course_features.map((item) => ({
            value: item ?? "",
          }))
        : [],

      faqs: Array.isArray(initialData.faqs)
        ? initialData.faqs.map((faq) => ({
            question: faq.question ?? "",
            answer: faq.answer ?? "",
          }))
        : [],
    });
  }, [initialData, reset]);

  const submit = (data) => {
    const payload = {
      ...data,
      total_hours:
        data.total_hours === "" || data.total_hours === undefined
          ? null
          : Number(data.total_hours),

      /*
            | Convert:
            |
            | [{ value: "React" }]
            |
            | to:
            |
            | ["React"]
            */

      learning_outcomes: data.learning_outcomes.map((item) =>
        item.value.trim(),
      ),

      prerequisites: data.prerequisites.map((item) => item.value.trim()),

      who_should_join: data.who_should_join.map((item) => item.value.trim()),

      course_features: data.course_features.map((item) => item.value.trim()),

      /*
            | Convert curriculum form data
            | into backend format.
            */

      curriculum: data.curriculum.map((module) => ({
        title: module.title.trim(),

        description: module.description.trim(),

        topics: module.topicsText
          .split(",")
          .map((topic) => topic.trim())
          .filter(Boolean),
      })),

      /*
            | FAQ structure already matches
            | the backend.
            */

      faqs: data.faqs.map((faq) => ({
        question: faq.question.trim(),

        answer: faq.answer.trim(),
      })),
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-8">
      {/* =========================================================
                BASIC INFORMATION
            ========================================================= */}

      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Enter the basic information about the course.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <TextInput
            label="Course Name"
            name="course_name"
            register={register}
            error={errors.course_name}
            placeholder="e.g. Full Stack Web Development"
          />

          <TextInput
            label="Category"
            name="category"
            register={register}
            error={errors.category}
            placeholder="e.g. Web Development"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Level
            </label>

            <select
              {...register("level")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="Beginner">Beginner</option>

              <option value="Intermediate">Intermediate</option>

              <option value="Advanced">Advanced</option>
            </select>

            {errors.level && (
              <p className="mt-1 text-xs text-red-500">
                {errors.level.message}
              </p>
            )}
          </div>

          <TextInput
            label="Duration"
            name="duration"
            register={register}
            error={errors.duration}
            placeholder="e.g. 4 Months"
          />

          <TextInput
            label="Total Hours"
            name="total_hours"
            type="number"
            register={register}
            error={errors.total_hours}
            placeholder="e.g. 120"
          />

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Status
            </label>

            <select
              {...register("status")}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="Active">Active</option>

              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="mt-5 space-y-5">
          <TextArea
            label="Short Description"
            name="short_description"
            register={register}
            error={errors.short_description}
            rows={3}
            placeholder="Short description of the course..."
          />

          <TextArea
            label="Course Description"
            name="course_description"
            register={register}
            error={errors.course_description}
            rows={6}
            placeholder="Detailed description of the course..."
          />
        </div>
      </section>

      {/* =========================================================
                LEARNING OUTCOMES
            ========================================================= */}

      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Learning Outcomes
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              What will students learn?
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              appendOutcome({
                value: "",
              })
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add
          </button>
        </div>

        <div className="space-y-3">
          {outcomeFields.map((field, index) => (
            <div key={field.id} className="flex gap-3">
              <div className="flex-1">
                <input
                  {...register(`learning_outcomes.${index}.value`)}
                  placeholder="e.g. Build responsive React applications"
                  className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-white ${
                    errors.learning_outcomes?.[index]?.value
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-700"
                  }`}
                />

                {errors.learning_outcomes?.[index]?.value && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.learning_outcomes[index].value.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeOutcome(index)}
                className="rounded-lg px-3 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
                CURRICULUM
            ========================================================= */}

      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Curriculum
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add course modules and topics.
            </p>
          </div>

          <button
            type="button"
            onClick={() =>
              appendCurriculum({
                title: "",
                description: "",
                topicsText: "",
              })
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add Module
          </button>
        </div>

        <div className="space-y-5">
          {curriculumFields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  Module {index + 1}
                </h3>

                <button
                  type="button"
                  onClick={() => removeCurriculum(index)}
                  className="text-sm text-red-600 hover:underline dark:text-red-400"
                >
                  Remove Module
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    {...register(`curriculum.${index}.title`)}
                    placeholder="Module title"
                    className={`w-full rounded-lg border px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:bg-gray-900 dark:text-white ${
                      errors.curriculum?.[index]?.title
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-700"
                    }`}
                  />

                  {errors.curriculum?.[index]?.title && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.curriculum[index].title.message}
                    </p>
                  )}
                </div>

                <textarea
                  rows={3}
                  {...register(`curriculum.${index}.description`)}
                  placeholder="Module description"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />

                <div>
                  <input
                    {...register(`curriculum.${index}.topicsText`)}
                    placeholder="Topics separated by commas: React, Redux, Hooks"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />

                  {errors.curriculum?.[index]?.topicsText && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.curriculum[index].topicsText.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
                PREREQUISITES
            ========================================================= */}

      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Prerequisites
          </h2>

          <button
            type="button"
            onClick={() =>
              appendPrerequisite({
                value: "",
              })
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add
          </button>
        </div>

        <div className="space-y-3">
          {prerequisiteFields.map((field, index) => (
            <div key={field.id} className="flex gap-3">
              <div className="flex-1">
                <input
                  {...register(`prerequisites.${index}.value`)}
                  placeholder="e.g. Basic JavaScript knowledge"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />

                {errors.prerequisites?.[index]?.value && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.prerequisites[index].value.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removePrerequisite(index)}
                className="rounded-lg px-3 text-red-600 hover:bg-red-50 dark:text-red-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
                WHO SHOULD JOIN
            ========================================================= */}

      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Who Should Join
          </h2>

          <button
            type="button"
            onClick={() =>
              appendWho({
                value: "",
              })
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add
          </button>
        </div>

        <div className="space-y-3">
          {whoFields.map((field, index) => (
            <div key={field.id} className="flex gap-3">
              <div className="flex-1">
                <input
                  {...register(`who_should_join.${index}.value`)}
                  placeholder="e.g. Beginners"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />

                {errors.who_should_join?.[index]?.value && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.who_should_join[index].value.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeWho(index)}
                className="rounded-lg px-3 text-red-600 hover:bg-red-50 dark:text-red-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
                COURSE FEATURES
            ========================================================= */}

      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Course Features
          </h2>

          <button
            type="button"
            onClick={() =>
              appendFeature({
                value: "",
              })
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add
          </button>
        </div>

        <div className="space-y-3">
          {featureFields.map((field, index) => (
            <div key={field.id} className="flex gap-3">
              <div className="flex-1">
                <input
                  {...register(`course_features.${index}.value`)}
                  placeholder="e.g. Live Projects"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                />

                {errors.course_features?.[index]?.value && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.course_features[index].value.message}
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="rounded-lg px-3 text-red-600 hover:bg-red-50 dark:text-red-400"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
                FAQ
            ========================================================= */}

      <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            FAQs
          </h2>

          <button
            type="button"
            onClick={() =>
              appendFaq({
                question: "",
                answer: "",
              })
            }
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Add FAQ
          </button>
        </div>

        <div className="space-y-5">
          {faqFields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border border-gray-200 p-5 dark:border-gray-700"
            >
              <div className="mb-4 flex justify-between">
                <h3 className="font-medium text-gray-900 dark:text-white">
                  FAQ {index + 1}
                </h3>

                <button
                  type="button"
                  onClick={() => removeFaq(index)}
                  className="text-sm text-red-600 hover:underline dark:text-red-400"
                >
                  Remove
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <input
                    {...register(`faqs.${index}.question`)}
                    placeholder="Question"
                    className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />

                  {errors.faqs?.[index]?.question && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.faqs[index].question.message}
                    </p>
                  )}
                </div>

                <div>
                  <textarea
                    {...register(`faqs.${index}.answer`)}
                    rows={4}
                    placeholder="Answer"
                    className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
                  />

                  {errors.faqs?.[index]?.answer && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.faqs[index].answer.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================
                SUBMIT
            ========================================================= */}

      <div className="flex justify-end">
        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitText}
        </Button>
      </div>
    </form>
  );
}
