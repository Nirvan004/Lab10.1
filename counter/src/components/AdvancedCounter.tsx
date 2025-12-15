import { useEffect, useState } from "react";

const STORAGE_KEY = "advanced-counter-count";

export default function AdvancedCounter() {
  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved !== null ? Number(saved) : 0;
  });

  const [history, setHistory] = useState<number[]>([count]);
  const [step, setStep] = useState<number>(1);

  useEffect(() => {
    setHistory((prev) => [...prev, count]);
  }, [count]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, String(count));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [count]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowUp") {
        setCount((c) => c + step);
      }
      if (event.key === "ArrowDown") {
        setCount((c) => c - step);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [step]);

  const increment = () => setCount((c) => c + step);
  const decrement = () => setCount((c) => c - step);

  const reset = () => {
    setCount(0);
    setHistory([0]);
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <h2>Advanced Counter</h2>

      <h3>Count: {count}</h3>

      <div>
        <button onClick={decrement}>-</button>
        <button onClick={increment}>+</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>
          Step:&nbsp;
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value) || 1)}
          />
        </label>
      </div>

      <div style={{ marginTop: 12 }}>
        <strong>Previous counts:</strong>
        <div>{history.join(", ")}</div>
      </div>
    </div>
  );
}
