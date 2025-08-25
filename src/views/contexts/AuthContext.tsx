"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  initialState: {
    isAuth: boolean;
    userId: number;
    role: RoleType;
  } | null;
};

const AuthContext = React.createContext({
  isAuth: false,
  userId: 0,
  role: "user" as RoleType,
});

const AuthProvider = (props: Props) => {
  const [auth, setAuth] = React.useState({
    isAuth: false,
    userId: 0,
    role: "user" as RoleType,
    ...props.initialState,
  });

  return (
    <AuthContext.Provider
      value={{
        ...auth,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  return context;
};

export default AuthProvider;
