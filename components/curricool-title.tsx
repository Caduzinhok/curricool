export default function CurricoolTitle() {
  return (
    <h1
      className="
        relative inline-block
        text-5xl sm:text-3xl md:text-4xl font-extrabold tracking-tight
        bg-gradient-to-r from-[#FF6B6B] via-[#FFD166] to-[#5A8DEE]
        bg-clip-text text-transparent
        drop-shadow
        animate-[pulse_4s_ease-in-out_infinite]
      "
      aria-label="Curricool"
    >
      <span className="pr-2">Curri</span>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#74C0FC] to-[#2E5AA3]">
        cool
      </span>

      {/* Risquinho divertido embaixo */}
      <span
        className="
          absolute left-0 right-0 -bottom-2 h-2
          rounded-full blur-[1px]
          bg-gradient-to-r from-[#CDE9FF] via-[#74C0FC] to-[#FFD166]
        "
        aria-hidden="true"
      />

      {/* Estrelinhas */}
      <svg
        className="absolute -top-3 -left-6 h-4 w-4"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M10 0l2.2 5.3L18 7.2l-5 2.1L11 14l-1.9-4.7L4 7.2l5.8-1.9L10 0z"
          fill="#FFD166" />
      </svg>
      <svg
        className="absolute -top-4 right-0 h-3 w-3"
        viewBox="0 0 20 20"
        aria-hidden="true"
      >
        <path d="M10 0l2.2 5.3L18 7.2l-5 2.1L11 14l-1.9-4.7L4 7.2l5.8-1.9L10 0z"
          fill="#74C0FC" />
      </svg>
    </h1>
  );
}
