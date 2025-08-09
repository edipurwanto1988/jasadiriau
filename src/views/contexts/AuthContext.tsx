import React from "react";

const AuthContext = React.createContext({
  isLogin: false,
  user: undefined as any | undefined,
  setLogin(_: boolean) {},
  setUser(_: any) {},
  setToken(_: string) {},
  getToken: () => {},
  clear() {},
});

const AuthProvider = (props) => {
  const [isLogin, _setLogin] = React.useState(false);
  const [_user, _setUser] = React.useState<any | undefined>(undefined);

  const setLogin = (val: boolean) => {
    _setLogin(val);
  };

  const setUser = (val: any) => {
    _setUser(val);
  };

  const setToken = (val: string) => {
    if (val) {
      localStorage.setItem("token", val);
    }
  };

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const clear = () => {
    localStorage.removeItem("token");
    _setUser(undefined);
    _setLogin(false);
  };

  const user = React.useMemo(() => _user, [_user, isLogin]);

  return (
    <AuthContext.Provider
      value={{
        isLogin,
        user,
        setLogin,
        setUser,
        setToken,
        getToken,
        clear,
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
