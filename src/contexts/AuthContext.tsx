import React from "react";

const AuthContext = React.createContext({
  isLogin: false,
  user: undefined as Me | undefined,
  setLogin(_: boolean) {},
  setUser(_: Me) {},
  updateAgent(_: any) {},
  setToken(_: string) {},
  getToken: (): string => "",
  clear() {},
});
export function HydrateFallback() {
  return <span />;
}
const AuthProvider = (props) => {
  const [isLogin, _setLogin] = React.useState(false);
  const [_user, _setUser] = React.useState<Me | undefined>(undefined);

  const setLogin = (val: boolean) => {
    _setLogin(val);
  };

  const setUser = (val: Me) => {
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

  const updateAgent = (value: any) => {
    _setUser((p) => ({ ...p, agent: value }));
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
        updateAgent,
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
