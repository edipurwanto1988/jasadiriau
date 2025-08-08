"use client";
import { ccFormat } from "@/utils/format";
import { statusActiveLabel, ucwords } from "@/utils/string";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Image from "next/image";
import Skeleton from "@mui/material/Skeleton";

const LanguageIcon = LoadComponent(
  () => import("@mui/icons-material/Language")
);

const WhatsAppIcon = LoadComponent(
  () => import("@mui/icons-material/WhatsApp")
);

const AlternateEmailIcon = LoadComponent(
  () => import("@mui/icons-material/AlternateEmail")
);

const PersonIcon = LoadComponent(() => import("@mui/icons-material/Person"));

const CallIcon = LoadComponent(() => import("@mui/icons-material/Call"));

const PlaceIcon = LoadComponent(() => import("@mui/icons-material/Place"));

const PendingActionsIcon = LoadComponent(
  () => import("@mui/icons-material/PendingActions")
);

const CheckCircleOutlineIcon = LoadComponent(
  () => import("@mui/icons-material/CheckCircleOutline")
);

const BlockIcon = LoadComponent(() => import("@mui/icons-material/Block"));

type Props = {
  loading?: boolean;
  data: BusinessProfile;
};

const Overview = ({ loading, data }: Props) => {
  return (
    <>
      <Card square variant="outlined" sx={{ width: "100%" }}>
        <CardContent>
          <Stack spacing={4} direction={"column"}>
            <Stack direction={"row"} alignItems={"center"} spacing={2}>
              <Avatar variant="rounded" />
              <Box flexGrow={1} minHeight={"24px"}>
                {loading ? (
                  <Skeleton height={"20px"} />
                ) : (
                  <Typography variant="h6">{data.businessName}</Typography>
                )}
              </Box>
            </Stack>

            <Stack direction={"column"} spacing={1}>
              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                {data.status === "active" ? (
                  <CheckCircleOutlineIcon fontSize="small" />
                ) : data.status === "pending" ? (
                  <PendingActionsIcon fontSize="small" />
                ) : (
                  <BlockIcon fontSize="small" />
                )}
                <Box flexGrow={1} minHeight={"24px"}>
                  {loading ? (
                    <Skeleton height={"20px"} />
                  ) : (
                    <Typography>{statusActiveLabel(data.status)}</Typography>
                  )}
                </Box>
              </Stack>

              <Stack direction={"row"} spacing={1} alignItems={"center"}>
                <PlaceIcon fontSize="small" />
                <Box flexGrow={1} minHeight={"24px"}>
                  {loading ? (
                    <Skeleton height={"20px"} />
                  ) : (
                    <Typography>{data.address}</Typography>
                  )}
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card square variant="outlined" sx={{ width: "100%" }}>
        <CardHeader
          title="Akun Pengguna"
          slotProps={{
            title: {
              variant: "subtitle1",
            },
          }}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        />

        <CardContent>
          <Stack spacing={2} direction={"column"}>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <PersonIcon fontSize="small" />
              <Box flexGrow={1} minHeight={"24px"}>
                {loading ? (
                  <Skeleton height={"20px"} />
                ) : (
                  <Typography>{data.user?.name}</Typography>
                )}
              </Box>
            </Stack>

            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <CallIcon fontSize="small" />
              <Box flexGrow={1} minHeight={"24px"}>
                {loading ? (
                  <Skeleton height={"20px"} />
                ) : (
                  <Typography>{ccFormat("085274776243")}</Typography>
                )}
              </Box>
            </Stack>

            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <AlternateEmailIcon fontSize="small" />
              <Box flexGrow={1} minHeight={"24px"}>
                {loading ? (
                  <Skeleton height={"20px"} />
                ) : (
                  <Typography>{data.user?.email}</Typography>
                )}
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Card square variant="outlined" sx={{ width: "100%" }}>
        <CardHeader
          title="Hubungi Kami"
          slotProps={{
            title: {
              variant: "subtitle1",
            },
          }}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        />

        <CardContent>
          <Stack spacing={2}>
            <Stack direction={"row"} spacing={2}>
              {(data.businessContact ?? []).map((val) => (
                <Stack
                  key={val.whatsappNumber}
                  direction={"row"}
                  spacing={1}
                  alignItems={"center"}
                >
                  <WhatsAppIcon fontSize="small" />
                  <Box>
                    <Link href={``} fontFamily={"Inter"} target="_blank">
                      {ccFormat(val.whatsappNumber)}
                    </Link>
                  </Box>
                </Stack>
              ))}
            </Stack>
            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <LanguageIcon fontSize="small" />
              <Box flexGrow={1} minHeight={"24px"}>
                {loading ? (
                  <Skeleton height={"20px"} />
                ) : (
                  <Link
                    href={data.websiteUrl ?? "#"}
                    fontFamily={"Inter"}
                    target="_blank"
                  >
                    Website
                  </Link>
                )}
              </Box>
            </Stack>
            <Stack direction={"row"} spacing={2}>
              {(data.businessSocial ?? [])
                .filter((v) => !!v.url)
                .map((val) => (
                  <Stack
                    key={val.platform}
                    direction={"row"}
                    spacing={1}
                    alignItems={"center"}
                  >
                    <Image
                      src={`/icons/${val.platform}.svg`}
                      alt={val.platform}
                      width={20}
                      height={20}
                      loading="lazy"
                    />
                    <Box>
                      <Link
                        href={data.websiteUrl ?? "#"}
                        target="_blank"
                        fontFamily={"Inter"}
                      >
                        {ucwords(val.platform)}
                      </Link>
                    </Box>
                  </Stack>
                ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default Overview;
