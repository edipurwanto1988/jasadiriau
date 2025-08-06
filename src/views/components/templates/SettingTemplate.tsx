import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import IconButton from "@mui/material/IconButton";
import ButtonWithIcon from "@/views/components/base/Button/ButtonWithIcon";
import Breadcrumbs from "@/views/components/base/Breadcrumbs";
import LinkTab from "@/views/components/base/Tab/LinkTab";
import { usePathname, useRouter } from "next/navigation";
import { useApp } from "@/views/contexts/AppContext";

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

const SettingTemplate = (props: Props) => {
  const app = useApp();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <LinkTab
      tab={[
        {
          label: "Advantage",
          value: "/admin/setting/advantage",
        },
        {
          label: "Kategori",
          value: "/admin/setting/category",
        },
        {
          label: "Slider",
          value: "/admin/setting/slider",
        },
      ]}
      value={pathname}
      orientation={app.isMobile ? "horizontal" : "vertical"}
      scrollButtons={"auto"}
      variant={app.isMobile ? "scrollable" : "fullWidth"}
      onChange={(_, value) => {
        router.push(value);
      }}
      sx={(theme) => ({
        pt: 1,
        minWidth: 200,
        height: "100%",
        "& .MuiTab-root": {
          justifyContent: "flex-start",
          alignItems: "center",
          gap: 1,
          padding: "6px 8px",
          marginBottom: "8px",
          mx: 1,
          textAlign: "right",
          textTransform: "none",
          minWidth: "fit-content",
          minHeight: "fit-content",
          color: theme.palette.text.secondary,
          border: "1px solid",
          borderColor: "transparent",
          borderRadius: 2,
          transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;",
          ":hover": {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.grey[200],
          },
          "&.Mui-selected": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
          },
        },
      })}
      wrapperProps={{
        sx: {
          ...(app.isMobile ? {} : { display: "flex", flex: 1, flexGrow: 1 }),
          height: "100%",
          minHeight: "100%",
          overflow: "hidden",
        },
      }}
      boxProps={{
        sx: {
          ...(app.isMobile
            ? { borderBottom: 1, overflow: "hidden" }
            : {
                borderRight: 1,
                overflow: "hidden",
                height: "100%",
                zIndex: 1202,
                minWidth: "max-content",
              }),
          borderColor: "divider",
        },
      }}
    >
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
    </LinkTab>
  );
};

export default SettingTemplate;
