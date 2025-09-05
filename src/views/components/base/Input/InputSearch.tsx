"use client";

import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";
import React, { DetailedHTMLProps, FormHTMLAttributes } from "react";
import { useProgress } from "react-transition-progress";
import { useRouter } from "next/navigation";
import Button from "@mui/material/Button";

const SearchIcon = LoadComponent(() => import("@mui/icons-material/Search"));
const TextField = LoadComponent(() => import("@mui/material/TextField"));

const InputSearch = ({
  button,
  formProps,
  ...props
}: TextFieldProps & {
  button?: boolean;
  formProps?: DetailedHTMLProps<
    FormHTMLAttributes<HTMLFormElement>,
    HTMLFormElement
  >;
}) => {
  const startProgress = useProgress();
  const router = useRouter();
  return (
    <Box flexGrow={1}>
      <form
        {...formProps}
        onSubmit={(e) => {
          e.preventDefault();

          const formData = new FormData(e.currentTarget);

          React.startTransition(() => {
            startProgress();
            const newUrl = new URL(e.currentTarget.action);
            const encoded = new URLSearchParams(formData as any).toString();
            newUrl.search = encoded;
            router.push(newUrl.toString());
          });
        }}
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "12px",
        }}
      >
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Cari jasa atau penyedia jasa"
          size="medium"
          slotProps={{
            input: {
              sx: {
                minHeight: 40,
              },
              startAdornment: <SearchIcon htmlColor="#4A739C" sx={{ mr: 1 }} />,
            },
          }}
          {...props}
        />

        {button ? (
          <Button type="submit" variant="contained" disableElevation>
            Cari
          </Button>
        ) : null}
      </form>
    </Box>
  );
};

export default InputSearch;
