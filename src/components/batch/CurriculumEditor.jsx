import { useFieldArray, useFormContext } from "react-hook-form";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

const errorClass = "mt-1 text-sm text-red-600";

export default function CurriculumEditor() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const {
    fields: modules,
    append: appendModule,
    remove: removeModule,
  } = useFieldArray({
    control,
    name: "curriculum",
  });

  const addModule = () => {
    appendModule({
      title: "",
      description: "",
      topics: [""],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Curriculum
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add modules and topics that students will learn.
          </p>
        </div>

        <button
          type="button"
          onClick={addModule}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + Add Module
        </button>
      </div>

      {modules.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No curriculum modules added yet.
          </p>

          <button
            type="button"
            onClick={addModule}
            className="mt-3 text-sm font-medium text-blue-600 hover:underline"
          >
            Add your first module
          </button>
        </div>
      )}

      <div className="space-y-6">
        {modules.map((module, moduleIndex) => {
          const moduleErrors = errors.curriculum?.[moduleIndex];

          return (
            <CurriculumModule
              key={module.id}
              moduleIndex={moduleIndex}
              moduleErrors={moduleErrors}
              register={register}
              control={control}
              removeModule={removeModule}
            />
          );
        })}
      </div>
    </div>
  );
}

function CurriculumModule({
  moduleIndex,
  moduleErrors,
  register,
  control,
  removeModule,
}) {
  const {
    fields: topics,
    append: appendTopic,
    remove: removeTopic,
  } = useFieldArray({
    control,
    name: `curriculum.${moduleIndex}.topics`,
  });

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900/50">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h4 className="font-semibold text-gray-900 dark:text-white">
          Module {moduleIndex + 1}
        </h4>

        <button
          type="button"
          onClick={() => removeModule(moduleIndex)}
          className="text-sm font-medium text-red-600 hover:text-red-700"
        >
          Remove Module
        </button>
      </div>

      {/* Module Title */}
      <div className="mb-4">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Module Title
          <span className="ml-1 text-red-500">*</span>
        </label>

        <input
          {...register(`curriculum.${moduleIndex}.title`)}
          placeholder="e.g. React Fundamentals"
          className={inputClass}
        />

        {moduleErrors?.title && (
          <p className={errorClass}>{moduleErrors.title.message}</p>
        )}
      </div>

      {/* Module Description */}
      <div className="mb-5">
        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
          Module Description
          <span className="ml-1 text-red-500">*</span>
        </label>

        <textarea
          {...register(`curriculum.${moduleIndex}.description`)}
          rows={3}
          placeholder="Describe what this module covers..."
          className={inputClass}
        />

        {moduleErrors?.description && (
          <p className={errorClass}>{moduleErrors.description.message}</p>
        )}
      </div>

      {/* Topics */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Topics
              <span className="ml-1 text-red-500">*</span>
            </label>

            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Each topic must contain text.
            </p>
          </div>

          <button
            type="button"
            onClick={() => appendTopic("")}
            className="text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            + Add Topic
          </button>
        </div>

        {topics.length === 0 && (
          <p className="mb-3 text-sm text-red-600">
            At least one curriculum topic is required.
          </p>
        )}

        <div className="space-y-3">
          {topics.map((topic, topicIndex) => {
            const topicError = moduleErrors?.topics?.[topicIndex];

            return (
              <div key={topic.id} className="flex items-start gap-2">
                <div className="flex-1">
                  <input
                    {...register(
                      `curriculum.${moduleIndex}.topics.${topicIndex}`,
                    )}
                    placeholder={`Topic ${topicIndex + 1}`}
                    className={inputClass}
                  />

                  {topicError && (
                    <p className={errorClass}>{topicError.message}</p>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => removeTopic(topicIndex)}
                  className="mt-1 rounded-lg px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                >
                  Remove
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
