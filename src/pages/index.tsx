import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearchTerm = useDebounce<string>({
    value: searchTerm,
    delay: 500,
  });

  const [response, setResponse] = useState<string>("");

  useEffect(() => {
    // Send your API request her
    fetch(`/api/hello?text=${searchTerm}`)
      .then((res) => res.json())
      .then((result: { text: string }) => {
        setResponse(result.text);
      });
  }, [debouncedSearchTerm]);

  return (
    <div className="flex flex-col items-center">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="outline mt-5 px-3 py-1"
      />
      <div>
        <h1>{response}</h1>
      </div>
    </div>
  );
}
