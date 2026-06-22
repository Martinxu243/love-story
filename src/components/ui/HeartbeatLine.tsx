export default function HeartbeatLine() {
  return (
    <div className="flex items-center justify-center gap-2 py-2">
      <svg
        width="100"
        height="20"
        viewBox="0 0 100 20"
        className="overflow-visible"
      >
        <path
          d="M0 10 Q8 10 12 7 Q16 4 20 10 Q24 16 28 10 Q32 4 36 7 Q40 10 48 10 Q56 10 60 7 Q64 4 68 10 Q72 16 76 10 Q80 4 84 7 Q88 10 100 10"
          fill="none"
          stroke="rgba(180,200,225,0.3)"
          strokeWidth="1.2"
          strokeDasharray="100"
          className="animate-[heartbeat-line_3s_ease-in-out_infinite]"
        />
      </svg>
      <span className="text-base animate-pulse-heart select-none">💗</span>
    </div>
  );
}
