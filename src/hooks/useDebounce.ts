import { useState, useEffect } from "react";

type useDebounceProps = {
  delay: number; // in ms
};

function useDebounce<T>({ value, delay }: useDebounceProps & { value: T }) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
