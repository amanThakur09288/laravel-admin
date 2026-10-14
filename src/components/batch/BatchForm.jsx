// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

// import { getCourses } from "../../api/courseApi";
// import {
//   FormProvider,
//   Controller,
//   useForm,
//   useFormContext,
//   useFieldArray,
// } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";

// import { batchSchema } from "../../utils/batchSchema";
// import Button from "../common/Button";
// import CurriculumEditor from "./CurriculumEditor";
// import FaqEditor from "./FaqEditor";
// import GooglePlaceAutocomplete from "../common/GooglePlaceAutocomplete";

// const defaultValues = {
//   batch_name: "",
//   course_name: "",
//   short_description: "",
//   course_description: "",
//   batch_overview: "",

//   start_date: "",
//   end_date: "",
//   duration_text: "",
//   class_days: "",
//   class_start_time: "",
//   class_end_time: "",

//   total_classes: 1,

//   mode: "Online",
//   location: "",

//   total_seats: 1,
//   available_seats: 1,

//   status: "Coming Soon",

//   fee: "",
//   discounted_fee: "",

//   offer_text: "",

//   instructor_name: "",
//   instructor_designation: "",
//   instructor_experience: "",
//   instructor_bio: "",

//   learning_outcomes: [],
//   curriculum: [],
//   prerequisites: [],
//   who_should_join: [],
//   faqs: [],
//   payment_info: [],

//   live_class_info: "",
//   recorded_class_info: "",
//   doubt_support: "",
// };

// export default function BatchForm({
//   initialValues,
//   onSubmit,
//   loading = false,
//   submitText = "Save Batch",
// }) {

//   const methods = useForm({
//     resolver: zodResolver(batchSchema),
//     defaultValues: initialValues || defaultValues,
//     mode: "onBlur",
//     reValidateMode: "onChange",
//   });

//   useEffect(() => {
//     if (initialValues) {
//       methods.reset({
//         ...defaultValues,
//         ...initialValues,
//       });
//     }
//   }, [initialValues]);

//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
//         <BasicInformation />
//         <Schedule />
//         <SeatsAndPricing />
//         <Instructor />
//         <CurriculumSection />
//         <FaqSection />
//         <AdditionalInformation />
//         <div className="flex justify-end border-t border-gray-200 pt-6 dark:border-gray-800">
//           <Button type="submit" loading={loading}>
//             {submitText}
//           </Button>
//         </div>
//       </form>
//     </FormProvider>
//   );
// }

// function BasicInformation() {
//   return (
//     <Section
//       title="Basic Information"
//       description="Enter the main information about this batch."
//     >
//       <div className="grid gap-5 md:grid-cols-2">
//         <TextInput
//           name="batch_name"
//           label="Batch Name"
//           required
//           placeholder="e.g. React JS Batch 01"
//         />

//         <TextInput
//           name="course_name"
//           label="Course Name"
//           required
//           placeholder="e.g. React JS"
//         />
//       </div>

//       <TextArea
//         name="short_description"
//         label="Short Description"
//         required
//         rows={3}
//         placeholder="Short description of this batch..."
//       />

//       <TextArea
//         name="course_description"
//         label="Course Description"
//         rows={5}
//         placeholder="Detailed course description..."
//       />

//       <TextArea
//         name="batch_overview"
//         label="Batch Overview"
//         rows={5}
//         placeholder="Explain this particular batch..."
//       />
//     </Section>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Schedule
// |--------------------------------------------------------------------------
// */

// function Schedule() {
//   const { watch, setValue } = useFormContext();

//   const mode = watch("mode");

//   useEffect(() => {
//     if (mode === "Online") {
//       setValue("location", "", {
//         shouldValidate: true,
//       });
//     }
//   }, [mode, setValue]);

//   return (
//     <Section
//       title="Schedule"
//       description="Configure when and where the batch will be conducted."
//     >
//       <div className="grid gap-5 md:grid-cols-2">
//         <TextInput name="start_date" label="Start Date" required type="date" />

//         <TextInput name="end_date" label="End Date" required type="date" />

//         <TextInput
//           name="duration_text"
//           label="Duration"
//           required
//           placeholder="e.g. 4 Weeks"
//         />

//         <TextInput
//           name="class_days"
//           label="Class Days"
//           required
//           placeholder="e.g. Monday, Wednesday, Friday"
//         />

//         <TextInput
//           name="class_start_time"
//           label="Class Start Time"
//           required
//           type="time"
//         />

//         <TextInput
//           name="class_end_time"
//           label="Class End Time"
//           required
//           type="time"
//         />
//       </div>

//       <TextInput
//         name="total_classes"
//         label="Total Classes"
//         required
//         type="number"
//         min="1"
//       />

//       <div className="grid gap-5 md:grid-cols-2">
//         <SelectInput
//           name="mode"
//           label="Learning Mode"
//           required
//           options={[
//             {
//               label: "Online",
//               value: "Online",
//             },
//             {
//               label: "Offline",
//               value: "Offline",
//             },
//             {
//               label: "Hybrid",
//               value: "Hybrid",
//             },
//           ]}
//         />

