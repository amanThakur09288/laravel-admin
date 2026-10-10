// import { FormProvider, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import CurriculumEditor from "./CurriculumEditor";
// import FaqEditor from "./FaqEditor";
// import { batchSchema } from "../../utils/batchSchema";
// import Button from "../common/Button";
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
//   total_classes: 1,

//   mode: "Online",
//   location: "",

//   total_seats: 1,
//   available_seats: 0,

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
//   initialValues = null,
//   onSubmit,
//   submitting = false,
//   submitLabel = "Save Batch",
// }) {
//   const methods = useForm({
//     resolver: zodResolver(batchSchema),
//     defaultValues: initialValues || defaultValues,
//     mode: "onBlur",
//   });

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = methods;
// console.log("error",errors)
//   return (
//     <FormProvider {...methods}>
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//         {/* BASIC INFORMATION */}

//         <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//           <div className="mb-6">
//             <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//               Basic Information
//             </h2>

//             <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//               Enter the main information about this batch.
//             </p>
//           </div>

//           <div className="grid gap-5 md:grid-cols-2">
//             <FormInput
//               label="Batch Name"
//               required
//               error={errors.batch_name}
//               {...register("batch_name")}
//             />

//             <FormInput
//               label="Course Name"
//               required
//               error={errors.course_name}
//               {...register("course_name")}
//             />

//             {/* <FormInput
//               label="Slug"
//               required
//               placeholder="full-stack-web-development-batch-24"
//               error={errors.slug}
//               {...register("slug")}
//             /> */}

//             <FormInput
//               label="Duration"
//               required
//               placeholder="14 Weeks"
//               error={errors.duration_text}
//               {...register("duration_text")}
//             />

//             <div className="md:col-span-2">
//               <FormTextarea
//                 label="Short Description"
//                 required
//                 rows={3}
//                 error={errors.short_description}
//                 {...register("short_description")}
//               />
//             </div>

//             <div className="md:col-span-2">
//               <FormTextarea
//                 label="Course Description"
//                 rows={5}
//                 error={errors.course_description}
//                 {...register("course_description")}
//               />
//             </div>

//             <div className="md:col-span-2">
//               <FormTextarea
//                 label="Batch Overview"
//                 rows={5}
//                 error={errors.batch_overview}
//                 {...register("batch_overview")}
//               />
//             </div>
//           </div>
//         </section>

//         {/* SCHEDULE */}

//         <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//           <SectionTitle
//             title="Schedule"
//             description="Configure when and how the batch will run."
//           />

//           <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
//             <FormInput
//               label="Start Date"
//               required
//               type="date"
//               error={errors.start_date}
//               {...register("start_date")}
//             />

//             <FormInput
//               label="End Date"
//               required
//               type="date"
//               error={errors.end_date}
//               {...register("end_date")}
//             />

//             <FormInput
//               label="Class Days"
//               required
//               placeholder="Mon, Wed, Fri"
//               error={errors.class_days}
//               {...register("class_days")}
//             />

//             {/* <FormInput
//               label="Class Timing"
//               required
//               placeholder="7:00 PM - 9:00 PM IST"
//               error={errors.class_timing}
//               {...register("class_timing")}
//             /> */}
//             <FormInput
//               label="Class Start Time"
//               required
//               type="time"
//               error={errors.class_start_time}
//               {...register("class_start_time")}
//             />

//             <FormInput
//               label="Class End Time"
//               required
//               type="time"
//               error={errors.class_end_time}
//               {...register("class_end_time")}
//             />
//             <FormInput
//               label="Total Classes"
//               required
//               type="number"
//               min="1"
//               error={errors.total_classes}
//               {...register("total_classes", {
//                 valueAsNumber: true,
//               })}
//             />

//             <SelectInput
//               label="Mode"
//               required
//               error={errors.mode}
//               {...register("mode")}
//             >
//               <option value="Online">Online</option>
//               <option value="Offline">Offline</option>
//               <option value="Hybrid">Hybrid</option>
//             </SelectInput>
//             {/*
//             <div className="md:col-span-2 lg:col-span-3">
//               <FormInput
//                 label="Location"
//                 placeholder="Required for offline/hybrid batches"
//                 error={errors.location}
//                 {...register("location")}
//               />
//             </div> */}
//             <div>
//               <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Location
//               </label>

