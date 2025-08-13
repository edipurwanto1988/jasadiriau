"use client";
import React, { Suspense, lazy, useRef } from "react";
import IconButton from "@mui/material/IconButton";
import { TextFieldProps } from "@mui/material/TextField";
import LoadComponent from "../LoadComponent/LoadComponent";
import InputAdornment from "@mui/material/InputAdornment";
const VisibilityOff = lazy(() => import("@mui/icons-material/VisibilityOff"));

type InputPasswordProps = TextFieldProps & {};

const TextField = React.lazy(() => import("@mui/material/TextField"));

const KeyIcon = LoadComponent(() => import("@mui/icons-material/Key"));

const InputPassword = (props: InputPasswordProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const show = useRef<HTMLButtonElement>(null);

  const visibility = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path opacity="0.4" d="M11.0358 8.49994C11.0358 9.90244 9.90244 11.0358 8.49994 11.0358C7.09744 11.0358 5.96411 9.90244 5.96411 8.49994C5.96411 7.09744 7.09744 5.96411 8.49994 5.96411C9.90244 5.96411 11.0358 7.09744 11.0358 8.49994Z" stroke="#979797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M8.50001 14.3579C11.0004 14.3579 13.3308 12.8846 14.9529 10.3346C15.5904 9.33584 15.5904 7.65709 14.9529 6.65834C13.3308 4.10834 11.0004 2.63501 8.50001 2.63501C5.99959 2.63501 3.66918 4.10834 2.04709 6.65834C1.40959 7.65709 1.40959 9.33584 2.04709 10.3346C3.66918 12.8846 5.99959 14.3579 8.50001 14.3579Z" stroke="#979797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

  const off = `<svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M10.292 6.70786L6.70786 10.292C6.24744 9.83161 5.96411 9.20119 5.96411 8.49994C5.96411 7.09744 7.09744 5.96411 8.49994 5.96411C9.20119 5.96411 9.83161 6.24744 10.292 6.70786Z" stroke="#979797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
<path d="M12.6225 4.08709C11.3829 3.15209 9.96626 2.64209 8.50001 2.64209C5.99959 2.64209 3.66918 4.11542 2.04709 6.66542C1.40959 7.66417 1.40959 9.34292 2.04709 10.3417C2.60668 11.22 3.25834 11.9779 3.96668 12.5871" stroke="#979797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
<path opacity="0.4" d="M5.96411 13.8339C6.77161 14.1739 7.62869 14.358 8.49994 14.358C11.0004 14.358 13.3308 12.8847 14.9529 10.3347C15.5904 9.33594 15.5904 7.65719 14.9529 6.65844C14.7191 6.2901 14.4641 5.94302 14.202 5.61719" stroke="#979797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
<path opacity="0.4" d="M10.9863 8.99585C10.8021 9.9946 9.98752 10.8092 8.98877 10.9934" stroke="#979797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
<path d="M6.70788 10.292L1.41663 15.5832" stroke="#979797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
<path d="M15.5834 1.41675L10.2921 6.708" stroke="#979797" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

  return (
    <React.Suspense fallback="loading...">
      <TextField
        id="password"
        type="password"
        name="password"
        autoComplete=""
        slotProps={{
          input: {
            inputRef: ref,
            startAdornment: (
              <InputAdornment position="start">
                <KeyIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <IconButton
                size="small"
                ref={show}
                onClick={(e) => {
                  e.preventDefault();
                  if (ref.current !== null && ref.current.type === "password") {
                    ref.current.type = "text";
                    show.current!.innerHTML = off;
                  } else if (
                    ref.current !== null &&
                    ref.current.type === "text"
                  ) {
                    ref.current.type = "password";
                    show.current!.innerHTML = visibility;
                  }
                }}
              >
                <Suspense fallback="loading">
                  <VisibilityOff fontSize="inherit" />
                </Suspense>
              </IconButton>
            ),
          },
        }}
        {...props}
      />
    </React.Suspense>
  );
};

export default InputPassword;