//         <LocationField disabled={mode === "Online"} />
//       </div>
//     </Section>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Seats and Pricing
// |--------------------------------------------------------------------------
// */

// function SeatsAndPricing() {
//   return (
//     <Section
//       title="Seats & Pricing"
//       description="Configure seats, batch status and pricing."
//     >
//       <div className="grid gap-5 md:grid-cols-2">
//         <TextInput
//           name="total_seats"
//           label="Total Seats"
//           required
//           type="number"
//           min="1"
//         />

//         <TextInput
//           name="available_seats"
//           label="Available Seats"
//           required
//           type="number"
//           min="0"
//         />

//         <SelectInput
//           name="status"
//           label="Batch Status"
//           required
//           options={[
//             {
//               label: "Enrolling Open",
//               value: "Enrolling Open",
//             },
//             {
//               label: "Filling Fast",
//               value: "Filling Fast",
//             },
//             {
//               label: "Few Seats Left",
//               value: "Few Seats Left",
//             },
//             {
//               label: "Coming Soon",
//               value: "Coming Soon",
//             },
//             {
//               label: "Sold Out",
//               value: "Sold Out",
//             },
//           ]}
//         />

//         <TextInput
//           name="fee"
//           label="Fee"
//           required
//           type="number"
//           min="0"
//           step="0.01"
//           placeholder="e.g. 15000"
//         />

//         <TextInput
//           name="discounted_fee"
//           label="Discounted Fee"
//           type="number"
//           min="0"
//           step="0.01"
//           placeholder="e.g. 12000"
//         />
//       </div>

//       <TextArea
//         name="offer_text"
//         label="Offer Text"
//         rows={3}
//         placeholder="e.g. Early bird discount available..."
//       />
//     </Section>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Instructor
// |--------------------------------------------------------------------------
// */

// function Instructor() {
//   return (
//     <Section title="Instructor" description="Add instructor information.">
//       <div className="grid gap-5 md:grid-cols-2">
//         <TextInput name="instructor_name" label="Instructor Name" />

//         <TextInput name="instructor_designation" label="Designation" />

//         <TextInput
//           name="instructor_experience"
//           label="Experience"
//           placeholder="e.g. 8+ Years"
//         />
//       </div>

//       <TextArea name="instructor_bio" label="Instructor Bio" rows={5} />
//     </Section>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Curriculum
// |--------------------------------------------------------------------------
// */

// function CurriculumSection() {
//   return (
//     <Section
//       title="Curriculum"
//       description="Create curriculum modules and topics."
//     >
//       <CurriculumEditor />
//     </Section>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | FAQ
// |--------------------------------------------------------------------------
// */

// function FaqSection() {
//   return (
//     <Section title="FAQs" description="Add frequently asked questions.">
//       <FaqEditor />
//     </Section>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Additional Information
// |--------------------------------------------------------------------------
// */

// function AdditionalInformation() {
//   return (
//     <Section
//       title="Additional Information"
//       description="Add supporting information for students."
//     >
//       <TextAreaArray
//         name="learning_outcomes"
//         label="Learning Outcomes"
//         placeholder="e.g. Build production-ready React applications"
//       />

//       <TextAreaArray
//         name="prerequisites"
//         label="Prerequisites"
//         placeholder="e.g. Basic JavaScript knowledge"
//       />

//       <TextAreaArray
//         name="who_should_join"
//         label="Who Should Join?"
//         placeholder="e.g. Frontend developers"
//       />

//       <TextAreaArray
//         name="payment_info"
//         label="Payment Information"
//         placeholder="e.g. EMI available"
//       />

//       <TextArea
//         name="live_class_info"
//         label="Live Class Information"
//         rows={4}
//       />

//       <TextArea
//         name="recorded_class_info"
//         label="Recorded Class Information"
//         rows={4}
//       />

//       <TextArea name="doubt_support" label="Doubt Support" rows={4} />
//     </Section>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Location
// |--------------------------------------------------------------------------
// */

// function LocationField({ disabled }) {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div>
//       <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//         Location
//         {!disabled && <span className="ml-1 text-red-500">*</span>}
//       </label>

//       <Controller
//         name="location"
//         control={control}
//         render={({ field }) => (
//           <GooglePlaceAutocomplete
//             value={field.value || ""}
//             onChange={field.onChange}
//             disabled={disabled}
//           />
//         )}
//       />

//       {errors.location && (
//         <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
//       )}

//       {disabled && (
//         <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//           Location is not required for online batches.
//         </p>
//       )}
//     </div>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Reusable Inputs
// |--------------------------------------------------------------------------
// */

// function TextInput({ name, label, required = false, type = "text", ...props }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   const error = getNestedError(errors, name);

//   return (
//     <div>
//       <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//         {label}

//         {required && <span className="ml-1 text-red-500">*</span>}
//       </label>

//       <input
//         {...register(name)}
//         type={type}
//         className={inputClass}
//         {...props}
//       />

//       {error && <p className={errorClass}>{error.message}</p>}
//     </div>
//   );
// }

// function TextArea({ name, label, required = false, ...props }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   const error = getNestedError(errors, name);

//   return (
//     <div>
//       <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//         {label}

//         {required && <span className="ml-1 text-red-500">*</span>}
//       </label>

