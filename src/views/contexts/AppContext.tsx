"use client";
import React from "react";
import { Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const AppContext = React.createContext({
  isMobile: false,
  trigger: { open: true, key: [] as string[] },
  anchorEl: null as null | HTMLElement,
  set: (_: null | HTMLElement) => {},
  addKey: (_: string) => {},
  clearKey: () => {},
  setTrigger: (_: Partial<{ open: boolean; key: any[] }>) => {},
  onClickOpen: () => {},
});

const AppProvider = (props: { children: React.ReactNode }) => {
  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.between("xs", "md")
  );

  const [trigger, setTrigger] = React.useState({
    open: false,
    key: [] as string[],
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [_watch, _setWatch] = React.useState([]);

  const onClickOpen = () => {
    setTrigger((p) => ({ ...p, open: !p.open, key: p.open ? [] : p.key }));
  };

  const set = (val: null | HTMLElement) => {
    setAnchorEl(val);
  };

  const addKey = (key: string) => {
    setTrigger((p) => ({
      ...p,
      key: p.key.includes(key)
        ? p.key.filter((v) => v !== key)
        : [...p.key, key],
    }));
  };

  const clearKey = () => {
    setTrigger((p) => ({
      ...p,
      key: [],
    }));
  };

  React.useEffect(() => {
    if (!isMobile && trigger.open) return;
    setTrigger((p) => ({ ...p, open: false, key: [] }));
  }, [isMobile]);

  return (
    <AppContext.Provider
      value={{
        isMobile,
        trigger,
        anchorEl,
        set,
        onClickOpen,
        addKey,
        clearKey,
        setTrigger: (value) => {
          setTrigger((p) => ({ ...p, ...value }));
        },
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = React.useContext(AppContext);
  return context;
};

export default AppProvider;
