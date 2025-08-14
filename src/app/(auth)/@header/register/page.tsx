import AppBar from "@mui/material/AppBar";
import Link from "@mui/material/Link";
import Toolbar from "@mui/material/Toolbar";

export default async function Page() {
  return (
    <AppBar elevation={0} color="transparent">
      <Toolbar>
        <Link
          fontWeight={900}
          fontSize={18}
          href=""
          underline="none"
          color="text.primary"
          variant="subtitle1"
        >
          Jasa di Riau
        </Link>
      </Toolbar>
    </AppBar>
  );
}