//       <textarea {...register(name)} className={inputClass} {...props} />

//       {error && <p className={errorClass}>{error.message}</p>}
//     </div>
//   );
// }

// function SelectInput({ name, label, required = false, options }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   const error = getNestedError(errors, name);

//   return (
//     <div>
//       <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//         {label}

//         {required && <span className="ml-1 text-red-500">*</span>}
//       </label>

//       <select {...register(name)} className={inputClass}>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>

//       {error && <p className={errorClass}>{error.message}</p>}
//     </div>
//   );
// }

// function TextAreaArray({ name, label, placeholder }) {
//   const {
//     control,
//     register,
//     formState: { errors },
//   } = useFormContext();

//   //   const { fields, append, remove } = require("react-hook-form").useFieldArray({
//   //     control,
//   //     name,
//   //   });

//   const { fields, append, remove } = useFieldArray({ control, name });
//   const error = errors[name];
//   console.log({ errors });
//   return (
//     <div>
//       <div className="mb-2 flex items-center justify-between">
//         <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//           {label}
//         </label>

//         <button
//           type="button"
//           onClick={() => append("")}
//           className="text-sm font-medium text-blue-600 hover:text-blue-700"
//         >
//           + Add
//         </button>
//       </div>

//       <div className="space-y-3">
//         {fields.map((field, index) => (
//           <div key={field.id} className="flex gap-2">
//             <input
//               {...register(`${name}.${index}`)}
//               placeholder={placeholder}
//               className={inputClass}
//             />

//             <button
//               type="button"
//               onClick={() => remove(index)}
//               className="rounded-lg px-3 text-sm text-red-600 hover:bg-red-50"
//             >
//               Remove
//             </button>
//           </div>
//         ))}
//       </div>

//       {error?.message && <p className={errorClass}>{error.message}</p>}
//     </div>
//   );
// }

// /*
// |--------------------------------------------------------------------------
// | Section
// |--------------------------------------------------------------------------
// */

// function Section({ title, description, children }) {
//   return (
//     <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-6">
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//           {title}
//         </h2>

//         {description && (
//           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//             {description}
//           </p>
//         )}
//       </div>

//       <div className="space-y-5">{children}</div>
//     </section>
//   );
// }

// const inputClass =
//   "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:disabled:bg-gray-800";

// const errorClass = "mt-1 text-sm text-red-600";

// function getNestedError(errors, path) {
//   return path.split(".").reduce((current, key) => current?.[key], errors);
// }

// import { useEffect, useState } from "react";

// import {
//   FormProvider,
//   Controller,
//   useForm,
//   useFormContext,
//   useFieldArray,
// } from "react-hook-form";

// import { zodResolver } from "@hookform/resolvers/zod";

// import { getCourses } from "../../api/courseApi";
// import { batchSchema } from "../../utils/batchSchema";

// import Button from "../common/Button";
// import CurriculumEditor from "./CurriculumEditor";
// import FaqEditor from "./FaqEditor";
// import GooglePlaceAutocomplete from "../common/GooglePlaceAutocomplete";

// const defaultValues = {
//   course_id: "",

//   batch_name: "",
//   short_description: "",
//   course_description: "",
//   batch_overview: "",

//   start_date: "",
//   end_date: "",

//   duration_text: "",
//   class_days: "",
//   class_start_time: "",
//   class_end_time: "",

//   total_classes: 1,

//   mode: "Online",
//   location: "",

//   total_seats: 1,
//   available_seats: 1,

//   status: "Coming Soon",

//   fee: "",
//   discounted_fee: "",

//   offer_text: "",

//   instructor_name: "",
//   instructor_designation: "",
//   instructor_experience: "",
//   instructor_bio: "",

//   learning_outcomes: [],
//   curriculum: [],
//   prerequisites: [],
//   who_should_join: [],
//   faqs: [],
//   payment_info: [],

//   live_class_info: "",
//   recorded_class_info: "",
//   doubt_support: "",
// };

// export default function BatchForm({
//   initialValues,
//   onSubmit,
//   loading = false,
//   submitText = "Save Batch",
// }) {
//   const [courses, setCourses] = useState([]);
//   const [coursesLoading, setCoursesLoading] = useState(true);
//   const [coursesError, setCoursesError] = useState("");

//   const methods = useForm({
//     resolver: zodResolver(batchSchema),

//     defaultValues: {
//       ...defaultValues,
//       ...initialValues,
//       course_id: initialValues?.course_id ?? initialValues?.course?.id ?? "",
//     },

//     mode: "onBlur",
//     reValidateMode: "onChange",
//   });

//   const { reset } = methods;

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         setCoursesLoading(true);
//         setCoursesError("");

//         const response = await getCourses();

//         const courseData = Array.isArray(response.data) ? response.data : [];

//         setCourses(courseData);
//       } catch (error) {
//         console.error("Failed to fetch courses:", error);

//         setCoursesError("Unable to load courses. Please try again.");
//       } finally {
//         setCoursesLoading(false);
//       }
//     };

//     fetchCourses();
//   }, []);

//   useEffect(() => {
//     if (!initialValues) {
//       return;
//     }

//     reset({
//       ...defaultValues,
//       ...initialValues,

