"use client";
import React from "react";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import { usePopupState } from "@/views/hooks/usePopupState";
import Loading from "../Skeleton/Spinner";

const MoreVert = React.lazy(() => import("@mui/icons-material/MoreVert"));

export type DropdownProps = {
  buttonProps?: IconButtonProps;
  icon?: any;
  menu: Array<
    { text: React.ReactNode; onClick?: (e?:React.MouseEvent<HTMLLIElement, MouseEvent>) => void } & Omit<
      MenuItemProps,
      "children" | "onClick"
    >
  >;
};

const Dropdown = (props: DropdownProps) => {
  const id = React.useId();
  const { bindTrigger, bindPopup, ...popupState } = usePopupState();
  return (
    <>
      <IconButton
        size="small"
        {...bindTrigger}
        {...props.buttonProps}
        aria-controls={popupState.open ? id : undefined}
        aria-haspopup="true"
        aria-expanded={popupState.open ? "true" : undefined}
      >
        {props.icon ? (
          props.icon
        ) : (
          <React.Suspense fallback={<Loading />}>
            <MoreVert fontSize="inherit" />
          </React.Suspense>
        )}
      </IconButton>
      <Menu slotProps={{ list: { dense: true } }} {...bindPopup} id={id}>
        {!!props.menu.length
          ? props.menu.map(({ text, onClick, ..._menu }, i) => (
              <MenuItem
                key={i}
                {..._menu}
                onClick={(e) => {
                  if (onClick) {
                    onClick(e);
                  }
                  popupState.close();
                }}
              >
                {text}
              </MenuItem>
            ))
          : null}
      </Menu>
    </>
  );
};

export default Dropdown;
