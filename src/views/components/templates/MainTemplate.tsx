import React from "react";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";

type Props = {
  children?: React.ReactNode;
};

const MainTemplate = (props: Props) => {
  return (
    <main>
      <Stack
        flex={"1 1 0%"}
        direction={"row"}
        justifyContent={"center"}
        px={"10rem"}
        py={"1.25rem"}
        boxSizing={"border-box"}
        minHeight={"100%"}
      >
        <Stack
          direction={"column"}
          maxWidth={"960px"}
          width={"960px"}
          gap={"12px"}
        >
          <Toolbar />

          {props.children}
        </Stack>
      </Stack>
    </main>
  );
};

export default MainTemplate;
