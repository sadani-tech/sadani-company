import { NextResponse } from "next/server";
import { contactSchema, getContactService } from "@/lib/contact";

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
  if (!parsed.success) return NextResponse.json({ message: "Please check the highlighted fields.", errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ message: "Thanks. Your message has been received." });
  const result = await getContactService().send(parsed.data);
  if (!result.delivered) return NextResponse.json({ message: `${result.reason} Please contact Sadani once an official email channel is published.` }, { status: 503 });
  return NextResponse.json({ message: "Thanks. Your message has been sent to Sadani." });
}