//               <GooglePlaceAutocomplete
//                 value={watch("location")}
//                 onChange={(value) =>
//                   setValue("location", value, {
//                     shouldValidate: true,
//                     shouldDirty: true,
//                   })
//                 }
//                 onPlaceSelect={(place) => {
//                   setValue(
//                     "location",
//                     place.formatted_address || place.name || "",
//                     {
//                       shouldValidate: true,
//                       shouldDirty: true,
//                     },
//                   );
//                 }}
//                 error={errors.location?.message}
//                 placeholder="Search training center or location..."
//               />
//             </div>
//           </div>
//         </section>

//         {/* SEATS & PRICE */}

//         <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//           <SectionTitle
//             title="Seats & Pricing"
//             description="Configure capacity and batch pricing."
//           />

//           <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
//             <FormInput
//               label="Total Seats"
//               required
//               type="number"
//               min="1"
//               error={errors.total_seats}
//               {...register("total_seats", {
//                 valueAsNumber: true,
//               })}
//             />

//             <FormInput
//               label="Available Seats"
//               required
//               type="number"
//               min="0"
//               error={errors.available_seats}
//               {...register("available_seats", {
//                 valueAsNumber: true,
//               })}
//             />

//             <FormInput
//               label="Fee"
//               required
//               type="number"
//               min="0"
//               step="0.01"
//               error={errors.fee}
//               {...register("fee", {
//                 valueAsNumber: true,
//               })}
//             />

//             <FormInput
//               label="Discounted Fee"
//               type="number"
//               min="0"
//               step="0.01"
//               error={errors.discounted_fee}
//               {...register("discounted_fee", {
//                 setValueAs: (value) => (value === "" ? null : Number(value)),
//               })}
//             />

//             <div className="md:col-span-2">
//               <SelectInput
//                 label="Status"
//                 required
//                 error={errors.status}
//                 {...register("status")}
//               >
//                 <option value="Enrolling Open">Enrolling Open</option>

//                 <option value="Filling Fast">Filling Fast</option>

//                 <option value="Few Seats Left">Few Seats Left</option>

//                 <option value="Coming Soon">Coming Soon</option>

//                 <option value="Sold Out">Sold Out</option>
//               </SelectInput>
//             </div>

//             <div className="md:col-span-2">
//               <FormTextarea
//                 label="Offer Text"
//                 rows={3}
//                 error={errors.offer_text}
//                 {...register("offer_text")}
//               />
//             </div>
//           </div>
//         </section>

//         {/* INSTRUCTOR */}

//         <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//           <SectionTitle
//             title="Instructor"
//             description="Add instructor information for this batch."
//           />

//           <div className="grid gap-5 md:grid-cols-2">
//             <FormInput
//               label="Instructor Name"
//               error={errors.instructor_name}
//               {...register("instructor_name")}
//             />

//             <FormInput
//               label="Designation"
//               error={errors.instructor_designation}
//               {...register("instructor_designation")}
//             />

//             <FormInput
//               label="Experience"
//               error={errors.instructor_experience}
//               {...register("instructor_experience")}
//             />

//             <div className="md:col-span-2">
//               <FormTextarea
//                 label="Instructor Bio"
//                 rows={4}
//                 error={errors.instructor_bio}
//                 {...register("instructor_bio")}
//               />
//             </div>
//           </div>
//         </section>

//         {/* CURRICULUM */}

//         <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//           <CurriculumEditor />
//         </section>

//         {/* FAQ */}

//         <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//           <FaqEditor />
//         </section>

//         {/* ADDITIONAL INFORMATION */}

//         <section className="rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-900">
//           <SectionTitle
//             title="Additional Information"
//             description="Add learning, payment and support information."
//           />

//           <div className="space-y-5">
//             <FormTextarea
//               label="Live Class Information"
//               rows={4}
//               error={errors.live_class_info}
//               {...register("live_class_info")}
//             />

//             <FormTextarea
//               label="Recorded Class Information"
//               rows={4}
//               error={errors.recorded_class_info}
//               {...register("recorded_class_info")}
//             />

//             <FormTextarea
//               label="Doubt Support"
//               rows={4}
//               error={errors.doubt_support}
//               {...register("doubt_support")}
//             />
//           </div>
//         </section>

//         {/* ACTIONS */}

//         <div className="flex justify-end gap-3 border-t border-gray-200 pt-5 dark:border-gray-700">
//           <Button type="submit" loading={submitting}>
//             {submitLabel}
//           </Button>
//         </div>
//       </form>
//     </FormProvider>
//   );
// }

// const SectionTitle = ({ title, description }) => (
//   <div className="mb-6">
//     <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
//       {title}
//     </h2>

//     <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
//       {description}
//     </p>
//   </div>
// );

