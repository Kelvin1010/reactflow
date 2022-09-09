import { createContext, useContext, useEffect, useState } from "react";
import { Login } from "../pages/login";

const AuthContext = createContext();

let initialState;
try {
  initialState = localStorage.getItem("user");
} catch (e) {
  console.error("localStorage error", e);
}

export function AuthProvider(props) {
  const [user, setUser] = useState(initialState);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", user);
    }
  }, [user]);

  function clearUser() {
    setUser();
    localStorage.clear("user");
  }

  const contextValue = { user, setUser, clearUser };

  return <AuthContext.Provider value={contextValue}>{!user ? <Login /> : props.children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error(
      "useAuth must be used within a AuthProvider. Wrap a parent component in <AuthProvider> to fix this error.",
    );
  }
  return context;
}