//       course_id: initialValues?.course_id ?? initialValues?.course?.id ?? "",

//       learning_outcomes: initialValues.learning_outcomes || [],

//       curriculum: initialValues.curriculum || [],

//       prerequisites: initialValues.prerequisites || [],

//       who_should_join: initialValues.who_should_join || [],

//       faqs: initialValues.faqs || [],

//       payment_info: initialValues.payment_info || [],
//     });
//   }, [initialValues, reset]);

//   const handleFormSubmit = (data) => {
//     const formattedData = {
//       ...data,
//       course_id: Number(data.course_id),
//     };

//     onSubmit(formattedData);
//   };

//   return (
//     <FormProvider {...methods}>
//       <form
//         onSubmit={methods.handleSubmit(handleFormSubmit)}
//         className="space-y-8"
//       >
//         <BasicInformation
//           courses={courses}
//           coursesLoading={coursesLoading}
//           coursesError={coursesError}
//         />

//         <Schedule />

//         <SeatsAndPricing />

//         <Instructor />

//         <CurriculumSection />

//         <FaqSection />

//         <AdditionalInformation />

//         <div className="flex justify-end border-t border-gray-200 pt-6 dark:border-gray-800">
//           <Button type="submit" loading={loading}>
//             {submitText}
//           </Button>
//         </div>
//       </form>
//     </FormProvider>
//   );
// }

// function BasicInformation({ courses, coursesLoading, coursesError }) {
//   return (
//     <Section
//       title="Basic Information"
//       description="Enter the main information about this batch."
//     >
//       <div className="grid gap-5 md:grid-cols-2">
//         <TextInput
//           name="batch_name"
//           label="Batch Name"
//           required
//           placeholder="e.g. React JS Batch 01"
//         />

//         <CourseSelect
//           courses={courses}
//           loading={coursesLoading}
//           errorMessage={coursesError}
//         />
//       </div>

//       <TextArea
//         name="short_description"
//         label="Short Description"
//         required
//         rows={3}
//         placeholder="Short description of this batch..."
//       />

//       <TextArea
//         name="course_description"
//         label="Course Description"
//         rows={5}
//         placeholder="Detailed course description..."
//       />

//       <TextArea
//         name="batch_overview"
//         label="Batch Overview"
//         rows={5}
//         placeholder="Explain this particular batch..."
//       />
//     </Section>
//   );
// }

// function CourseSelect({ courses, loading, errorMessage }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div>
//       <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//         Course
//         <span className="ml-1 text-red-500">*</span>
//       </label>

//       <select
//         {...register("course_id", {
//           setValueAs: (value) => {
//             if (value === "") {
//               return undefined;
//             }

//             return Number(value);
//           },
//         })}
//         disabled={loading}
//         className={`${inputClass} ${errors.course_id ? "border-red-500" : ""}`}
//       >
//         <option value="">
//           {loading ? "Loading courses..." : "Select Course"}
//         </option>

//         {courses.map((course) => (
//           <option key={course.id} value={course.id}>
//             {course.course_name}
//           </option>
//         ))}
//       </select>

//       {errors.course_id && (
//         <p className={errorClass}>{errors.course_id.message}</p>
//       )}

//       {errorMessage && <p className={errorClass}>{errorMessage}</p>}

//       {!loading && !errorMessage && courses.length === 0 && (
//         <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//           No courses available. Create a course first.
//         </p>
//       )}
//     </div>
//   );
// }

// function Schedule() {
//   const { watch, setValue } = useFormContext();

//   const mode = watch("mode");

//   useEffect(() => {
//     if (mode === "Online") {
//       setValue("location", "", {
//         shouldValidate: true,
//       });
//     }
//   }, [mode, setValue]);

//   return (
//     <Section
//       title="Schedule"
//       description="Configure when and where the batch will be conducted."
//     >
//       <div className="grid gap-5 md:grid-cols-2">
//         <TextInput name="start_date" label="Start Date" required type="date" />

//         <TextInput name="end_date" label="End Date" required type="date" />

//         <TextInput
//           name="duration_text"
//           label="Duration"
//           required
//           placeholder="e.g. 4 Weeks"
//         />

//         <TextInput
//           name="class_days"
//           label="Class Days"
//           required
//           placeholder="e.g. Monday, Wednesday, Friday"
//         />

//         <TextInput
//           name="class_start_time"
//           label="Class Start Time"
//           required
//           type="time"
//         />

//         <TextInput
//           name="class_end_time"
//           label="Class End Time"
//           required
//           type="time"
//         />
//       </div>

//       <TextInput
//         name="total_classes"
//         label="Total Classes"
//         required
//         type="number"
//         min="1"
//       />

//       <div className="grid gap-5 md:grid-cols-2">
//         <SelectInput
//           name="mode"
//           label="Learning Mode"
//           required
//           options={[
//             {
//               label: "Online",
//               value: "Online",
//             },
//             {
//               label: "Offline",
//               value: "Offline",
//             },
//             {
//               label: "Hybrid",
//               value: "Hybrid",
//             },
//           ]}
//         />

//         <LocationField disabled={mode === "Online"} />
//       </div>
//     </Section>
//   );
// }

