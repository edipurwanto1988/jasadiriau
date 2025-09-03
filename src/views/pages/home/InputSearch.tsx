"use client";
import InputLargeSearch from "@/views/components/base/Input/InputLargeSearch";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { useRouter } from "next/navigation";
import React from "react";
import { useProgress } from "react-transition-progress";

const InputSearch = () => {
  const router = useRouter();
  const startProgress = useProgress();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get("q");
    React.startTransition(() => {
      startProgress()
      router.push(`/search?q=${q}`);
    });
  };
  return (
    <Paper
      elevation={10}
      component={"form"}
      noValidate
      onSubmit={handleSubmit}
      sx={(theme) => ({
        position: "absolute",
        bottom: 56,
        left: 48,
        width: "70%",
        px: 1,
        py: 1,
        [theme.breakpoints.between("xs", "md")]: {
          bottom: 24,
          left: "50%",
          right: "auto",
          transform: "translateX(-50%)",
          width: "90%",
        },
      })}
    >
      <Stack direction={"row"} alignItems={"center"}>
        <InputLargeSearch
          name="q"
          defaultValue={""}
          sx={{
            backgroundColor: "transparent",
            "& .MuiOutlinedInput-root": {
              pl: 0,
              backgroundColor: "#FFF",
            },
          }}
        />
        <Box>
          <Button
            size="large"
            disableElevation
            color="primary"
            variant="contained"
            type="submit"
          >
            Cari
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
};

export default InputSearch;
