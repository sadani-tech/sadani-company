import { ArrowDown, Check, CircleDollarSign, PackageCheck, TrendingDown, TrendingUp } from "lucide-react";
import type { ProductTone } from "@/config/products";

export function ProductVisual({ product, compact = false }: { product: ProductTone; compact?: boolean }) {
  return <div className={`product-visual product-visual-${product} ${compact ? "product-visual-compact" : ""}`} aria-label={`Conceptual ${product} interface preview`} role="img">
    <span className="concept-label">Concept preview</span>
    {product === "serahin" && <SerahinVisual />}
    {product === "money-flow" && <MoneyFlowVisual />}
    {product === "tuju" && <TujuVisual />}
  </div>;
}

function SerahinVisual() {
  return <div className="visual-window"><div className="visual-toolbar"><i /><i /><i /><span>Pre-order overview</span></div><div className="p-4 sm:p-6"><div className="mb-4 flex items-center justify-between"><div><p className="visual-kicker">ACTIVE PRE-ORDER</p><p className="mt-1 font-semibold text-ink">Weekend Batch</p></div><span className="visual-pill">4 days left</span></div><div className="visual-product-row"><div className="visual-product-image"><PackageCheck size={22} /></div><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">Everyday Tote</p><p className="mt-1 text-xs text-muted">12 orders · 18 items</p></div><span className="text-sm font-semibold">72%</span></div><div className="mt-4 h-2 overflow-hidden rounded-full bg-ink/8"><div className="h-full w-[72%] rounded-full bg-serahin" /></div><div className="mt-5 grid grid-cols-3 gap-2"><MiniStat value="18" label="Items" /><MiniStat value="12" label="Orders" /><MiniStat value="4d" label="Left" /></div></div></div>;
}

function MoneyFlowVisual() {
  return <div className="visual-window"><div className="visual-toolbar"><i /><i /><i /><span>Monthly flow</span></div><div className="p-4 sm:p-6"><p className="visual-kicker">CURRENT BALANCE</p><p className="mt-2 text-2xl font-semibold tracking-tight text-ink">Rp 8.450.000</p><div className="mt-5 flex h-24 items-end gap-2" aria-hidden="true">{[35,55,45,74,57,88,66,94,76,100,82,92].map((height, i) => <span key={i} style={{height: `${height}%`}} className="flex-1 rounded-t-sm bg-money/20 last:bg-money" />)}</div><div className="mt-5 grid grid-cols-2 gap-3"><div className="visual-stat"><TrendingUp size={16} className="text-money" /><span><small>Income</small><b>Rp 6.2m</b></span></div><div className="visual-stat"><TrendingDown size={16} className="text-coral" /><span><small>Expense</small><b>Rp 3.1m</b></span></div></div></div></div>;
}

function TujuVisual() {
  const path = ["Current role", "Skills to build", "Target role"];
  return <div className="visual-window"><div className="visual-toolbar"><i /><i /><i /><span>Your direction</span></div><div className="p-4 sm:p-6"><p className="visual-kicker">CAREER PATH</p><div className="mt-4 space-y-2">{path.map((label, i) => <div key={label}>{i > 0 && <ArrowDown size={15} className="mx-auto mb-2 text-tuju/50" />}<div className={`career-node ${i === 2 ? "career-node-active" : ""}`}><span className="career-index">{i === 0 ? <Check size={13} /> : i + 1}</span><span><small>{label}</small><b>{i === 0 ? "Product designer" : i === 1 ? "Research · Systems" : "Design lead"}</b></span>{i === 2 && <CircleDollarSign size={16} className="opacity-0" />}</div></div>)}</div></div></div>;
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return <div className="rounded-lg bg-ink/[0.04] px-2 py-3 text-center"><b className="block text-sm text-ink">{value}</b><span className="text-[10px] text-muted">{label}</span></div>;
}
