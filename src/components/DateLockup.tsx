function SideStack({ label }: { label: string }) {
  return (
    <div className="flex h-16 flex-col items-center justify-between py-0.5">
      <div className="flex w-full min-w-[5.25rem] items-center gap-1.5" aria-hidden>
        <span className="h-px flex-1 bg-bisque" />
        <span className="text-[6px] leading-none text-bisque">◆</span>
        <span className="h-px flex-1 bg-bisque" />
      </div>
      <p className="font-display text-lg font-medium uppercase tracking-[0.16em] text-ink">
        {label}
      </p>
      <div className="flex w-full min-w-[5.25rem] items-center gap-1.5" aria-hidden>
        <span className="h-px flex-1 bg-bisque" />
        <span className="text-[6px] leading-none text-bisque">◆</span>
        <span className="h-px flex-1 bg-bisque" />
      </div>
    </div>
  );
}

/** Date lockup on the seam between hero and parents — mobile only */
export function DateLockup() {
  return (
    <div aria-label="Fecha del evento" className="px-3 py-2">
      <div className="mx-auto flex w-[min(100%,19rem)] flex-col items-center text-center">
        <p className="font-script text-[2.85rem] leading-none text-ink">
          Noviembre
        </p>

        <div className="mt-3 grid h-16 w-full grid-cols-[1fr_auto_1fr] items-center gap-1.5">
          <div className="flex h-full items-center justify-center">
            <SideStack label="Viernes" />
          </div>

          <div className="flex h-full items-center justify-center px-1">
            <p className="flex h-full items-center font-script text-[3.6rem] leading-none text-bisque">
              20
            </p>
          </div>

          <div className="flex h-full items-center justify-center">
            <SideStack label="2026" />
          </div>
        </div>
      </div>
    </div>
  );
}
