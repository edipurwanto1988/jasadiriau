import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { useApp } from "@contexts/AppContext";

const KeyboardBackspaceOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/KeyboardBackspaceOutlined")
);

type Props = {
  title?: string;
  icon?: React.ReactNode;
  rightComponent?: React.ReactNode;
  onBack?: () => void;
};

const HeaderPage = ({ title, icon, rightComponent, onBack }: Props) => {
  const app = useApp();
  return (
    <Stack
      flexGrow={1}
      direction={{ xs: "row", sm: "row", md: "row", lg: "row", xl: "row" }}
      alignItems={{
        xs: "center",
        sm: "center",
        md: "center",
        lg: "center",
        xl: "center",
      }}
      spacing={1}
      pl={2}
      py={0.5}
    >
      {onBack ? (
        <IconButton size="small" onClick={onBack}>
          <React.Suspense fallback="loading...">
            <KeyboardBackspaceOutlinedIcon />
          </React.Suspense>
        </IconButton>
      ) : null}

      {icon ? icon : null}

      {title ? (
        <Typography
          component={"div"}
          variant="h6"
          sx={{
            ...(app.isMobile
              ? {
                  maxWidth: "9.375rem",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }
              : undefined),
          }}
        >
          {title}
        </Typography>
      ) : null}

      <Box display={"flex"} flexGrow={1} justifyContent={"flex-end"} p={1}>
        {rightComponent ? rightComponent : null}
      </Box>
    </Stack>
  );
};

export default HeaderPage;
