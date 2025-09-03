"use client";
import React from "react";

import { default as MUIListItemButton } from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import SvgIcon, { SvgIconTypeMap } from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { useApp } from "@/views/contexts/AppContext";
import { usePathname, useRouter } from "next/navigation";
import { SiderBarMenu } from "../Sidebar/SidebarMenu";
import Loading from "@/views/components/base/Skeleton/Spinner";
import ListItemText from "@mui/material/ListItemText";
import { useProgress } from "react-transition-progress";

type Props = {
  path?: string;
  pathKey: string;
  name: string;
  icon?: React.LazyExoticComponent<
    OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
      muiName: string;
    }
  >;
  sub?: SiderBarMenu;
};

const TooltipAccountSidebarMenu = (props: Props) => {
  const startProgress = useProgress();
  const router = useRouter();
  const {
    trigger: { open },
    onClickOpen,
    addKey,
    clearKey,
  } = useApp();

  const pathname = usePathname();

  const paths = React.useMemo<string[]>(
    () => pathname.split("/").filter((v) => !!v),
    [pathname]
  );

  return (
    <Tooltip
      disableHoverListener={open}
      title={props.name}
      arrow
      placement="right"
    >
      <div>
        <MUIListItemButton
          selected={paths.includes(props.pathKey)}
          sx={{
            "&.Mui-selected": {
              backgroundColor: "var(--input-bg-color)",
              borderRadius: "var(--mui-shape-borderRadius)",
            },
          }}
          onClick={(e) => {
            e.preventDefault();
            React.startTransition(() => {
              startProgress();
              if (props.path) {
                clearKey();
                router.push(props.path, { scroll: false });
              } else {
                addKey(props.pathKey);
                if (!open) {
                  onClickOpen();
                }
              }
            });
          }}
        >
          {props.icon ? (
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <React.Suspense fallback={<Loading />}>
                <SvgIcon
                  fontSize={open ? "small" : "medium"}
                  component={props.icon}
                  sx={{
                    // color: "white",
                    ...(!open
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
              ...(open ? { opacity: 1 } : { opacity: 0 }),
              transition: "all .35s ease",
            }}
          />
        </MUIListItemButton>
      </div>
    </Tooltip>
  );
};

export default TooltipAccountSidebarMenu;
