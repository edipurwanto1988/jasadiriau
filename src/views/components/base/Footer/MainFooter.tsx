import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { getSetting } from "@/actions/setting.action";
import { getFooter } from "@/actions/menu.action";
import { Link } from "react-transition-progress/next";
import Divider from "@mui/material/Divider";

const MainFooter = async () => {
  const [setting, menus] = await Promise.all([getSetting(), getFooter()]);
  return (
    <footer>
      <Box
        sx={{
          px: {
            xs: 0,
            sm: 0,
            md: 10,
            lg: 20,
            xl: 20,
          },
          pb: 1,
        }}
      >
        <Toolbar />
        <Divider />
        <Stack spacing={4} py={2}>
          <Stack
            pt={2}
            direction={{
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
              xl: "row",
            }}
            justifyContent={"space-around"}
            alignItems={"center"}
            spacing={{
              xs: 2,
              sm: 2,
              md: 0,
              lg: 0,
              xl: 0,
            }}
          >
            {menus.map((v) => (
              <Link
                key={v.id}
                href={v.url ?? ""}
                style={{ textAlign: "center" }}
                color="#4A739C"
              >
                {v.name}
              </Link>
            ))}
          </Stack>

          <Stack direction={"row"} justifyContent={"center"} spacing={2}>
            {setting?.facebookUrl ? (
              <Link target="_blank" prefetch={false} href={setting.facebookUrl}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/facebook.svg`}
                  alt={"facebook"}
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </Link>
            ) : null}

            {setting?.instagramUrl ? (
              <Link
                target="_blank"
                prefetch={false}
                href={setting.instagramUrl}
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/instagram.svg`}
                  alt={"instagram"}
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </Link>
            ) : null}

            {setting?.twitterUrl ? (
              <Link target="_blank" prefetch={false} href={setting.twitterUrl}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/twitter.svg`}
                  alt={"twitter"}
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </Link>
            ) : null}

            {setting?.youtubeUrl ? (
              <Link target="_blank" prefetch={false} href={setting.youtubeUrl}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/youtube.svg`}
                  alt={"youtube"}
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </Link>
            ) : null}

            {setting?.linkedinUrl ? (
              <Link target="_blank" prefetch={false} href={setting.linkedinUrl}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/linkedin.svg`}
                  alt={"linkedin"}
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </Link>
            ) : null}

            {setting?.whatsappUrl ? (
              <Link target="_blank" prefetch={false} href={setting.whatsappUrl}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_BASE_URL}/icons/whatsapp.svg`}
                  alt={"whatsapp"}
                  width={24}
                  height={24}
                  loading="lazy"
                />
              </Link>
            ) : null}
          </Stack>
          <Box>
            <Typography
              fontWeight={400}
              color="#4A739C"
              lineHeight="24px"
              align="center"
            >
              © {new Date().getFullYear()} {setting?.siteName ?? "JasaDiRiau"}.
              All rights reserved.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </footer>
  );
};

export default MainFooter;