// const FormInput = ({ label, required = false, error, ...props }) => (
//   <div>
//     <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//       {label}

//       {required && <span className="ml-1 text-red-500">*</span>}
//     </label>

//     <input
//       {...props}
//       className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//     />

//     {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
//   </div>
// );

// const FormTextarea = ({ label, required = false, error, ...props }) => (
//   <div>
//     <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//       {label}

//       {required && <span className="ml-1 text-red-500">*</span>}
//     </label>

//     <textarea
//       {...props}
//       className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//     />

//     {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
//   </div>
// );

// const SelectInput = ({
//   label,
//   required = false,
//   error,
//   children,
//   ...props
// }) => (
//   <div>
//     <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
//       {label}

//       {required && <span className="ml-1 text-red-500">*</span>}
//     </label>

//     <select
//       {...props}
//       className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
//     >
//       {children}
//     </select>

//     {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
//   </div>
// );

import { useEffect } from "react";
import {
  FormProvider,
  Controller,
  useForm,
  useFormContext,
  useFieldArray,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { batchSchema } from "../../utils/batchSchema";
import Button from "../common/Button";
import CurriculumEditor from "./CurriculumEditor";
import FaqEditor from "./FaqEditor";
import GooglePlaceAutocomplete from "../common/GooglePlaceAutocomplete";

const defaultValues = {
  batch_name: "",
  course_name: "",
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
  const methods = useForm({
    resolver: zodResolver(batchSchema),
    defaultValues: initialValues || defaultValues,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    if (initialValues) {
      methods.reset({
        ...defaultValues,
        ...initialValues,
      });
    }
  }, [initialValues]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
        <BasicInformation />
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

/*
|--------------------------------------------------------------------------
| Basic Information
|--------------------------------------------------------------------------
*/

function BasicInformation() {
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

        <TextInput
          name="course_name"
          label="Course Name"
          required
          placeholder="e.g. React JS"
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
|--------------------------------------------------------------------------
| Schedule
|--------------------------------------------------------------------------
*/

function Schedule() {
  const { watch, setValue } = useFormContext();

  const mode = watch("mode");

  useEffect(() => {
    if (mode === "Online") {
      setValue("location", "", {
        shouldValidate: true,
      });
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
            {
              label: "Online",
              value: "Online",
            },
            {
              label: "Offline",
              value: "Offline",
            },
            {
              label: "Hybrid",
              value: "Hybrid",
            },
          ]}
        />

        <LocationField disabled={mode === "Online"} />
      </div>
    </Section>
  );
}

/*
|--------------------------------------------------------------------------
| Seats and Pricing
|--------------------------------------------------------------------------
*/

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
            {
              label: "Enrolling Open",
              value: "Enrolling Open",
            },
            {
              label: "Filling Fast",
              value: "Filling Fast",
            },
            {
              label: "Few Seats Left",
              value: "Few Seats Left",
            },
            {
              label: "Coming Soon",
              value: "Coming Soon",
            },
            {
              label: "Sold Out",
              value: "Sold Out",
            },
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

/*
|--------------------------------------------------------------------------
| Instructor
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Curriculum
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| FAQ
|--------------------------------------------------------------------------
*/

function FaqSection() {
  return (
    <Section title="FAQs" description="Add frequently asked questions.">
      <FaqEditor />
    </Section>
  );
}

/*
|--------------------------------------------------------------------------
| Additional Information
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Location
|--------------------------------------------------------------------------
*/

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
        <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
      )}

      {disabled && (
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Location is not required for online batches.
        </p>
      )}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Reusable Inputs
|--------------------------------------------------------------------------
*/

function TextInput({ name, label, required = false, type = "text", ...props }) {
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

      <input
        {...register(name)}
        type={type}
        className={inputClass}
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

      <textarea {...register(name)} className={inputClass} {...props} />

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

      <select {...register(name)} className={inputClass}>
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

  //   const { fields, append, remove } = require("react-hook-form").useFieldArray({
  //     control,
  //     name,
  //   });

  const { fields, append, remove } = useFieldArray({ control, name });
  const error = errors[name];
console.log({errors})
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
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2">
            <input
              {...register(`${name}.${index}`)}
              placeholder={placeholder}
              className={inputClass}
            />

            <button
              type="button"
              onClick={() => remove(index)}
              className="rounded-lg px-3 text-sm text-red-600 hover:bg-red-50"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      {error?.message && <p className={errorClass}>{error.message}</p>}
    </div>
  );
}

/*
|--------------------------------------------------------------------------
| Section
|--------------------------------------------------------------------------
*/

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
