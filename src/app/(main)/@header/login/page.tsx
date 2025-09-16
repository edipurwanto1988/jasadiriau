import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-transition-progress/next";
import { getSetting } from "@/actions/setting.action";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default async function Page() {
  const setting = await getSetting();
  return (
    <AppBar
      elevation={0}
      position="fixed"
      color="inherit"
      sx={{
        // borderBottom: 1,
        backgroundColor: "var(--bg-color)",
        // borderColor: "divider",
        zIndex: "calc(var(--mui-zIndex-drawer) + 1)",
      }}
    >
      <Toolbar sx={{ overflow: "hidden", px: 1 }}>
        <Stack
          flex={1}
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
          px={0}
        >
          <Stack
            direction={"row"}
            justifyContent={"flex-start"}
            alignItems={"center"}
            spacing={2}
          >
            <Box>
              <Link
                href="/"
                scroll={false}
                style={{
                  lineHeight: 1.57,
                  fontWeight: 900,
                  fontSize: 18,
                }}
              >
                {setting?.siteName ?? "JasaDiRiau"}
              </Link>
            </Box>
          </Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
