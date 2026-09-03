export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F7F4] flex items-center justify-center px-6">
      <div className="flex flex-col items-center">
        {/* Spark loader */}
        <svg
          viewBox="0 0 80 80"
          className="w-16 h-16 animate-spin motion-reduce:animate-none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="40"
            cy="40"
            r="32"
            stroke="#131B3A"
            strokeOpacity="0.1"
            strokeWidth="6"
          />
          <path
            d="M40 8a32 32 0 0 1 32 32"
            stroke="#FF6B35"
            strokeWidth="6"
            strokeLinecap="round"
          />
        </svg>

        <p className="mt-5 font-inter text-sm text-slate-500">Loading…</p>
      </div>
    </div>
  );
}