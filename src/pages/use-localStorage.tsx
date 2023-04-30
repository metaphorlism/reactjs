import React from "react";
import useLocalStorage from "@/hooks/useLocalStorage";

function MyComponent() {
  const [name, setName] = useLocalStorage<string>("name", "");
  const [hydrated, setHydrated] = React.useState(false);

  React.useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div className="flex flex-col items-center mt-5">
      <div>
        <label htmlFor="name-input">Name:</label>
        <input
          id="name-input"
          type="text"
          value={name}
          onChange={handleNameChange}
          className="outline ml-2 px-2 py-1"
        />
      </div>
      <p>Hello, {name}!</p>
    </div>
  );
}

export default MyComponent;
