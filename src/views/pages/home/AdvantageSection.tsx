import { getAdvantage } from "@/actions/advantage.action";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const AdvantageSection = async () => {
  const data = await getAdvantage();
  return (
    <Stack
      sx={{
        p: 2,
        width: "100%",
        overflow: "hidden",
      }}
      spacing={5}
    >
      <Box>
        <Typography fontWeight={500} fontSize={22} lineHeight={"28px"}>
          Mengapa Memilih Kami?
        </Typography>
      </Box>

      <ListItemText
        primary="Keunggulan ServiceFinder"
        secondary="Kami berkomitmen untuk memberikan pengalaman terbaik bagi pengguna dalam mencari dan menggunakan jasa."
        slotProps={{
          primary: {
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: "-1px",
            lineHeight: "48px",
          },
          secondary: {
            color: "textPrimary",
            fontSize: 16,
            fontWeight: 400,
            letterSpacing: 0,
            lineHeight: "24px",
            maxWidth: 720,
            sx: {
              mt: 2,
            },
          },
        }}
      />

      <Stack
        direction="row"
        sx={{
          overflow: "auto hidden",
          width: "100%",
          flexWrap: "wrap",
          gap: "16px",
        }}
        style={{ ["--gap" as any]: "16px" }}
      >
        {data.map((value, i) => (
          <Paper
            key={i}
            variant="outlined"
            sx={{
              flex: "0 0 calc((100% / 3) - ( (2 * var(--gap)) / 3 ))",
              maxWidth: "calc((100% / 3) - ( (2 * var(--gap)) / 3 ))",
              boxSizing: "border-box",
              padding: "16px",
              borderRadius: "var(--mui-shape-borderRadius)",
              borderColor: "#cedbe8",
              display: "flex",
              flexDirection: "column",
              gap: 0.5,
              minHeight: "80px",
              "@media (max-width: 1024px)": {
                flex: "0 0 calc((100% / 2) - ( (1 * var(--gap)) / 2 ))",
                maxWidth: "calc((100% / 2) - ( (1 * var(--gap)) / 2 ))",
              },
              "@media (max-width: 640px)": {
                flex: "0 0 100%",
                maxWidth: "100%",
              },
            }}
          >
            <Box>
              <Typography
                lineHeight={1.25}
                fontWeight={700}
                alignSelf={"stretch"}
              >
                {value.title}
              </Typography>
            </Box>

            <Box>
              <Typography
                lineHeight={1.5}
                fontWeight={400}
                variant="subtitle2"
                color="#4A739C"
                alignSelf={"stretch"}
              >
                {value.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Stack>
    </Stack>
  );
};

export default AdvantageSection;
