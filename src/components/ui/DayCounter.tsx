"use client";

import { useEffect, useRef, useState } from "react";

interface DayCounterProps {
  days: number;
}

export default function DayCounter({ days }: DayCounterProps) {
  const [displayDays, setDisplayDays] = useState(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    const duration = 1500;
    const steps = 60;
    const increment = days / steps;
    let current = 0;
    const interval = duration / steps;

    const timer = setInterval(() => {
      current += increment;
      if (current >= days) {
        setDisplayDays(days);
        clearInterval(timer);
      } else {
        setDisplayDays(Math.floor(current));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [days]);

  return (
    <span className="font-serif text-5xl font-bold text-gradient tabular-nums">
      {displayDays.toLocaleString()}
    </span>
  );
}
