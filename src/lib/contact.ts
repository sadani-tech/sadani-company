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
  locale: z.enum(["id", "en"]).optional().default("id"),
});
export type ContactMessage = z.infer<typeof contactSchema>;

export interface ContactService { send(message: ContactMessage): Promise<{ delivered: boolean; reason?: string }>; }

/**
 * Fallback used until an email provider (Resend / SendGrid / SMTP) is wired in.
 * It records the submission in the server logs and reports it as undelivered so
 * the API can direct the sender to the published business email instead.
 */
class LoggingContactService implements ContactService {
  async send(message: ContactMessage): Promise<{ delivered: boolean; reason: string }> {
    console.info("[contact] inbound message", {
      name: message.name,
      email: message.email,
      company: message.company,
      inquiryType: message.inquiryType,
      length: message.message.length,
    });
    return { delivered: false, reason: "Email delivery is not configured; message logged only." };
  }
}

export function getContactService(): ContactService {
  // Add a Resend, SendGrid, or SMTP implementation here when credentials are configured.
  return new LoggingContactService();
}
