import React from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Skeleton from "@mui/material/Skeleton";
import ListItemText from "@mui/material/ListItemText";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";

type Props = {
  data: BusinessLocation[];
  loading?: boolean;
};

const ShareLocationOutlinedIcon = LoadComponent(() => import('@mui/icons-material/ShareLocationOutlined'));

const BusinessLocationlItem = ({ data, loading }: Props) => {
  return (
    <Stack direction={"column"} spacing={3} py={2}>
      <Stack direction={"row"} alignItems={"center"} spacing={1}>
        {/* <ShareLocationOutlinedIcon/> */}
        <Typography fontWeight={700} fontSize={22}>Alamat Cabang</Typography>
      </Stack>

      <Fade in={loading} unmountOnExit>
        <Stack direction={"row"} justifyContent={"space-between"} spacing={2}>
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
        </Stack>
      </Fade>

      <Fade in={!data.length && !loading} unmountOnExit>
        <Box>
          <Typography>Belum ada lokasi.</Typography>
        </Box>
      </Fade>

      <Stack direction={"column"} spacing={2}>
        {data.map((v, i) => (
          <ListItemText
            key={i}
            primary={v.address || "-"}
            secondary={`${v.districtName}, ${v.regencyName}, ${v.provinceName}`}
            slotProps={{
              primary: {
                variant: "subtitle2",
                color: "textPrimary",
              },
              secondary: {
                variant: "subtitle2",
                color: "textPrimary",
              },
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
};

export default BusinessLocationlItem;
