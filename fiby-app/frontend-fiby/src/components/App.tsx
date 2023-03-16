import { FormEvent, useRef, useState } from "react";
import "./App.css";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

interface FibonacciResponse {
  result: number;
}

async function fetchFibbonacci(num: number): Promise<number> {
  const response = await fetch(`${BASE_URL}/fibonacci/${num}`);
  const { result } = await response.json() as FibonacciResponse;
  return result;
}

export function App () {
  const [result, setResult] = useState('');
  // ref allows for a mutable input value, we don't really need to validate anything
  const inputRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    const number = Number(inputRef.current?.value);

    try {
      const fiby = await fetchFibbonacci(number);
      setResult(`${fiby}`);
    } catch {
      console.error('Something bad happened 💀')
    }
  }

  return (
    <div className="fiby d-flex-centered">
      <h1>Calculate Fibonacci!</h1>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="number" placeholder="5" required />
        <button type="submit">Calculate</button>
      </form>

      <span className="d-flex-centered">Fibonacci Result:<big>{result}</big></span>
    </div>
  );
}
