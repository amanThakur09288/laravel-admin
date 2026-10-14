// import { z } from "zod";

// const requiredText = (message, maxLength) => {
//   let schema = z.string({ message }).trim().min(1, message);
//   if (maxLength) {
//     schema = schema.max(maxLength, `Maximum ${maxLength} characters allowed.`);
//   }
//   return schema;
// };

// const optionalText = (maxLength) =>
//   z.preprocess(
//     (value) => value ?? "",
//     z
//       .string()
//       .trim()
//       .max(maxLength, `Maximum ${maxLength} characters allowed.`),
//   );

// const numberField = (schema) =>
//   z.preprocess(
//     (value) =>
//       value === "" || value === null || value === undefined
//         ? undefined
//         : Number(value),
//     schema,
//   );

// const cleanList = (value) =>
//   Array.isArray(value)
//     ? value
//         .map((item) => (typeof item === "string" ? item.trim() : item))
//         .filter((item) => item !== "")
//     : [];

// const stringList = z.preprocess(
//   cleanList,
//   z.array(z.string().max(1000, "Maximum 1000 characters allowed.")),
// );

// const listOf = (schema) =>
//   z.preprocess((value) => value ?? [], z.array(schema));

// const curriculumSchema = z.object({
//   title: requiredText("Curriculum module title is required.", 255),
//   description: requiredText("Curriculum module description is required.", 2000),
//   topics: z.preprocess(
//     cleanList,
//     z
//       .array(
//         z.string().max(255, "Curriculum topic cannot exceed 255 characters."),
//       )
//       .min(1, "At least one curriculum topic is required."),
//   ),
// });

// const faqSchema = z.object({
//   question: requiredText("FAQ question is required.", 1000),
//   answer: requiredText("FAQ answer is required.", 5000),
// });

// export const batchSchema = z
//   .object({
//     batch_name: requiredText("Batch name is required.", 255),
//     course_id: z
//       .number({
//         required_error: "Please select a course.",
//         invalid_type_error: "Please select a valid course.",
//       })
//       .int("Please select a valid course.")
//       .positive("Please select a course."),
//     // course_name: requiredText("Course name is required.", 255),
//     short_description: requiredText("Short description is required.", 1000),
//     course_description: optionalText(10000),
//     batch_overview: optionalText(10000),

//     start_date: requiredText("Start date is required."),
//     end_date: requiredText("End date is required."),
//     duration_text: requiredText("Duration is required.", 255),
//     class_days: requiredText("Class days are required.", 255),
//     class_start_time: requiredText("Class start time is required."),
//     class_end_time: requiredText("Class end time is required."),

//     total_classes: numberField(
//       z
//         .number({ message: "Total classes is required." })
//         .int("Total classes must be a whole number.")
//         .min(1, "Total classes must be at least 1.")
//         .max(10000, "Total classes cannot exceed 10000."),
//     ),

//     mode: z.enum(["Online", "Offline", "Hybrid"], {
//       message: "Please select a valid learning mode.",
//     }),
//     location: optionalText(500),

//     total_seats: numberField(
//       z
//         .number({ message: "Total seats is required." })
//         .int("Total seats must be a whole number.")
//         .min(1, "Total seats must be at least 1."),
//     ),
//     available_seats: numberField(
//       z
//         .number({ message: "Available seats is required." })
//         .int("Available seats must be a whole number.")
//         .min(0, "Available seats cannot be negative."),
//     ),

//     status: z.enum(
//       [
//         "Enrolling Open",
//         "Filling Fast",
//         "Few Seats Left",
//         "Coming Soon",
//         "Sold Out",
//       ],
//       { message: "Please select a valid batch status." },
//     ),

//     fee: numberField(
//       z
//         .number({ message: "Fee is required." })
//         .min(0, "Fee cannot be negative.")
//         .max(99999999.99, "Fee is too large."),
//     ),

