import React from "react";
import Stack from "@mui/material/Stack";

type Props = {
  children?: React.ReactNode;
};

const MainTemplate = (props: Props) => {
  return (
    <Stack
      flex={"1 1 0%"}
      direction={"row"}
      justifyContent={"center"}
      px={"10rem"}
      py={"1.25rem"}
      boxSizing={"border-box"}
      minHeight={'100vh'}
    >
      <Stack direction={"column"} maxWidth={"960px"} width={'960px'} gap={'12px'}>
        {props.children}
      </Stack>
    </Stack>
  );
};

export default MainTemplate;
