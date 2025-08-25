"use client";
import React from "react";

import Stack from "@mui/material/Stack";
import LoadComponent from "../LoadComponent/LoadComponent";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import { dateFormat } from "@/utils/format";
import { useRouter } from "next/navigation";
import { notifUrl } from "@/views/services/notifcation.service";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Badge from "@mui/material/Badge";

const NotificationsOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/NotificationsOutlined")
);

type Props = {
  data?: INotification[];
};

const HeaderNotification = ({ data }: Props) => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClickNotif = (val: INotification) => () => {
    router.push(val.url);
    setAnchorEl(null)
    fetch(notifUrl.index, {
      method: "put",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ id: val.id }),
    });
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;
  return (
    <ClickAwayListener
      onClickAway={() => {
        setAnchorEl(null);
      }}
    >
      <Box
        sx={{
          borderRadius: "var(--mui-shape-borderRadius)",
          backgroundColor: "var(--input-bg-color)",
          minWidth: 40,
          minHeight: 40,
        }}
      >
        <IconButton onClick={handleClick} aria-describedby={id}>
          <Badge
            color="error"
            badgeContent={data?.length}
            invisible={!data?.length}
          >
            <NotificationsOutlinedIcon />
          </Badge>
        </IconButton>

        <Popper
          placement="bottom-end"
          id={id}
          open={open}
          anchorEl={anchorEl}
          sx={{ zIndex: 1201 }}
        >
          <Paper sx={{  width: 400 }}>
            <List dense>
              {!!data?.length ? (
                data.map((val, i) => (
                  <ListItemButton key={i} onClick={handleClickNotif(val)}>
                    <ListItemText
                      primary={val.title}
                      secondary={
                        <Stack component={"span"} direction={"column"}>
                          <Typography variant="caption" component={"span"}>
                            {val.message}
                          </Typography>

                          <Typography variant="caption" component={"span"}>
                            {dateFormat(val.createdAt, { time: true })}
                          </Typography>
                        </Stack>
                      }
                      slotProps={{
                        primary: {
                          variant: "body2",
                        },
                      }}
                    />
                  </ListItemButton>
                ))
              ) : (
                <ListItem>
                  <ListItemText
                    primary="Tidak ada pemberitahuan baru."
                    slotProps={{
                      primary: {
                        align: "center",
                      },
                    }}
                  />
                </ListItem>
              )}
            </List>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default HeaderNotification;