//     // Empty means "no discount" (null). It must NOT become 0.
//     discounted_fee: z.preprocess(
//       (value) =>
//         value === "" || value === null || value === undefined
//           ? null
//           : Number(value),
//       z
//         .number({ message: "Discounted fee must be a valid number." })
//         .min(0, "Discounted fee cannot be negative.")
//         .nullable(),
//     ),
//     offer_text: optionalText(1000),

//     instructor_name: optionalText(255),
//     instructor_designation: optionalText(255),
//     instructor_experience: optionalText(255),
//     instructor_bio: optionalText(5000),

//     learning_outcomes: stringList,
//     prerequisites: stringList,
//     who_should_join: stringList,
//     payment_info: stringList,

//     curriculum: listOf(curriculumSchema),
//     faqs: listOf(faqSchema),

//     live_class_info: optionalText(2000),
//     recorded_class_info: optionalText(2000),
//     doubt_support: optionalText(2000),
//   })
//   .superRefine((data, ctx) => {
//     const addError = (path, message) =>
//       ctx.addIssue({ code: "custom", path: [path], message });

//     if (data.start_date && data.end_date && data.end_date < data.start_date) {
//       addError("end_date", "End date must be on or after the start date.");
//     }

//     if (
//       data.class_start_time &&
//       data.class_end_time &&
//       data.class_end_time <= data.class_start_time
//     ) {
//       addError(
//         "class_end_time",
//         "Class end time must be after class start time.",
//       );
//     }

//     if (data.available_seats > data.total_seats) {
//       addError("available_seats", "Available seats cannot exceed total seats.");
//     }

//     if (data.discounted_fee !== null && data.discounted_fee >= data.fee) {
//       addError(
//         "discounted_fee",
//         "Discounted fee must be less than the original fee.",
//       );
//     }

//     if (["Offline", "Hybrid"].includes(data.mode) && !data.location) {
//       addError(
//         "location",
//         "Location is required for offline or hybrid batches.",
//       );
//     }
//   })
//   // Final clean-up before sending to the API
//   .transform((data) => ({
//     ...data,
//     location: data.mode === "Online" ? null : data.location || null,
//   }));
import { z } from "zod";

/* =====================================================
   SMALL HELPERS
===================================================== */

const requiredText = (message, maxLength) => {
  let schema = z.string({ message }).trim().min(1, message);

  if (maxLength) {
    schema = schema.max(maxLength, `Maximum ${maxLength} characters allowed.`);
  }

  return schema;
};

// Optional text: null / undefined become "" so inputs never get null
const optionalText = (maxLength) =>
  z.preprocess(
    (value) => value ?? "",
    z
      .string()
      .trim()
      .max(maxLength, `Maximum ${maxLength} characters allowed.`),
  );

// Empty input -> undefined (so the "required" message shows), otherwise a number
const numberField = (schema) =>
  z.preprocess(
    (value) =>
      value === "" || value === null || value === undefined
        ? undefined
        : Number(value),
    schema,
  );

// Trim every item and drop blank rows
const cleanList = (value) =>
  Array.isArray(value)
    ? value
        .map((item) => (typeof item === "string" ? item.trim() : item))
        .filter((item) => item !== "")
    : [];

const stringList = z.preprocess(
  cleanList,
  z.array(z.string().max(1000, "Maximum 1000 characters allowed.")),
);

const listOf = (schema) =>
  z.preprocess((value) => value ?? [], z.array(schema));

/* =====================================================
   NESTED SCHEMAS
===================================================== */

const curriculumSchema = z.object({
  title: requiredText("Curriculum module title is required.", 255),

  description: requiredText("Curriculum module description is required.", 2000),

  topics: z.preprocess(
    cleanList,
    z
      .array(
        z.string().max(255, "Curriculum topic cannot exceed 255 characters."),
      )
      .min(1, "At least one curriculum topic is required."),
  ),
});

const faqSchema = z.object({
  question: requiredText("FAQ question is required.", 1000),

  answer: requiredText("FAQ answer is required.", 5000),
});

