import React from "react";
import z from "@/schema/zod.schema";

export type UseZodProps<T> = {
  schema: z.ZodObject;
  data?: T;
  option?: z.core.ParseContext<z.core.$ZodIssue>;
};

export type UseZod<T = any> = {
  clear: () => void;
  error: (key?: {} | keyof T) => boolean;
  message: (key?: {} | keyof T) => any;
  validated: <T>(option?: {
    schema?: z.ZodObject;
    data?: T;
    cb?: (value: T) => void;
  }) => boolean;
  validateAt: <T>(
    key: string,
    opt?: {
      data?: T;
    }
  ) => void;
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
      return {};
    }
    default: {
      return {};
    }
  }
};

const useZod = <T = any>(props: UseZodProps<T>): UseZod<T> => {
  const [errors, dispatch] = React.useReducer(reducer, {});

  const validated = <T>(opt?: {
    data?: T;
    schema?: z.ZodObject;
    cb?: (value: T) => void;
  }) => {
    let op = {
      schema: opt?.schema ?? props.schema,
      data: opt?.data ?? props.data,
    };
    dispatch({ type: "CLEAR" });
    const result = op.schema.safeParse(op.data);
    if (!result.success) {
      dispatch({
        type: "SET",
        error: Object.fromEntries(
          result.error.issues.map((v) => [v.path.join("."), v.message])
        ),
      });
      return false;
    }

    if (opt?.cb) {
      opt.cb(result.data as T);
    }
    return true;
  };

  const validateAt = <T>(
    key: string,
    opt?: {
      data?: T;
    }
  ) => {
    let op = {
      data: props.data,
      ...opt,
    };
    dispatch({ type: "CLEAR_KEY", key });

    const result = props.schema.shape[key].safeParse(op.data![key]);
    if (!result.success) {
      dispatch({
        type: "SET",
        error: { [key]: result.error.issues.at(0)?.message },
      });
    }
  };

  const message = (key?: keyof T | {}) => {
    if (!key) {
      return errors;
    } else {
      return errors[key as string] || "";
    }
  };

  const error = (key?: keyof T | {}) => {
    if (!key) {
      return Object.keys(errors).length > 0;
    } else {
      return (key as string) in errors;
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

export default useZod;