// function SeatsAndPricing() {
//   return (
//     <Section
//       title="Seats & Pricing"
//       description="Configure seats, batch status and pricing."
//     >
//       <div className="grid gap-5 md:grid-cols-2">
//         <TextInput
//           name="total_seats"
//           label="Total Seats"
//           required
//           type="number"
//           min="1"
//         />

//         <TextInput
//           name="available_seats"
//           label="Available Seats"
//           required
//           type="number"
//           min="0"
//         />

//         <SelectInput
//           name="status"
//           label="Batch Status"
//           required
//           options={[
//             {
//               label: "Enrolling Open",
//               value: "Enrolling Open",
//             },
//             {
//               label: "Filling Fast",
//               value: "Filling Fast",
//             },
//             {
//               label: "Few Seats Left",
//               value: "Few Seats Left",
//             },
//             {
//               label: "Coming Soon",
//               value: "Coming Soon",
//             },
//             {
//               label: "Sold Out",
//               value: "Sold Out",
//             },
//           ]}
//         />

//         <TextInput
//           name="fee"
//           label="Fee"
//           required
//           type="number"
//           min="0"
//           step="0.01"
//           placeholder="e.g. 15000"
//         />

//         <TextInput
//           name="discounted_fee"
//           label="Discounted Fee"
//           type="number"
//           min="0"
//           step="0.01"
//           placeholder="e.g. 12000"
//         />
//       </div>

//       <TextArea
//         name="offer_text"
//         label="Offer Text"
//         rows={3}
//         placeholder="e.g. Early bird discount available..."
//       />
//     </Section>
//   );
// }

// function Instructor() {
//   return (
//     <Section title="Instructor" description="Add instructor information.">
//       <div className="grid gap-5 md:grid-cols-2">
//         <TextInput name="instructor_name" label="Instructor Name" required />

//         <TextInput name="instructor_designation" label="Designation" />

//         <TextInput
//           name="instructor_experience"
//           label="Experience"
//           placeholder="e.g. 8+ Years"
//         />
//       </div>

//       <TextArea name="instructor_bio" label="Instructor Bio" rows={5} />
//     </Section>
//   );
// }

// function CurriculumSection() {
//   return (
//     <Section
//       title="Curriculum"
//       description="Create curriculum modules and topics."
//     >
//       <CurriculumEditor />
//     </Section>
//   );
// }
// function FaqSection() {
//   return (
//     <Section title="FAQs" description="Add frequently asked questions.">
//       <FaqEditor />
//     </Section>
//   );
// }

// function AdditionalInformation() {
//   return (
//     <Section
//       title="Additional Information"
//       description="Add supporting information for students."
//     >
//       <TextAreaArray
//         name="learning_outcomes"
//         label="Learning Outcomes"
//         placeholder="e.g. Build production-ready React applications"
//       />

//       <TextAreaArray
//         name="prerequisites"
//         label="Prerequisites"
//         placeholder="e.g. Basic JavaScript knowledge"
//       />

//       <TextAreaArray
//         name="who_should_join"
//         label="Who Should Join?"
//         placeholder="e.g. Frontend developers"
//       />

//       <TextAreaArray
//         name="payment_info"
//         label="Payment Information"
//         placeholder="e.g. EMI available"
//       />

//       <TextArea
//         name="live_class_info"
//         label="Live Class Information"
//         rows={4}
//       />

//       <TextArea
//         name="recorded_class_info"
//         label="Recorded Class Information"
//         rows={4}
//       />

//       <TextArea name="doubt_support" label="Doubt Support" rows={4} />
//     </Section>
//   );
// }

// function LocationField({ disabled }) {
//   const {
//     control,
//     formState: { errors },
//   } = useFormContext();

//   return (
//     <div>
//       <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//         Location
//         {!disabled && <span className="ml-1 text-red-500">*</span>}
//       </label>

//       <Controller
//         name="location"
//         control={control}
//         render={({ field }) => (
//           <GooglePlaceAutocomplete
//             value={field.value || ""}
//             onChange={field.onChange}
//             disabled={disabled}
//           />
//         )}
//       />

//       {errors.location && (
//         <p className={errorClass}>{errors.location.message}</p>
//       )}

//       {disabled && (
//         <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
//           Location is not required for online batches.
//         </p>
//       )}
//     </div>
//   );
// }

// function TextInput({ name, label, required = false, type = "text", ...props }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   const error = getNestedError(errors, name);

//   const registerOptions =
//     type === "number"
//       ? {
//           setValueAs: (value) => {
//             if (value === "") {
//               return undefined;
//             }

//             return Number(value);
//           },
//         }
//       : {};

//   return (
//     <div>
//       <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//         {label}

//         {required && <span className="ml-1 text-red-500">*</span>}
//       </label>

//       <input
//         {...register(name, registerOptions)}
//         type={type}
//         className={`${inputClass} ${error ? "border-red-500" : ""}`}
//         {...props}
//       />

//       {error && <p className={errorClass}>{error.message}</p>}
//     </div>
//   );
// }

// function TextArea({ name, label, required = false, ...props }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   const error = getNestedError(errors, name);

//   return (
//     <div>
//       <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//         {label}

