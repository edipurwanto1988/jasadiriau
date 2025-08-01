import React from "react";
import * as yup from "yup";
import { convertPath } from "@/utils/string";

export type UseYupProps<T> = {
  schema: (y: typeof yup) => yup.AnyObjectSchema;
  data?: T;
  option?: yup.ValidateOptions;
};

export type UseYup<T> = {
  clear: () => void;
  error: (key?: {} | keyof T) => boolean;
  message: (key?: {} | keyof T) => any;
  validated: <T>(data?: T, option?: yup.ValidateOptions) => Promise<boolean>;
  validateAt: <T>(
    key: string,
    data?: T,
    option?: yup.ValidateOptions
  ) => Promise<void>;
  setError: (value: Record<string, string>) => void;
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET": {
      return {
        ...state,
        ...action.error,
      };
    }
    case "CLEAR_KEY": {
      delete state[action.key];
      return {
        ...state,
      };
    }
    case "CLEAR": {
      return {
        // ...use.omit(state, [action.key]),
      };
    }
    default: {
      return {};
    }
  }
};

const useYup = <T = any>(props: UseYupProps<T>): UseYup<T> => {
  const [errors, dispatch] = React.useReducer(reducer, {});

  const validated = async <T>(data?: T, opt?: yup.ValidateOptions) => {
    try {
      dispatch({ type: "CLEAR" });
      await props
        .schema(yup)
        .validate(
          { ...(data ?? props.data ?? {}) },
          { abortEarly: false, ...(opt ?? props.option ?? {}) }
        );
      return true;
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        dispatch({
          type: "SET",
          error: Object.fromEntries(
            error.inner.map((v) => [v.path, v.message])
          ),
        });
      }
      return false;
    }
  };

  const validateAt = async <T>(
    key: string,
    data?: T,
    opt?: yup.ValidateOptions
  ) => {
    try {
      dispatch({ type: "CLEAR_KEY", key });
      await props.schema(yup).validateAt(key, data ?? props.data ?? {}, opt);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        dispatch({ type: "SET", error: { [error.path]: error.message } });
      }
    }
  };

  const message = (key?: keyof T | {}) => {
    if (!key) {
      return errors;
    } else {
      return errors[convertPath(key as string)] || "";
    }
  };
  
  const error = (key?: keyof T | {}) => {
    if (!key) {
      return Object.keys(errors).length > 0;
    } else {
      return convertPath(key as string) in errors;
    }
  };

  const clear = () => {
    dispatch({ type: "CLEAR" });
  };

  const setError = (value: Record<string, string>) => {
    dispatch({ type: "SET", error: value });
  };

  return { clear, error, message, validated, validateAt, setError };
};

export default useYup;
