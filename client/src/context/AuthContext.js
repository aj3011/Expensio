import React, { useContext, useState, useEffect } from "react";

//this is the auth instance we exported from the firebase.js file
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  // what firebase does is that it sets up local storage (sets cookies) to verify which user is signed in and then it will connect that user for us. So we set an initial loading state here for the time firebase does all this stuff for us
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    //onAuthStateChanged is basically called whenever me perform a task such as signing up or logging or logging out, so that it updates who the current user is.

    //we get this unsubscribe here is because this onAuthStateChanged function  actually returns a function which when called unsubscribes us from the listener onAuthStateChange when the component is unmounted(i.e., incase when we unmount login page and go to the main page upon successful sign in)

    //An empty array []: the side-effect runs once after the initial rendering, here upon unmounting

    const unsubscribe = auth.onAuthStateChanged(user => {
      //we have written setCurrentUser before setLoading because we only want to load things further once we get the user
      setCurrentUser(user);
      // setLoading false means that we have set the user and thus can proceed further
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