//         {required && <span className="ml-1 text-red-500">*</span>}
//       </label>

//       <textarea
//         {...register(name)}
//         className={`${inputClass} ${error ? "border-red-500" : ""}`}
//         {...props}
//       />

//       {error && <p className={errorClass}>{error.message}</p>}
//     </div>
//   );
// }

// function SelectInput({ name, label, required = false, options }) {
//   const {
//     register,
//     formState: { errors },
//   } = useFormContext();

//   const error = getNestedError(errors, name);

//   return (
//     <div>
//       <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
//         {label}

//         {required && <span className="ml-1 text-red-500">*</span>}
//       </label>

//       <select
//         {...register(name)}
//         className={`${inputClass} ${error ? "border-red-500" : ""}`}
//       >
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </select>

//       {error && <p className={errorClass}>{error.message}</p>}
//     </div>
//   );
// }

// function TextAreaArray({ name, label, placeholder }) {
//   const {
//     control,
//     register,
//     formState: { errors },
//   } = useFormContext();

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name,
//   });

//   const error = errors[name];

//   return (
//     <div>
//       <div className="mb-2 flex items-center justify-between">
//         <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//           {label}
//         </label>

//         <button
//           type="button"
//           onClick={() => append("")}
//           className="text-sm font-medium text-blue-600 hover:text-blue-700"
//         >
//           + Add
//         </button>
//       </div>

//       <div className="space-y-3">
//         {fields.map((field, index) => {
//           const itemError = error?.[index];

//           return (
//             <div key={field.id} className="flex gap-2">
//               <div className="flex-1">
//                 <input
//                   {...register(`${name}.${index}`)}
//                   placeholder={placeholder}
//                   className={`${inputClass} ${
//                     itemError ? "border-red-500" : ""
//                   }`}
//                 />

//                 {itemError?.message && (
//                   <p className={errorClass}>{itemError.message}</p>
//                 )}
//               </div>

//               <button
//                 type="button"
//                 onClick={() => remove(index)}
//                 className="rounded-lg px-3 text-sm text-red-600 hover:bg-red-50"
//               >
//                 Remove
//               </button>
//             </div>
//           );
//         })}
//       </div>

//       {error?.message && <p className={errorClass}>{error.message}</p>}
//     </div>
//   );
// }
// function Section({ title, description, children }) {
//   return (
//     <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-6">
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//           {title}
//         </h2>

//         {description && (
//           <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//             {description}
//           </p>
//         )}
//       </div>

//       <div className="space-y-5">{children}</div>
//     </section>
//   );
// }

// const inputClass =
//   "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:disabled:bg-gray-800";

// const errorClass = "mt-1 text-sm text-red-600";

// function getNestedError(errors, path) {
//   return path.split(".").reduce((current, key) => current?.[key], errors);
// }

import { useEffect, useState } from "react";

