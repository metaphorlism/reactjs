import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./config/firebase";
import { useEffect, useState } from "react";

function signInWithGoogle() {
  // Create a new instance of the google provider
  const provider = new GoogleAuthProvider();

  // Sign in with popup mean it will pop a new window for the user to sign-in
  return signInWithPopup(auth, provider)
    .then((userCredential) => {
      return userCredential.user; // Return user information
    })
    .catch((error) => {
      // Handle sign-in error here
    });
}

function signOut() {
  return auth
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // Error happened.
    });
}

function App() {
  const [name, setName] = useState<string>("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) return;
      setName(user.displayName || "");
    });
  }, []);

  return (
    <>
      {name ? <h1>Your display name is {name}</h1> : null}
      <button
        onClick={() =>
          signInWithGoogle().then((user) => {
            if (!user) return;
            setName(user.displayName || "");
          })
        }
      >
        Sign In
      </button>
      <button
        onClick={() =>
          signOut().then(() => {
            setName("");
          })
        }
      >
        Sign Out
      </button>
    </>
  );
}

export default App;
