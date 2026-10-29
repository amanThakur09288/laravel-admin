import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { videoSectionSchema } from "../../utils/videoSectionSchema";

import Button from "../common/Button";

const defaultValues = {
  course_id: "",
  title: "",
  description: "",
  sort_order: 1,
  status: "draft",
};

export default function VideoSectionForm({
  courses = [],
  initialData = null,
  onSubmit,
  submitting = false,
  submitText = "Create Video Section",
  onCancel,
}) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(videoSectionSchema),

    defaultValues,
  });

  useEffect(() => {
    if (initialData) {
      reset({
        course_id: initialData.course_id ?? "",
        title: initialData.title ?? "",
        description: initialData.description ?? "",
        sort_order: initialData.sort_order ?? 1,
        status: initialData.status ?? "draft",
      });
    } else {
      reset(defaultValues);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Course *
        </label>

        <Controller
          name="course_id"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              value={field.value ?? ""}
              disabled={submitting}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
            >
              <option value="">Select Course</option>

              {courses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.course_name}
                </option>
              ))}
            </select>
          )}
        />

        {errors.course_id && (
          <p className="mt-1 text-sm text-red-600">
            {errors.course_id.message}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Section Title *
        </label>

        <input
          {...register("title")}
          type="text"
          placeholder="e.g. Introduction to React"
          disabled={submitting}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />

        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Description
        </label>

        <textarea
          {...register("description")}
          rows={5}
          placeholder="Describe what students will learn..."
          disabled={submitting}
          className="w-full resize-y rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
        />

        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Sort Order *
          </label>

          <input
            {...register("sort_order")}
            type="number"
            min="1"
            disabled={submitting}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          />

          {errors.sort_order && (
            <p className="mt-1 text-sm text-red-600">
              {errors.sort_order.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>

          <select
            {...register("status")}
            disabled={submitting}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          >
            <option value="draft">Draft</option>

            <option value="published">Published</option>
          </select>

          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={submitting}
            className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
        )}

        <Button type="submit" disabled={submitting}>
          {submitting ? "Saving..." : submitText}
        </Button>
      </div>
    </form>
  );
}
