# Implement Firebase authentication into your ReactJS project

## Requirement

- [NodeJS](https://nodejs.org/en/download)

## Create React Project

```bash
$ npm create vite@latest
$ cd <your-project-name> # Go into Project Folder
$ npm install # Install the dependencies
# After the installation of dependencies is completed run the project
$ npm run dev
```

## Firebase

### Install firebase dependency

```bash
$ npm install firebase
```

### Before we config the firebase

> Getting the information for firebase config in this [Firebase Console](https://console.firebase.google.com)
>
> 1. Add project
> 2. Enter your project name then continue
> 3. Then continue till the `Create project` button appear and click it
> 4. Click on `Gear Icon ⚙` and click on `Project Settings`
> 5. In general, you will see `Your apps` section at the bottom of the page click on `</>`
> 6. Input your App nickname and click on `Register app`
> 7. Copy the variable `firebaseConfig`
> 8. Continue to Console
> 9. Open the `Build > Authentication` under the `Product Categories`
> 10. Click on `Get started` and choose your sign-in method
> 11. Enable your sign-in method
>
> **Note** Using Google sign-in method will automatically generate `Client ID` and `Client Secret` for you

#### Example

> Using the Facebook sign-in method
>
> 1. Go to [Facebook Developer](https://developers.facebook.com/apps)
> 2. Create an app
> 3. Select Set up Facebook Login
> 4. Check `website`
> 5. Give an app name
> 6. Click on `Settings > Basic`
> 7. Copy `Client ID` and `Client Secret` put into the Firebase console.
> 8. Go to `Products > Configure > Settings`
> 9. Copy `Handler Link` in the Firebase console to `Valid OAuth Redirect URIs`

### Config firebase

> In `src` folder create `config` folder and create a file called `firebase.js`  
> Look Like: `src/config/firebase.js`

```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_WEB_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
```

> As you have seen in this file I'm using an env file for safety and easy to modify without coming into the file. You can create an env file by:
>
> - In `project` folder create `.env` file
>   - Look Like : `<your-project-name>/.env`
> - The variable need to be like this `VITE_<your-varible-name>`
>
> **Note** Don't forget to ignore `.env` file when pushing it to the repository. `.gitignore`

```
VITE_WEB_API_KEY=
VITE_AUTH_DOMAIN=
VITE_PROJECT_ID=
VITE_STORAGE_BUCKET=
VITE_MESSAGING_SENDER_ID=
VITE_APP_ID=
```

> After creating the file you can paste your config value here
> To use variable from env file `import.meta.env.VITE_<your-variable-name>`

## Example

> How to sign in with Google

```js
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "/src/config/firebase"; // Using your relative path here

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
```

> How to sign out

```js
import { auth } from "/src/config/firebase"; // Using your relative path here

function signOut() {
  auth
    .signOut()
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // Error happened.
    });
}
```

## Project

- [Firebase Authentication](https://github.com/metaphorlism/reactjs/tree/firebase-authentication)  

## Follow Us

[![GitHub Icon](https://img.shields.io/badge/github-%23000000.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/metaphorlism)