import {
  FormProvider,
  Controller,
  useForm,
  useFormContext,
  useFieldArray,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { getCourses } from "../../api/courseApi";
import { batchSchema } from "../../utils/batchSchema";

import Button from "../common/Button";
import CurriculumEditor from "./CurriculumEditor";
import FaqEditor from "./FaqEditor";
import GooglePlaceAutocomplete from "../common/GooglePlaceAutocomplete";

const defaultValues = {
  course_id: "",

  batch_name: "",
  short_description: "",
  course_description: "",
  batch_overview: "",

  start_date: "",
  end_date: "",

  duration_text: "",
  class_days: "",
  class_start_time: "",
  class_end_time: "",

  total_classes: 1,

  mode: "Online",
  location: "",

  total_seats: 1,
  available_seats: 1,

  status: "Coming Soon",

  fee: "",
  discounted_fee: "",

  offer_text: "",

  instructor_name: "",
  instructor_designation: "",
  instructor_experience: "",
  instructor_bio: "",

  learning_outcomes: [],
  curriculum: [],
  prerequisites: [],
  who_should_join: [],
  faqs: [],
  payment_info: [],

  live_class_info: "",
  recorded_class_info: "",
  doubt_support: "",
};

export default function BatchForm({
  initialValues,
  onSubmit,
  loading = false,
  submitText = "Save Batch",
}) {
  const [courses, setCourses] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [coursesError, setCoursesError] = useState("");

  const methods = useForm({
    resolver: zodResolver(batchSchema),

    defaultValues: {
      ...defaultValues,
      ...initialValues,
      course_id: initialValues?.course_id ?? initialValues?.course?.id ?? "",
    },

    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const { reset } = methods;

  // Load the course list for the dropdown
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setCoursesLoading(true);
        setCoursesError("");

        const response = await getCourses();

        setCourses(Array.isArray(response?.data) ? response.data : []);
      } catch (error) {
        console.error("Failed to fetch courses:", error);

        setCoursesError("Unable to load courses. Please try again.");
      } finally {
        setCoursesLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Fill the form when editing (initialValues must be memoized by the parent)
  useEffect(() => {
    if (!initialValues) return;

    reset({
      ...defaultValues,
      ...initialValues,

      course_id: initialValues?.course_id ?? initialValues?.course?.id ?? "",

      learning_outcomes: initialValues.learning_outcomes || [],
      curriculum: initialValues.curriculum || [],
      prerequisites: initialValues.prerequisites || [],
      who_should_join: initialValues.who_should_join || [],
      faqs: initialValues.faqs || [],
      payment_info: initialValues.payment_info || [],
    });
  }, [initialValues, reset]);

  // data is already cleaned by the zod schema (numbers, trimmed text, location)
  // setError lets the page show server validation errors under each field
  const handleFormSubmit = (data) => {
    onSubmit(data, methods.setError);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleFormSubmit)}
        className="space-y-8"
      >
        <BasicInformation
          courses={courses}
          coursesLoading={coursesLoading}
          coursesError={coursesError}
        />

        <Schedule />

        <SeatsAndPricing />

        <Instructor />

        <CurriculumSection />

        <FaqSection />

        <AdditionalInformation />

        <div className="flex justify-end border-t border-gray-200 pt-6 dark:border-gray-800">
          <Button type="submit" loading={loading}>
            {submitText}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

/* =====================================================
   SECTIONS
===================================================== */

function BasicInformation({ courses, coursesLoading, coursesError }) {
  return (
    <Section
      title="Basic Information"
      description="Enter the main information about this batch."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput
          name="batch_name"
          label="Batch Name"
          required
          placeholder="e.g. React JS Batch 01"
        />

        <CourseSelect
          courses={courses}
          loading={coursesLoading}
          errorMessage={coursesError}
        />
      </div>

      <TextArea
        name="short_description"
        label="Short Description"
        required
        rows={3}
        placeholder="Short description of this batch..."
      />

      <TextArea
        name="course_description"
        label="Course Description"
        rows={5}
        placeholder="Detailed course description..."
      />

      <TextArea
        name="batch_overview"
        label="Batch Overview"
        rows={5}
        placeholder="Explain this particular batch..."
      />
    </Section>
  );
}

/*
 * Controlled select: it shows the right course on the Edit page even when
 * the course list finishes loading after the form is filled.
 */
function CourseSelect({ courses, loading, errorMessage }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        Course
        <span className="ml-1 text-red-500">*</span>
      </label>

      <Controller
        name="course_id"
        control={control}
        render={({ field }) => (
          <select
            ref={field.ref}
            name={field.name}
            value={field.value ?? ""}
            onChange={(event) =>
              field.onChange(
                event.target.value === ""
                  ? undefined
                  : Number(event.target.value),
              )
            }
            onBlur={field.onBlur}
            disabled={loading}
            className={`${inputClass} ${
              errors.course_id ? "border-red-500" : ""
            }`}
          >
            <option value="">
              {loading ? "Loading courses..." : "Select Course"}
            </option>

            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.course_name}
              </option>
            ))}
          </select>
        )}
      />

      {errors.course_id && (
        <p className={errorClass}>{errors.course_id.message}</p>
      )}

      {errorMessage && <p className={errorClass}>{errorMessage}</p>}

      {!loading && !errorMessage && courses.length === 0 && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          No courses available. Create a course first.
        </p>
      )}
    </div>
  );
}

function Schedule() {
  const { watch, setValue } = useFormContext();

  const mode = watch("mode");

  // Online batches have no location
  useEffect(() => {
    if (mode === "Online") {
      setValue("location", "", { shouldValidate: true });
    }
  }, [mode, setValue]);

  return (
    <Section
      title="Schedule"
      description="Configure when and where the batch will be conducted."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput name="start_date" label="Start Date" required type="date" />

        <TextInput name="end_date" label="End Date" required type="date" />

        <TextInput
          name="duration_text"
          label="Duration"
          required
          placeholder="e.g. 4 Weeks"
        />

        <TextInput
          name="class_days"
          label="Class Days"
          required
          placeholder="e.g. Monday, Wednesday, Friday"
        />

        <TextInput
          name="class_start_time"
          label="Class Start Time"
          required
          type="time"
        />

        <TextInput
          name="class_end_time"
          label="Class End Time"
          required
          type="time"
        />
      </div>

      <TextInput
        name="total_classes"
        label="Total Classes"
        required
        type="number"
        min="1"
      />

      <div className="grid gap-5 md:grid-cols-2">
        <SelectInput
          name="mode"
          label="Learning Mode"
          required
          options={[
            { label: "Online", value: "Online" },
            { label: "Offline", value: "Offline" },
            { label: "Hybrid", value: "Hybrid" },
          ]}
        />

        <LocationField disabled={mode === "Online"} />
      </div>
    </Section>
  );
}

function SeatsAndPricing() {
  return (
    <Section
      title="Seats & Pricing"
      description="Configure seats, batch status and pricing."
    >
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput
          name="total_seats"
          label="Total Seats"
          required
          type="number"
          min="1"
        />

        <TextInput
          name="available_seats"
          label="Available Seats"
          required
          type="number"
          min="0"
        />

        <SelectInput
          name="status"
          label="Batch Status"
          required
          options={[
            { label: "Enrolling Open", value: "Enrolling Open" },
            { label: "Filling Fast", value: "Filling Fast" },
            { label: "Few Seats Left", value: "Few Seats Left" },
            { label: "Coming Soon", value: "Coming Soon" },
            { label: "Sold Out", value: "Sold Out" },
          ]}
        />

        <TextInput
          name="fee"
          label="Fee"
          required
          type="number"
          min="0"
          step="0.01"
          placeholder="e.g. 15000"
        />

        <TextInput
          name="discounted_fee"
          label="Discounted Fee"
          type="number"
          min="0"
          step="0.01"
          placeholder="e.g. 12000"
        />
      </div>

      <TextArea
        name="offer_text"
        label="Offer Text"
        rows={3}
        placeholder="e.g. Early bird discount available..."
      />
    </Section>
  );
}

