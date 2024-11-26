import type { IOTReading } from "./utils";

import { useEffect, useRef, useState } from "react";

interface UseRealtimeUpdateOptions {
  max: number;
}

export function useRealtimeUpdate<T>(
  data: T[],
  update: T | undefined,
  diff: (lastItem: T, updateValue: T) => boolean,
  options?: UseRealtimeUpdateOptions
) {
  const [readings, setReadings] = useState(data);

  useEffect(() => {
    setReadings(data);
  }, [data]);

  const lastEntry = readings[readings.length - 1];

  useEffect(() => {
    if (!!update && !!diff && diff(lastEntry, update)) {
      if (options) {
        setReadings((r) => [
          ...r.slice(Math.max(0, r.length - options.max)),
          update,
        ]);
      } else {
        setReadings((r) => [...r, update]);
      }
    }
  }, [update, options, lastEntry, diff]);

  return readings;
}

// Fake hook to simulate a constant update
export function useSimulatedUpdate(interval: number) {
  const [update, setUpdate] = useState<IOTReading>();
  const intReference = useRef(0);

  useEffect(() => {
    intReference.current = setInterval(() => {
      setUpdate({
        temperature: 15 + Math.floor(25 * Math.random()),
        timestamp: Date.now(),
      });
    }, interval);

    return () => clearInterval(intReference.current)
  }, [interval]);

  return update;
}
