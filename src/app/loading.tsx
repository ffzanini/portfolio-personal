export default function Loading() {
  return (
    <div
      aria-live="polite"
      aria-label="Carregando"
      className="pointer-events-none fixed inset-x-0 top-0 z-9999 h-1 overflow-hidden"
    >
      <div className="h-full w-1/3 animate-[loading-slide_850ms_ease-in-out_infinite] rounded-r-full bg-linear-to-r from-primary-400 via-primary-600 to-primary-800 opacity-75" />
    </div>
  );
}
