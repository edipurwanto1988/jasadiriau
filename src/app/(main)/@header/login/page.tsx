import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Link } from "react-transition-progress/next";
import { getSetting } from "@/actions/setting.action";

export default async function Page() {
  const setting = await getSetting()
  return (
    <AppBar elevation={0} position="fixed" color="inherit">
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  );
}
