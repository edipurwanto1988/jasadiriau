"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import { formatIndoPhone } from "@/utils/format";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import CategoryChip from "@/views/components/base/Chip/CategoryChip";
import ILink from "@/views/components/base/Link/ILink";
import Box from "@mui/material/Box";
import { getBusinessPaginate } from "@/actions/business-profile.action";

const WhatsAppIcon = LoadComponent(
  () => import("@mui/icons-material/WhatsApp")
);

type Props = {
  loading?: boolean;
  data: Awaited<ReturnType<typeof getBusinessPaginate>>["data"][0];
};

const BusinessSimpleCard = ({ loading, data }: Props) => {
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
                  href={`/penyedia-jasa/${data.slug}`}
                  prefetch={false}
                  style={{ color: "var(--blue-color)" }}
                >
                  {data.businessName ?? "-"}
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

        <CategoryChip label="Penyedia Jasa" />

        {loading ? (
          <Skeleton width={"100%"} />
        ) : (
          <Typography component={"div"} variant="subtitle2">
            Lokasi ({data.BusinessLocation.length})
          </Typography>
        )}

        {loading ? (
          <Skeleton width={"40%"} />
        ) : (
          data.BusinessContact.filter((_, i) => i === 0).map((contact, i) => (
            <Stack
              key={i}
              direction={"row"}
              alignItems={"center"}
              spacing={0.5}
            >
              <WhatsAppIcon fontSize="small" />

              <Typography component={"div"} variant="caption" fontWeight={500}>
                {formatIndoPhone(contact.whatsappNumber)}
              </Typography>
            </Stack>
          ))
        )}
      </Stack>
    </Paper>
  );
};

export default BusinessSimpleCard;
