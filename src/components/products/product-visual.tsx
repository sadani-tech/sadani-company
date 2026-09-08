import { ArrowDown, Check, CircleDollarSign, MessageCircle, PackageCheck, ShieldCheck, TrendingDown, TrendingUp, Umbrella } from "lucide-react";
import type { ProductTone } from "@/config/products";
import type { Locale } from "@/i18n/config";

export function ProductVisual({ product, compact = false, locale = "id" }: { product: ProductTone; compact?: boolean; locale?: Locale }) {
  return <div className={`product-visual product-visual-${product} ${compact ? "product-visual-compact" : ""}`} aria-label={`Conceptual ${product} interface preview`} role="img">
    <span className="concept-label">{locale === "id" ? "Pratinjau konsep" : "Concept preview"}</span>
    {product === "serahin" && <SerahinVisual locale={locale} />}
    {product === "manifly" && <ManiflyVisual locale={locale} />}
    {product === "tuju" && <TujuVisual locale={locale} />}
    {product === "insuralab" && <InsuraLabVisual locale={locale} />}
  </div>;
}

function SerahinVisual({ locale }: { locale: Locale }) {
  const id = locale === "id";
  return <div className="visual-window"><div className="visual-toolbar"><i /><i /><i /><span>{id ? "Ringkasan pre-order" : "Pre-order overview"}</span></div><div className="p-4 sm:p-6"><div className="mb-4 flex items-center justify-between"><div><p className="visual-kicker">{id ? "PRE-ORDER AKTIF" : "ACTIVE PRE-ORDER"}</p><p className="mt-1 font-semibold text-ink">Weekend Batch</p></div><span className="visual-pill">{id ? "4 hari lagi" : "4 days left"}</span></div><div className="visual-product-row"><div className="visual-product-image"><PackageCheck size={22} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">Everyday Tote</p><p className="mt-1 text-xs text-muted">12 {id ? "pesanan" : "orders"} · 18 item</p></div><span className="text-sm font-semibold">72%</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/8"><div className="h-full w-[72%] rounded-full bg-serahin" /></div><div className="mt-4 flex items-center justify-between rounded-lg border border-ink/10 px-3 py-2 text-xs"><span className="font-semibold text-ink">{id ? "Dibayar online" : "Paid online"}</span><span className="font-semibold text-serahin">Rp 2.160.000</span></div><div className="mt-4 grid grid-cols-3 gap-2"><MiniStat value="18" label="Item" /><MiniStat value="9" label={id ? "Lunas" : "Paid"} /><MiniStat value="4h" label={id ? "Tersisa" : "Left"} /></div></div></div>;
}

function ManiflyVisual({ locale }: { locale: Locale }) {
  const id = locale === "id";
  return <div className="visual-window"><div className="visual-toolbar"><i /><i /><i /><span>{id ? "Arus bulanan" : "Monthly flow"}</span></div><div className="p-4 sm:p-6"><div className="mb-3 flex items-center gap-2 rounded-lg bg-manifly/10 px-3 py-2"><MessageCircle size={15} className="text-manifly" /><span className="text-xs font-medium text-ink">“kopi 15rb” → -Rp15.000 · {id ? "Makanan" : "Food"}</span></div><p className="visual-kicker">{id ? "SALDO SAAT INI" : "CURRENT BALANCE"}</p><p className="mt-2 text-2xl font-semibold tracking-tight text-ink">Rp 8.450.000</p><div className="mt-4 flex h-24 items-end gap-2" aria-hidden="true">{[35,55,45,74,57,88,66,94,76,100,82,92].map((height, i) => <span key={i} style={{height: `${height}%`}} className="flex-1 rounded-t-sm bg-manifly/20 last:bg-manifly" />)}</div><div className="mt-5 grid grid-cols-2 gap-3"><div className="visual-stat"><TrendingUp size={16} className="text-manifly" /><span><small>{id ? "Pemasukan" : "Income"}</small><b>Rp 6,2 jt</b></span></div><div className="visual-stat"><TrendingDown size={16} className="text-coral" /><span><small>{id ? "Pengeluaran" : "Expense"}</small><b>Rp 3,1 jt</b></span></div></div></div></div>;
}

function TujuVisual({ locale }: { locale: Locale }) {
  const id = locale === "id";
  const path = id ? ["Peran saat ini", "Skill untuk dibangun", "Peran tujuan"] : ["Current role", "Skills to build", "Target role"];
  return <div className="visual-window"><div className="visual-toolbar"><i /><i /><i /><span>{id ? "Arah Anda" : "Your direction"}</span></div><div className="p-4 sm:p-6"><p className="visual-kicker">{id ? "JALUR KARIER" : "CAREER PATH"}</p><div className="mt-4 space-y-2">{path.map((label, i) => <div key={label}>{i > 0 && <ArrowDown size={15} className="mx-auto mb-2 text-tuju/50" />}<div className={`career-node ${i === 2 ? "career-node-active" : ""}`}><span className="career-index">{i === 0 ? <Check size={13} /> : i + 1}</span><span><small>{label}</small><b>{i === 0 ? "Product designer" : i === 1 ? "Research · Systems" : "Design lead"}</b></span>{i === 2 && <CircleDollarSign size={16} className="opacity-0" />}</div></div>)}</div></div></div>;
}

function InsuraLabVisual({ locale }: { locale: Locale }) {
  const id = locale === "id";
  const rows = id
    ? [["Risiko rumah sakit", "Ditanggung", true], ["Kehilangan pendapatan", "Sebagian", false], ["Biaya rutin", "Tidak ditanggung", false]] as const
    : [["Hospital risk", "Covered", true], ["Income loss", "Partial", false], ["Everyday costs", "Not covered", false]] as const;
  return <div className="visual-window"><div className="visual-toolbar"><i /><i /><i /><span>{id ? "Peta proteksi" : "Protection map"}</span></div><div className="p-4 sm:p-6"><div className="mb-4 flex items-center gap-2"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-insuralab/12 text-insuralab"><Umbrella size={18} /></span><div><p className="visual-kicker">{id ? "CONTOH KASUS" : "CASE STUDY"}</p><p className="text-sm font-semibold text-ink">{id ? "Proteksi kesehatan" : "Health protection"}</p></div></div><div className="space-y-2">{rows.map(([label, tag, ok]) => <div key={label} className="flex items-center justify-between rounded-lg border border-ink/10 px-3 py-2"><span className="text-xs font-medium text-ink">{label}</span><span className={`inline-flex items-center gap-1 text-[10px] font-semibold ${ok ? "text-insuralab" : "text-muted"}`}>{ok ? <ShieldCheck size={12} /> : null}{tag}</span></div>)}</div><p className="mt-3 text-[10px] leading-4 text-muted">{id ? "Ilustrasi edukasi. Bukan penawaran atau nasihat asuransi." : "Educational illustration. Not an insurance offer or advice."}</p></div></div>;
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-lg bg-ink/[0.04] px-2 py-3 text-center"><b className="block text-sm text-ink">{value}</b><span className="text-[10px] text-muted">{label}</span></div>;
}
