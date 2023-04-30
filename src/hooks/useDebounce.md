---
title: "Custom Hook : useDebounce"
description: How to create useDebounce in your ReactJS project
thumbnail:
author: Lim Tangmeng
---

# Custom Hook: useDebounce

## Introduction

In `React`, the `useDebounce` hook is used to delay the execution of a function until a certain amount of time has passed without the function being triggered again. This is particularly useful when dealing with user input, such as search queries or form submissions, where you may want to wait for the user to stop typing before triggering an action.

By using the `useDebounce` hook, you can ensure that the function isn't executed every time the user types a letter, but rather only after they've finished typing and there's been a short delay. This can help reduce unnecessary re-renders and improve overall performance.

## How To Craete It

We will create our custom hook in our hooks folder.
You can ignore the type in the script if you are using `JavaScript` language.

`src/hooks/useDebounce.ts`

```ts
import { useState, useEffect } from "react";

type useDebounceProps = {
  delay: number; // in ms
};

function useDebounce<T>({ value, delay }: useDebounceProps & { value: T }) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      // It'll be fire when the time run out.
      setDebouncedValue(value);
    }, delay);

    // When the value is change it'll clear the timer
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  // Return debounce value for future trigger
  return debouncedValue;
}

export default useDebounce;
```

## Use it in your page

To use in your page it need `useState` and `useEffect`.
`useState` for handling new input from user.
`useEffect` will be trigger when timer is up.

`src/pages/use-debounce.tsx`

```ts
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
    // Example API request
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
```

## Reference

You can find the source code for this custom hook on GitHub at the following link:

https://github.com/metaphorlism/reactjs/tree/custom-hooks
