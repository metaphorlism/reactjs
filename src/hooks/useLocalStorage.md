---
title: "Custom Hook: useLocalStorage"
description: How to create useLocalStorage in your ReactJS project
thumbnail:
author: Lim Tangmeng
---

# Custom Hook: useLocalStorage

## Introduction

The useLocalStorage hook is a custom React hook that allows you to store data in the local storage of the user's browser. With this hook, you can easily persist data across page reloads or even when the user closes and reopens the browser.

## How to create it

To create the useLocalStorage hook, you will need to import the useState hook from the React library. The useLocalStorage hook takes two parameters: the key you want to store the data under in local storage, and an optional initial value. Here is an example implementation of the useLocalStorage hook:
`src/hooks/useLocalStorage.ts`

```ts
import { useState } from "react";

type StorageValue<T> = T | undefined;

function useLocalStorage<T>(
  key: string,
  initialValue?: T
): [StorageValue<T>, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setStoredValue(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;
```

In this implementation, we use the useState hook to initialize our stored value state with the result of attempting to retrieve the data from local storage. We use the JSON.parse method to convert the stored string data back into a JavaScript object. If the stored value is undefined, we default to the initialValue parameter passed to the hook.

We also define a setValue function, which takes a new value to be stored in local storage. This function first attempts to stringify the value using the JSON.stringify method before setting it in local storage using the localStorage.setItem method. Finally, the function updates the storedValue state to reflect the new value.

## How to use it

To use the useLocalStorage hook, you first need to import it into your React component. Here is an example usage:
`src/pages/use-localStorage.ts`

```jsx
import React from "react";
import useLocalStorage from "./useLocalStorage";

function MyComponent() {
  const [name, setName] = useLocalStorage < string > ("name", "");

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <div>
      <label htmlFor="name-input">Name:</label>
      <input
        id="name-input"
        type="text"
        value={name}
        onChange={handleNameChange}
      />
      <p>Hello, {name}!</p>
    </div>
  );
}

export default MyComponent;
```

In this example, we define a new state variable called name using the useLocalStorage hook. We pass the string "name" as the key to store the data under in local storage, and the empty string as the initial value.

We then define a handleNameChange function, which updates the name state whenever the input field is changed by the user.

Finally, we render the name variable in a paragraph tag using JSX.

## Reference

You can find the source code for this custom hook on GitHub at the following link:

https://github.com/metaphorlism/reactjs/tree/custom-hooks
