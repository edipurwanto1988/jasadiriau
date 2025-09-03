"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-transition-progress/next";
import Box from "@mui/material/Box";
import { typeSearch } from "@/utils/string";
import { formatIndoPhone, rupiah } from "@/utils/format";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import CategoryChip from "@/views/components/base/Chip/CategoryChip";

const WhatsAppIcon = LoadComponent(
  () => import("@mui/icons-material/WhatsApp")
);

type Props = {
  loading?: boolean;
  data?: SearchList;
};

const CardSearch = ({ loading, data }: Props) => {
  return (
    <Box>
      <Paper
        variant="outlined"
        sx={{
          p: 2,
          position: "relative",
        }}
      >
        <Stack direction={"column"} spacing={1}>
          <ListItemText
            primary={
              loading ? (
                <Skeleton width={"80%"} />
              ) : (
                <Link
                  href={
                    data?.type === "profile"
                      ? `/penyedia-jasa/${data?.slug}`
                      : `/jasa/${data?.slug}`
                  }
                  prefetch={false}
                  style={{ color: "var(--blue-color)" }}
                >
                  {data?.name ?? "-"}
                </Link>
              )
            }
            slotProps={{
              primary: {
                variant: "subtitle2",
                letterSpacing: -0.5,
              },
            }}
          />

          <Stack direction={"row"} spacing={1}>
            {loading ? (
              <Skeleton width={"40%"} />
            ) : (
              <CategoryChip label={typeSearch(data?.type)} />
            )}

            {loading ? (
              <Skeleton width={"40%"} />
            ) : data?.categoryName ? (
              <CategoryChip label={data.categoryName} />
            ) : null}
          </Stack>
          {loading ? (
            <Skeleton width={"100%"} />
          ) : (
            <Typography component={"div"} variant="caption">
              {`${data?.locations.at(0)?.provinceName ?? ""}, ${
                data?.locations.at(0)?.regencyName ?? ""
              }, ${data?.locations.at(0)?.districtName ?? ""}`}
            </Typography>
          )}

          {loading ? (
            <Skeleton width={"40%"} />
          ) : (
            data?.contacts
              .filter((_, i) => i === 0)
              .map((contact, i) => (
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
                    {formatIndoPhone(contact.whatsapp)}
                  </Typography>
                </Stack>
              ))
          )}

          <Stack direction={"row"} justifyContent={"flex-end"} spacing={0.5}>
            {loading ? (
              <Skeleton width={"50%"} />
            ) : (
              <Typography variant="subtitle2">{rupiah(data?.price)}</Typography>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};

export default CardSearch;
