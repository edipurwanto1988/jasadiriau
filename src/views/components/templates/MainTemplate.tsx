import React from "react";
import Stack, { StackProps } from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";

type Props = {
  children?: React.ReactNode;
  columnProps?: StackProps
};

const MainTemplate = (props: Props) => {
  return (
    <main>
      <Stack
        flex={"1 1 0%"}
        direction={"row"}
        justifyContent={"center"}
        boxSizing={"border-box"}
        minHeight={"100%"}
        width={"100%"}
        sx={{
          px: {
            xs: 0,
            sm: 0,
            md: "10rem",
            lg: "10rem",
            xl: "10rem",
          },
          py: {
            xs: 0,
            sm: 0,
            md: "1.25rem",
            lg: "1.25rem",
            xl: "1.25rem",
          },
        }}
      >
        <Stack
          direction={"column"}
          {...props.columnProps}
          sx={{
            maxWidth: {
              xs: "100%",
              sm: "100%",
              md: "960px",
              lg: "960px",
              xl: "960px",
            },
            width: {
              xs: "100%",
              sm: "100%",
              md: "960px",
              lg: "960px",
              xl: "960px",
            },
          }}
        >
          <Toolbar />
          {props.children}
        </Stack>
      </Stack>
    </main>
  );
};

export default MainTemplate;
