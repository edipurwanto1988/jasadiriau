"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import IconButton from "@mui/material/IconButton";
import ButtonWithIcon from "@/views/components/base/Button/ButtonWithIcon";
import Breadcrumbs from "@/views/components/base/Breadcrumbs";
import { ButtonGroup, useMediaQuery } from "@mui/material";

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
  const isMobile = useMediaQuery((theme) =>
    theme.breakpoints.between("xs", "sm")
  );

  if (isMobile) {
    return (
      <Stack
        flex={1}
        width={"100%"}
        height={"100vh"}
        minHeight={"100vh"}
        overflow={"hidden"}
        direction={"column"}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={1}
          sx={{
            overflow: "hidden",
            px: 1,
            boxSizing: "border-box",
            borderBottom: 1,
            borderColor: "divider",
            minHeight: "37px",
          }}
        >
          {props.onBack ? (
            <IconButton size="small" onClick={props.onBack}>
              <ArrowBackOutlinedIcon fontSize="inherit" />
            </IconButton>
          ) : null}

          <Typography
            flexGrow={1}
            component={"div"}
            variant="subtitle1"
            fontWeight={500}
            color="textSecondary"
            whiteSpace={"nowrap"}
            overflow={"hidden"}
            textOverflow={"ellipsis"}
          >
            {props.title || ""}
          </Typography>

          <div>
            <ButtonGroup>
              {props.onCreate ? (
                <ButtonWithIcon
                  position="start"
                  icon="AddOutlinedIcon"
                  variant="text"
                  onClick={props.onCreate}
                >
                  Tambah
                </ButtonWithIcon>
              ) : null}

              {props.onUpdate ? (
                <ButtonWithIcon
                  position="start"
                  icon="EditNoteOutlinedIcon"
                  variant="text"
                  onClick={props.onUpdate}
                >
                  Ubah
                </ButtonWithIcon>
              ) : null}

              {props.onDelete ? (
                <ButtonWithIcon
                  position="start"
                  icon="DeleteOutlineOutlinedIcon"
                  variant="text"
                  onClick={props.onDelete}
                >
                  Hapus
                </ButtonWithIcon>
              ) : null}

              {props.onReload ? (
                <ButtonWithIcon
                  typeButton="icon"
                  position="start"
                  icon="RestartAltOutlinedIcon"
                  onClick={props.onReload}
                />
              ) : null}
            </ButtonGroup>
          </div>
        </Stack>

        {props.children}
      </Stack>
    );
  }

  return (
    <Stack
      flex={1}
      width={"100%"}
      height={"100vh"}
      minHeight={"100vh"}
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
          <IconButton size="small" onClick={props.onBack}>
            <ArrowBackOutlinedIcon fontSize="inherit" />
          </IconButton>
        ) : null}

        <Typography
          component={"div"}
          variant="subtitle1"
          fontWeight={500}
          color="textSecondary"
          maxWidth={"25%"}
          whiteSpace={"nowrap"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
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
              Tambah Baru
            </ButtonWithIcon>
          ) : null}

          {props.onUpdate ? (
            <ButtonWithIcon
              position="start"
              icon="EditNoteOutlinedIcon"
              variant="text"
              onClick={props.onUpdate}
            >
              Ubah Data
            </ButtonWithIcon>
          ) : null}

          {props.onDelete ? (
            <ButtonWithIcon
              position="start"
              icon="DeleteOutlineOutlinedIcon"
              variant="text"
              onClick={props.onDelete}
            >
              Hapus Data
            </ButtonWithIcon>
          ) : null}

          {props.onReload ? (
            <ButtonWithIcon
              position="start"
              icon="RestartAltOutlinedIcon"
              variant="text"
              onClick={props.onReload}
            >
              Segarkan
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
