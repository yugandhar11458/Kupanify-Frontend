

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserSessionPersistence, signOut } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAllNu3SGamHI7-9wEhVG0gG0lXt9lpdXg",
  authDomain: "kupanify-cb0e8.firebaseapp.com",
  projectId: "kupanify-cb0e8",
  storageBucket: "kupanify-cb0e8.appspot.com",
  messagingSenderId: "870630109914",
  appId: "1:870630109914:web:697151d4313e2e2bcfebe3"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

setPersistence(auth, browserSessionPersistence);

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const { user } = result;

    const updatedUser = {
      userId: user.uid,
      userName: user.displayName,
      userImage: user.photoURL,
    };

    return updatedUser;
  } catch (error) {
    console.log("Error signing in with Google:", error);
    return null;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.log("Error signing out:", error);
  }
};
