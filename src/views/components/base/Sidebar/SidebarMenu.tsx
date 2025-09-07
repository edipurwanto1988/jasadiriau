"use client";
import React from "react";
import List from "@mui/material/List";
import { SvgIconTypeMap } from "@mui/material/SvgIcon";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MuiDrawer from "@mui/material/Drawer";
import Loading from "@/views/components/base/Skeleton/Spinner";
import TooltipSidebarMenu from "../Tooltip/TooltipSidebarMenu";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useApp } from "@/views/contexts/AppContext";
import { styled } from "@mui/material/styles";

export type SiderBarMenu = Array<{
  path?: string;
  key: string;
  name: string;
  icon?: React.LazyExoticComponent<
    OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    }
  >;
  sub?: SiderBarMenu;
}>;

const ChevronLeft = React.lazy(() => import("@mui/icons-material/ChevronLeft"));

const Close = React.lazy(() => import("@mui/icons-material/Close"));

const DashboardIcon = React.lazy(() => import("@mui/icons-material/Dashboard"));

const MiscellaneousServicesIcon = React.lazy(
  () => import("@mui/icons-material/MiscellaneousServices")
);

const PersonIcon = React.lazy(
  () => import("@mui/icons-material/PersonOutlineOutlined")
);

const AddBusinessOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/AddBusinessOutlined")
);

const SettingsOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/SettingsOutlined")
);

const ArticleOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/ArticleOutlined")
);

const PagesOutlinedIcon = React.lazy(
  () => import("@mui/icons-material/PagesOutlined")
);

const Drawer = styled(MuiDrawer)(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    backgroundColor: "#F4F4F4",
    color: theme.palette.text.secondary,
    position: "relative",
    whiteSpace: "nowrap",
    width: 240,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),

    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const menu: SiderBarMenu = [
  { path: "/admin", key: "dashboard", name: "Dashboard", icon: DashboardIcon },
  {
    path: "/admin/business-profile",
    key: "business-profile",
    name: "Profil Bisnis",
    icon: AddBusinessOutlinedIcon,
  },
  {
    path: "/admin/service",
    key: "service",
    name: "Layanan",
    icon: MiscellaneousServicesIcon,
  },
  {
    path: "/admin/user",
    key: "user",
    name: "Pengguna",
    icon: PersonIcon,
  },
  {
    path: "/admin/page",
    key: "page",
    name: "Halaman",
    icon: PagesOutlinedIcon,
  },
  {
    path: "/admin/article",
    key: "article",
    name: "Artikel",
    icon: ArticleOutlinedIcon,
  },
  {
    path: "/admin/setting",
    key: "setting",
    name: "Pengaturan",
    icon: SettingsOutlinedIcon,
  },
];

const SidebarMenu = () => {
  const { trigger, isMobile, onClickOpen } = useApp();

  return (
    <Drawer
      id="sidebar"
      variant={isMobile ? "temporary" : "permanent"}
      color="primary"
      open={trigger.open}
      slotProps={{
        root: {
          keepMounted: isMobile, // Better open performance on mobile.
        },
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: [1],

          height: {
            xs: 48,
          },
          minHeight: {
            xs: 48,
          },
        }}
      >
        <Typography sx={{ flexGrow: 1 }} align="center" fontWeight={500}>
          {trigger.open ? "Jasa Di Riau" : "JR"}
        </Typography>
        <IconButton
          size="small"
          color="primary"
          onClick={onClickOpen}
          sx={{ ...(!trigger.open ? { display: "none" } : undefined) }}
        >
          <React.Suspense fallback={<Loading />}>
            {isMobile ? (
              <Close fontSize="small" />
            ) : (
              <ChevronLeft fontSize="small" />
            )}
          </React.Suspense>
        </IconButton>
      </Toolbar>

      <div>
        <List component={"div"} sx={{ px: 1 }}>
          {menu.map(({ key, ...val }, i) => (
            <TooltipSidebarMenu key={key} keyPath={key} {...val} />
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default SidebarMenu;
