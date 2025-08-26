import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { getSetting } from "@/actions/setting.action";
import { getFooter } from "@/actions/menu.action";

const MainFooter = async () => {
  const [setting, menus] = await Promise.all([getSetting(), getFooter()]);
  return (
    <footer>
      <Box sx={{ px: 20, pb:1 }}>
        <Toolbar />
        <Stack spacing={4}>
          <Stack
            direction={"row"}
            justifyContent={"space-around"}
            alignItems={"center"}
          >
            {menus.map((v) => (
              <Link
                key={v.id}
                href={v.url}
                align="center"
                fontWeight={400}
                color="#4A739C"
                lineHeight="24px"
                fontFamily={"var(--font-plus-jakarta-sans)"}
                underline="none"
              >
                {v.name}
              </Link>
            ))}
          </Stack>
          <Stack direction={"row"} justifyContent={"center"} spacing={2}>
            {setting?.facebookUrl ? (
              <Link target="_blank" href={setting.facebookUrl} underline="none">
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
                href={setting.instagramUrl}
                underline="none"
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
              <Link target="_blank" href={setting.twitterUrl} underline="none">
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
              <Link target="_blank" href={setting.youtubeUrl} underline="none">
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
              <Link target="_blank" href={setting.linkedinUrl} underline="none">
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
              <Link
                target="_blank"
                href={setting.whatsappUrl}
                underline="none"
              >
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
              © {new Date().getFullYear()} ServiceFinder. All rights reserved.
            </Typography>
          </Box>
        </Stack>
      </Box>
    </footer>
  );
};

export default MainFooter;