/* =====================================================
   MAIN SCHEMA
===================================================== */

export const batchSchema = z
  .object({
    course_id: numberField(
      z
        .number({ message: "Please select a course." })
        .int("Please select a course.")
        .min(1, "Please select a course."),
    ),

    batch_name: requiredText("Batch name is required.", 255),
    short_description: requiredText("Short description is required.", 1000),
    course_description: optionalText(10000),
    batch_overview: optionalText(10000),

    start_date: requiredText("Start date is required."),
    end_date: requiredText("End date is required."),
    duration_text: requiredText("Duration is required.", 255),
    class_days: requiredText("Class days are required.", 255),
    class_start_time: requiredText("Class start time is required."),
    class_end_time: requiredText("Class end time is required."),

    total_classes: numberField(
      z
        .number({ message: "Total classes is required." })
        .int("Total classes must be a whole number.")
        .min(1, "Total classes must be at least 1.")
        .max(10000, "Total classes cannot exceed 10000."),
    ),

    mode: z.enum(["Online", "Offline", "Hybrid"], {
      message: "Please select a valid learning mode.",
    }),

    location: optionalText(500),

    total_seats: numberField(
      z
        .number({ message: "Total seats is required." })
        .int("Total seats must be a whole number.")
        .min(1, "Total seats must be at least 1."),
    ),

    available_seats: numberField(
      z
        .number({ message: "Available seats is required." })
        .int("Available seats must be a whole number.")
        .min(0, "Available seats cannot be negative."),
    ),

    status: z.enum(
      [
        "Enrolling Open",
        "Filling Fast",
        "Few Seats Left",
        "Coming Soon",
        "Sold Out",
      ],
      { message: "Please select a valid batch status." },
    ),

    fee: numberField(
      z
        .number({ message: "Fee is required." })
        .min(0, "Fee cannot be negative.")
        .max(99999999.99, "Fee is too large."),
    ),

    // Empty means "no discount" (null). It must NOT become 0.
    discounted_fee: z.preprocess(
      (value) =>
        value === "" || value === null || value === undefined
          ? null
          : Number(value),
      z
        .number({ message: "Discounted fee must be a valid number." })
        .min(0, "Discounted fee cannot be negative.")
        .nullable(),
    ),

    offer_text: optionalText(1000),

    instructor_name: optionalText(255),
    instructor_designation: optionalText(255),
    instructor_experience: optionalText(255),
    instructor_bio: optionalText(5000),

    learning_outcomes: stringList,
    prerequisites: stringList,
    who_should_join: stringList,
    payment_info: stringList,

    curriculum: listOf(curriculumSchema),
    faqs: listOf(faqSchema),

    live_class_info: optionalText(2000),
    recorded_class_info: optionalText(2000),
    doubt_support: optionalText(2000),
  })
  .superRefine((data, ctx) => {
    const addError = (path, message) =>
      ctx.addIssue({ code: "custom", path: [path], message });

    if (data.start_date && data.end_date && data.end_date < data.start_date) {
      addError("end_date", "End date must be on or after the start date.");
    }

    if (
      data.class_start_time &&
      data.class_end_time &&
      data.class_end_time <= data.class_start_time
    ) {
      addError(
        "class_end_time",
        "Class end time must be after class start time.",
      );
    }

    if (data.available_seats > data.total_seats) {
      addError("available_seats", "Available seats cannot exceed total seats.");
    }

    if (data.discounted_fee !== null && data.discounted_fee >= data.fee) {
      addError(
        "discounted_fee",
        "Discounted fee must be less than the original fee.",
      );
    }

    if (["Offline", "Hybrid"].includes(data.mode) && !data.location) {
      addError(
        "location",
        "Location is required for offline or hybrid batches.",
      );
    }
  })
  // Final clean-up before the data is sent to the API
  .transform((data) => ({
    ...data,
    location: data.mode === "Online" ? null : data.location || null,
  }));
