"use client";
import { AlertModel } from "@/components/base/Dialog/AlertDialog";
import { createContext, useContext, useReducer } from "react";

const initialState: AlertModel = {
  open: false,
  title: "",
  message: "",
  type: "success",
  loading: false,
  close: {
    text: "Batalkan",
    onClick: () => {},
  },
  confirm: {
    text: "Confirm",
    onClick: () => {},
  },
  textfield: false,
  remark: "",
};

const AlertContext = createContext({
  alert: initialState,
  set: (_: Partial<AlertModel>) => {},
  reset: () => {},
  setRemark: (_: any) => {},
});

const alertReducer = (
  state: AlertModel,
  action: { type: string; payload?: Partial<AlertModel> }
) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        ...action.payload,
      };
    case "REMARK": {
      return {
        ...state,
        remark: action.payload!.remark ?? "",
      };
    }
    case "CLOSE":
      return {
        ...state,
        remark: "",
        open: false,
      };
    case "RESET":
      return { ...initialState };
    default:
      return state;
  }
};

const AlertProvider = ({ children }) => {
  const [alert, dispatch] = useReducer(alertReducer, initialState);

  const set = (value: Partial<AlertModel>) => {
    dispatch({ type: "SET", payload: value });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  const setRemark = (value) => {
    dispatch({ type: "REMARK", payload: { remark: value } });
  };

  return (
    <AlertContext.Provider
      value={{
        alert: {
          ...alert,
          ...(alert.close
            ? {
                close: {
                  ...alert.close,
                  onClick: () => dispatch({ type: "CLOSE" }),
                },
              }
            : { close: undefined }),
        },
        set,
        reset,
        setRemark,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within a AlertProvider");
  }
  return context;
};

export default AlertProvider;
