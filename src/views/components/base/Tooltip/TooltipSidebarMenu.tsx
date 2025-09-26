"use client";
import React from "react";

import { default as MUIListItemButton } from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import SvgIcon, { SvgIconTypeMap } from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useApp } from "@/views/contexts/AppContext";
import { styled } from "@mui/material/styles";
import { usePathname, useRouter } from "next/navigation";
import { SiderBarMenu } from "../Sidebar/SidebarMenu";
import Loading from "@/views/components/base/Skeleton/Spinner";
import ListItemText from "@mui/material/ListItemText";
import { useProgress } from "react-transition-progress";

const ListItemButton = styled(MUIListItemButton)(({}) => ({
  "&.Mui-selected": {
    backgroundColor: "rgba(255,255,255, 0.1)",
  },
}));

type Props = {
  path?: string;
  keyPath: string;
  name: string;
  icon?: React.LazyExoticComponent<
    OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    }
  >;
  sub?: SiderBarMenu;
};

const TooltipSidebarMenu = (props: Props) => {
  const { trigger } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const startProgress = useProgress();
  
  const paths = React.useMemo<string[]>(
    () => pathname.split("/").filter((v) => !!v),
    [pathname]
  );
  
  return (
    <Tooltip
      disableHoverListener={trigger.open}
      title={props.name}
      arrow
      placement="right"
    >
      <div>
        <ListItemButton
          // sx={{ height: "36px" }}
          selected={paths.at(paths.length - 1) === props.keyPath}
          onClick={(e) => {
            e.preventDefault();
            React.startTransition(() => {
              startProgress();
              router.push(props.path ?? "/");
            });
          }}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "#ccc",
            },
          }}
        >
          {props.icon ? (
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <React.Suspense fallback={<Loading />}>
                <SvgIcon
                  fontSize={trigger.open ? "small" : "medium"}
                  component={props.icon}
                  sx={{
                    // color: "white",
                    ...(!trigger.open
                      ? {
                          transform: "scale(1)",
                          transition: "all .5s",
                        }
                      : {
                          transform: "unset",
                          transition: "all .5s",
                        }),
                  }}
                />
              </React.Suspense>
            </ListItemIcon>
          ) : null}
          <ListItemText
            primary={props.name}
            slotProps={{
              primary: {
                fontWeight: 500,
                variant: "subtitle2",
              },
            }}
            sx={{
              ...(trigger.open ? { opacity: 1 } : { opacity: 0 }),
              transition: "all .35s ease",
            }}
          />
        </ListItemButton>
      </div>
    </Tooltip>
  );
};

export default TooltipSidebarMenu;
