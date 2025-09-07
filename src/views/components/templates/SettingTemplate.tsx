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
import { useProgress } from "react-transition-progress";

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

const SettingsOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/SettingsOutlined")
);

const FeaturedPlayListOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/FeaturedPlayListOutlined")
);

const CategoryOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/CategoryOutlined")
);

const CollectionsOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/CollectionsOutlined")
);

const MenuOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/MenuOutlined")
);

const SettingTemplate = (props: Props) => {
  const app = useApp();
  const pathname = usePathname();
  const startProgress = useProgress()
  const router = useRouter();

  return (
    <LinkTab
      tab={[
        {
          label: "Umum",
          value: "/admin/setting",
          icon: <SettingsOutlinedIcon />,
          iconPosition: "start",
        },
        {
          label: "Advantage",
          value: "/admin/setting/advantage",
          icon: <FeaturedPlayListOutlinedIcon />,
          iconPosition: "start",
        },
        {
          label: "Kategori",
          value: "/admin/setting/category",
          icon: <CategoryOutlinedIcon />,
          iconPosition: "start",
        },
        {
          label: "Slider",
          value: "/admin/setting/slider",
          icon: <CollectionsOutlinedIcon />,
          iconPosition: "start",
        },
        {
          label: "Menu",
          value: "/admin/setting/menu",
          icon: <MenuOutlinedIcon />,
          iconPosition: "start",
        },
      ]}
      value={pathname}
      orientation={app.isMobile ? "horizontal" : "vertical"}
      scrollButtons={"auto"}
      variant={app.isMobile ? "scrollable" : "fullWidth"}
      onChange={(_, value) => {
        React.startTransition(() => {
          startProgress();
          router.push(value);
        })
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
    </LinkTab>
  );
};

export default SettingTemplate;
