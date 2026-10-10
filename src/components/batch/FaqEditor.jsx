import { useFieldArray, useFormContext } from "react-hook-form";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white";

const errorClass = "mt-1 text-sm text-red-600";

export default function FaqEditor() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  const addFaq = () => {
    append({
      question: "",
      answer: "",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Frequently Asked Questions
          </h3>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Add common questions students may have.
          </p>
        </div>

        <button
          type="button"
          onClick={addFaq}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Add FAQ
        </button>
      </div>

      {fields.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center dark:border-gray-700">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            No FAQs added.
          </p>

          <button
            type="button"
            onClick={addFaq}
            className="mt-3 text-sm font-medium text-blue-600 hover:underline"
          >
            Add your first FAQ
          </button>
        </div>
      )}

      <div className="space-y-5">
        {fields.map((field, index) => {
          const faqErrors = errors.faqs?.[index];

          return (
            <div
              key={field.id}
              className="rounded-xl border border-gray-200 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-900/50"
            >
              <div className="mb-4 flex items-center justify-between">
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  FAQ {index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-sm font-medium text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              <div className="mb-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Question
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <input
                  {...register(`faqs.${index}.question`)}
                  placeholder="e.g. Is this course live?"
                  className={inputClass}
                />

                {faqErrors?.question && (
                  <p className={errorClass}>{faqErrors.question.message}</p>
                )}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Answer
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <textarea
                  {...register(`faqs.${index}.answer`)}
                  rows={4}
                  placeholder="Write the answer..."
                  className={inputClass}
                />

                {faqErrors?.answer && (
                  <p className={errorClass}>{faqErrors.answer.message}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
