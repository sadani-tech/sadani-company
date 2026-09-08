import { NextResponse } from "next/server";
import { contactSchema, getContactService } from "@/lib/contact";
import { siteConfig } from "@/config/site";

const attempts = new Map<string, { count: number; resetAt: number }>();

export async function POST(request: Request) {
  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > 10_000) return NextResponse.json({ message: "This message is too large." }, { status: 413 });
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  const now = Date.now(); const entry = attempts.get(ip);
  if (entry && entry.resetAt > now && entry.count >= 5) return NextResponse.json({ message: "Too many attempts. Please wait and try again." }, { status: 429 });
  attempts.set(ip, !entry || entry.resetAt <= now ? { count: 1, resetAt: now + 60_000 } : { ...entry, count: entry.count + 1 });
  let body: unknown; try { body = await request.json(); } catch { return NextResponse.json({ message: "We couldn’t read that message." }, { status: 400 }); }
  const parsed = contactSchema.safeParse(body);
  const locale = typeof body === "object" && body !== null && "locale" in body && body.locale === "en" ? "en" : "id";
  if (!parsed.success) return NextResponse.json({ message: locale === "id" ? "Periksa kembali kolom yang ditandai." : "Please check the highlighted fields.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ message: locale === "id" ? "Terima kasih. Pesan Anda telah diterima." : "Thanks. Your message has been received." });
  const result = await getContactService().send(parsed.data);
  if (!result.delivered) {
    if (siteConfig.email) {
      return NextResponse.json({
        message: locale === "id"
          ? `Terima kasih, pesan Anda telah kami terima. Untuk balasan yang lebih cepat, email langsung ke ${siteConfig.email}.`
          : `Thanks, we've received your message. For a faster reply, email us directly at ${siteConfig.email}.`,
      });
    }
    return NextResponse.json({ message: locale === "id" ? "Pengiriman kontak belum dikonfigurasi." : "Contact delivery is not configured yet." }, { status: 503 });
  }
  return NextResponse.json({ message: locale === "id" ? "Terima kasih. Pesan Anda telah dikirim ke Sadani." : "Thanks. Your message has been sent to Sadani." });
}
