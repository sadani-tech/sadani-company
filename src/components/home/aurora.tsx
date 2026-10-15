/** Soft gold glow that rises from the bottom edge (hero stage and closing CTA). */
export function Aurora({ wide = false }: { wide?: boolean }) {
  return (
    <div className={`aurora ${wide ? "aurora--wide" : ""}`} aria-hidden="true">
      <span className="aurora__blob a1" /><span className="aurora__blob a2" /><span className="aurora__blob a3" /><span className="aurora__blob a4" /><span className="aurora__blob a5" />
    </div>
  );
}
