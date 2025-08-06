import { AppBar, Box, Stack, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <AppBar variant="elevation" elevation={0} color="transparent">
      <Toolbar
        sx={{ display: "flex", flexDirection: "row", justifyItems: "flex-end" }}
      >
        <Stack direction={"row"}>
          <div>
            <Typography variant="h6">Jasa Di Riau</Typography>
          </div>

          <Stack direction={"row"}></Stack>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
