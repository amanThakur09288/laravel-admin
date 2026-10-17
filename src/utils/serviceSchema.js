import { z } from "zod";

const offeringSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Offering title is required.")
    .max(255, "Offering title is too long."),

  description: z
    .string()
    .trim()
    .min(1, "Offering description is required.")
    .max(2000, "Offering description is too long."),
});

const processSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Process title is required.")
    .max(255, "Process title is too long."),

  description: z
    .string()
    .trim()
    .min(1, "Process description is required.")
    .max(2000, "Process description is too long."),
});

const faqSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, "Question is required.")
    .max(1000, "Question is too long."),

  answer: z
    .string()
    .trim()
    .min(1, "Answer is required.")
    .max(5000, "Answer is too long."),
});

export const serviceSchema = z.object({
  service_name: z
    .string()
    .trim()
    .min(1, "Service name is required.")
    .max(255, "Service name is too long."),

  short_description: z
    .string()
    .trim()
    .min(1, "Short description is required.")
    .max(1000, "Short description is too long."),

  description: z.string().trim().min(1, "Service description is required."),

  offerings: z.array(offeringSchema).optional(),

  process: z.array(processSchema).optional(),

  faqs: z.array(faqSchema).optional(),

  status: z.enum(["Active", "Inactive"]),
});
