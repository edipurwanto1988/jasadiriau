"use client";
import InputLargeSearch from "@/views/components/base/Input/InputLargeSearch";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const InputSearch = () => {
  return (
    <Paper
      elevation={10}
      component={"form"}
      action={"/search"}
      noValidate
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
