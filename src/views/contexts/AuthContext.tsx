"use client";
import React from "react";

type Props = {
  children: React.ReactNode;
  initialState: User | null;
};

const AuthContext = React.createContext({
  isLogin: false,
});

const AuthProvider = (props: Props) => {
  const [isLogin, _setLogin] = React.useState(!!props.initialState);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
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
