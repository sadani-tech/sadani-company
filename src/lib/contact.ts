import "server-only";
import { z } from "zod";

export const inquiryTypes = ["general", "partnership", "product", "career", "other"] as const;
export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.email("Please enter a valid email address.").max(254),
  company: z.string().trim().max(120).optional().default(""),
  inquiryType: z.enum(inquiryTypes),
  message: z.string().trim().min(20, "Please share at least 20 characters.").max(3000),
  website: z.string().max(0, "Spam detected.").optional().default(""),
});
export type ContactMessage = z.infer<typeof contactSchema>;

export interface ContactService { send(message: ContactMessage): Promise<{ delivered: boolean; reason?: string }>; }

class UnconfiguredContactService implements ContactService {
  async send(): Promise<{ delivered: boolean; reason: string }> { return { delivered: false, reason: "Contact delivery is not configured yet." }; }
}

export function getContactService(): ContactService {
  // Add a Resend, SendGrid, or SMTP implementation here when credentials are configured.
  return new UnconfiguredContactService();
}
