"use client"
import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import { formatIndoPhone, rupiah } from "@/utils/format";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import CategoryChip from "@/views/components/base/Chip/CategoryChip";
import ILink from "@/views/components/base/Link/ILink";
import Box from "@mui/material/Box";
import { getServiceByCategory } from "@/actions/service.action";

const WhatsAppIcon = LoadComponent(
  () => import("@mui/icons-material/WhatsApp")
);

type Props = {
  loading?: boolean;
  data: Awaited<ReturnType<typeof getServiceByCategory>>["data"][0];
};

const ServiceSimpleCard = ({ loading, data }: Props) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 2,
      }}
    >
      <Stack flexGrow={1} direction={"column"} spacing={1.5}>
        <Box>
          <ListItemText
            primary={
              loading ? (
                <Skeleton width={"80%"} />
              ) : (
                <ILink
                  href={`/jasa/${data.slug}`}
                  prefetch={false}
                  scroll={false}
                  style={{ color: "var(--blue-color)" }}
                >
                  {data?.name ?? "-"}
                </ILink>
              )
            }
            slotProps={{
              primary: {
                variant: "subtitle2",
                letterSpacing: -0.5,
              },
            }}
          />
        </Box>

        <Stack direction={"row"} spacing={1}>
          {loading ? <Skeleton width={"40%"} /> : <CategoryChip label="Jasa" />}

          {loading ? (
            <Skeleton width={"40%"} />
          ) : (
            <CategoryChip label={data.category.name} />
          )}
        </Stack>

        {/* {loading ? (
          <Skeleton width={"100%"} />
        ) : (
          <Typography component={"div"} variant="caption">
            {`${data?.locations.at(0)?.provinceName ?? ""}, ${
              data?.locations.at(0)?.regencyName ?? ""
            }, ${data?.locations.at(0)?.districtName ?? ""}`}
          </Typography>
        )} */}

        {loading ? (
          <Skeleton width={"40%"} />
        ) : (
          data.businessProfile.BusinessContact.filter((_, i) => i === 0).map(
            (contact, i) => (
              <Stack
                key={i}
                direction={"row"}
                alignItems={"center"}
                spacing={0.5}
              >
                <WhatsAppIcon fontSize="small" />

                <Typography
                  component={"div"}
                  variant="caption"
                  fontWeight={500}
                >
                  {formatIndoPhone(contact.whatsappNumber)}
                </Typography>
              </Stack>
            )
          )
        )}
      </Stack>

      <Stack direction={"row"} justifyContent={"flex-end"} spacing={0.5}>
        {loading ? (
          <Skeleton width={"50%"} />
        ) : (
          <Typography variant="subtitle2">{rupiah(data?.price)}</Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default ServiceSimpleCard;
