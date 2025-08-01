import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadComponent from "@/components/base/LoadComponent/LoadComponent";
import IconButton from "@mui/material/IconButton";
import ButtonWithIcon from "@/components/base/Button/ButtonWithIcon";
import Breadcrumbs from "@/components/base/Breadcrumbs";

type Props = {
  title?: string;
  children?: React.ReactNode;
  onBack?: () => void;
  onReload?: () => void;
  onCreate?: () => void;
  onUpdate?: () => void;
  onDelete?: () => void;
};

const ArrowBackOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/ArrowBackOutlined")
);

const PageTemplate = (props: Props) => {
 
  return (
    <Stack
      flex={1}
      width={"100%"}
      height={"100%"}
      minHeight={"100%"}
      overflow={"hidden"}
      direction={"column"}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        spacing={1.5}
        sx={{
          overflow: "hidden",
          px: 2,
          boxSizing: "border-box",
          borderBottom: 1,
          borderColor: "divider",
          minHeight: "37px",
        }}
      >
        {props.onBack ? (
          <IconButton size="small">
            <ArrowBackOutlinedIcon fontSize="inherit" />
          </IconButton>
        ) : null}

        <Typography
          component={"div"}
          variant="subtitle1"
          fontWeight={500}
          color="textSecondary"
        >
          {props.title || ""}
        </Typography>

        <div style={{ flexGrow: 1 }}>
          {props.onCreate ? (
            <ButtonWithIcon
              position="start"
              icon="AddOutlinedIcon"
              variant="text"
              onClick={props.onCreate}
            >
              Add New
            </ButtonWithIcon>
          ) : null}

          {props.onUpdate ? (
            <ButtonWithIcon
              position="start"
              icon="EditNoteOutlinedIcon"
              variant="text"
              onClick={props.onUpdate}
            >
              Edit Data
            </ButtonWithIcon>
          ) : null}

          {props.onDelete ? (
            <ButtonWithIcon
              position="start"
              icon="DeleteOutlineOutlinedIcon"
              variant="text"
              onClick={props.onDelete}
            >
              Delete Data
            </ButtonWithIcon>
          ) : null}

          {props.onReload ? (
            <ButtonWithIcon
              position="start"
              icon="RestartAltOutlinedIcon"
              variant="text"
              onClick={props.onReload}
            >
              Reload
            </ButtonWithIcon>
          ) : null}
        </div>

        <Breadcrumbs />
      </Stack>

      {props.children}
    </Stack>
  );
};

export default PageTemplate;