function Instructor() {
  return (
    <Section title="Instructor" description="Add instructor information.">
      <div className="grid gap-5 md:grid-cols-2">
        <TextInput name="instructor_name" label="Instructor Name" />

        <TextInput name="instructor_designation" label="Designation" />

        <TextInput
          name="instructor_experience"
          label="Experience"
          placeholder="e.g. 8+ Years"
        />
      </div>

      <TextArea name="instructor_bio" label="Instructor Bio" rows={5} />
    </Section>
  );
}

function CurriculumSection() {
  return (
    <Section
      title="Curriculum"
      description="Create curriculum modules and topics."
    >
      <CurriculumEditor />
    </Section>
  );
}

function FaqSection() {
  return (
    <Section title="FAQs" description="Add frequently asked questions.">
      <FaqEditor />
    </Section>
  );
}

function AdditionalInformation() {
  return (
    <Section
      title="Additional Information"
      description="Add supporting information for students."
    >
      <TextAreaArray
        name="learning_outcomes"
        label="Learning Outcomes"
        placeholder="e.g. Build production-ready React applications"
      />

      <TextAreaArray
        name="prerequisites"
        label="Prerequisites"
        placeholder="e.g. Basic JavaScript knowledge"
      />

      <TextAreaArray
        name="who_should_join"
        label="Who Should Join?"
        placeholder="e.g. Frontend developers"
      />

      <TextAreaArray
        name="payment_info"
        label="Payment Information"
        placeholder="e.g. EMI available"
      />

      <TextArea
        name="live_class_info"
        label="Live Class Information"
        rows={4}
      />

      <TextArea
        name="recorded_class_info"
        label="Recorded Class Information"
        rows={4}
      />

      <TextArea name="doubt_support" label="Doubt Support" rows={4} />
    </Section>
  );
}

/* =====================================================
   FIELDS
===================================================== */

function LocationField({ disabled }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        Location
        {!disabled && <span className="ml-1 text-red-500">*</span>}
      </label>

      <Controller
        name="location"
        control={control}
        render={({ field }) => (
          <GooglePlaceAutocomplete
            value={field.value || ""}
            onChange={field.onChange}
            disabled={disabled}
          />
        )}
      />

      {errors.location && (
        <p className={errorClass}>{errors.location.message}</p>
      )}

      {disabled && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Location is not required for online batches.
        </p>
      )}
    </div>
  );
}

function TextInput({ name, label, required = false, type = "text", ...props }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = getNestedError(errors, name);

  // An empty number field becomes undefined, the schema shows the right message
  const registerOptions =
    type === "number"
      ? {
          setValueAs: (value) => (value === "" ? undefined : Number(value)),
        }
      : {};

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <input
        {...register(name, registerOptions)}
        type={type}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        {...props}
      />

      {error && <p className={errorClass}>{error.message}</p>}
    </div>
  );
}

function TextArea({ name, label, required = false, ...props }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = getNestedError(errors, name);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <textarea
        {...register(name)}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
        {...props}
      />

      {error && <p className={errorClass}>{error.message}</p>}
    </div>
  );
}

function SelectInput({ name, label, required = false, options }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = getNestedError(errors, name);

  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}

        {required && <span className="ml-1 text-red-500">*</span>}
      </label>

      <select
        {...register(name)}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className={errorClass}>{error.message}</p>}
    </div>
  );
}

function TextAreaArray({ name, label, placeholder }) {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const error = errors[name];

  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>

        <button
          type="button"
          onClick={() => append("")}
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          + Add
        </button>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => {
          const itemError = error?.[index];

          return (
            <div key={field.id} className="flex gap-2">
              <div className="flex-1">
                <input
                  {...register(`${name}.${index}`)}
                  placeholder={placeholder}
                  className={`${inputClass} ${
                    itemError ? "border-red-500" : ""
                  }`}
                />

                {itemError?.message && (
                  <p className={errorClass}>{itemError.message}</p>
                )}
              </div>

              <button
                type="button"
                onClick={() => remove(index)}
                className="rounded-lg px-3 text-sm text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          );
        })}
      </div>

      {error?.message && <p className={errorClass}>{error.message}</p>}
    </div>
  );
}

function Section({ title, description, children }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-950 sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h2>

        {description && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>

      <div className="space-y-5">{children}</div>
    </section>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 disabled:cursor-not-allowed disabled:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:disabled:bg-gray-800";

const errorClass = "mt-1 text-sm text-red-600";

function getNestedError(errors, path) {
  return path.split(".").reduce((current, key) => current?.[key], errors);
}
