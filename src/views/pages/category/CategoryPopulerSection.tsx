import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const jasaList = [
  {
    title: "Jasa Pipa",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDgsphVa2gmB2ToL1_Zicg8ALMpi1-fbv-0hgYNL3h-1eakMuDgrc5ntGTmHkfZX5R99iGdE25Zrnk6-IT_C_s357WezIE7d5Z1pOs_NAXXNbGXCxHuiohJkoaLCHa3GGBJ3wq1nV-mv6hLQSxBzcCT5yQzt0XX5RyvoeWk3vGdMLRN-_B-oEijnB9nzo3u8FggvJ1RhcRlbqVV4sh7wck2JfaSA_akNK6xLEj1p5RJsNXqFXvijT91CPYBwgJE5V2R5PD9GwxwzJ7k",
  },
  {
    title: "Jasa Listrik",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDhRMKMC8_cOVamn02r00XUjJXEyqz5mM_BTvOzPStc39kxSRhRAj7uxJGf_tHP9tCqT2qj6YmtJKMk-74PaXDZbCdnrsqoT_O2a2GK2ImK0r0aIVksWaAecAqRxmIJgo-NL488VP2hioVLTfT6bHtPZGePnNdMBFMJ4KhO699h-_3I5BYTaNrFL7EaMZCk5svUPHXOxhvzEoumBwRBVOvydZ5cXtPCMX3OglEg49K7MMVtcY3S2cJaEuo9Ga0bfQeW9mioqAyhxHnG",
  },
  {
    title: "Jasa Kebersihan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCtFBSqjkfzTI2rdVe-sS5yeSA_GzmgM2HzvZiS3quPQ_J-qxBTctmn42F-L0-X-kvYl4z88BqBurVDJOMmCCb0kzgjjQbBoEfKk0TPudFW3JEFawONkyvbY74oM02Y-elEF6PN1gwNYQqFgvYhi4BGLF5fQ03FaB3fPqzQ7HEw1iJAThJ4SMo6zUuvocxgAfKZHojTMUtJh-s7C4ZvSorMOFaXUcVJHZPWK9ySciLg1bg9euA4l9osdNICYBGvoFpMxiwkV9lV6tbO",
  },
  {
    title: "Jasa Pertamanan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB28uac8lAPOsc1TkBFPB1hp2q7PCxk2q4zZjmZ_wLvybEiq-hoL7gPKphPPdUuM6xB8xE-7loLlD6WMG7lJNpLUwrQQZ5dwGuQDj243IpAqTYkgAcdiCWIn088dTH7Gc0jxegiKjMfjgpsOjNqEQGyl-1lAxLom727y07a-x0DzJQWHV28gGYT6orPqxki6pdqO8_xWanzGUw96o-g-l-6r-Oh6MbJRbzYQgBiRsVQEMAdNxhJCAokkJhxcjOluaQ5V5sOVvtQyuR-",
  },
  {
    title: "Jasa Perbaikan Rumah",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYIuHkyzuA3Jd6JvEd9aN-FChep-Vnvv3rg8qChO_MQYnFM75CfDDKxy7Tvmos_sbLHXhigdCVRfB3xqH-c0nart7rF1QcGuTMvfZRYmi5wvW6rV8BNPPUKlFNYyxQadmvVVBsmP55PyYE6fiFHciYEU24TrWlyt7vrrxN2A-7JWcR9pAHHkxwe4OMDFr_wzPWDrnIsHGv21omsaLy8lwLY7D59AjI18toyr9HtYA4b8oVVWBxTGtdkE02y5MukvTDCcJqthLb5GYQ",
  },
  {
    title: "Jasa Perawatan Hewan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChOR1M5xijyjniSYtlqfiC-5SPa-1D6XndpGpUHhctBArpbQtusCXvranHrzDFi1Hrd4pmYOvEEogaEWqnDVS4lWC-sP5MisVE3s437Yhsc8Baex0iGh9d7FOOrCcOtFWLm3txU6YID-11OH9JawUkTf2E01vaEseRPzggzK7JS70q9lqcRQNUq7p0QzHGX8Bi1ukc1bquMsuVCkR1NZvdIfG1cy25Wb38iQ3Br4BvA-y4tvbqLcEJGwl1TkohGcnVgQYTGsxdKBwt",
  },
  {
    title: "Jasa Pertamanan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB28uac8lAPOsc1TkBFPB1hp2q7PCxk2q4zZjmZ_wLvybEiq-hoL7gPKphPPdUuM6xB8xE-7loLlD6WMG7lJNpLUwrQQZ5dwGuQDj243IpAqTYkgAcdiCWIn088dTH7Gc0jxegiKjMfjgpsOjNqEQGyl-1lAxLom727y07a-x0DzJQWHV28gGYT6orPqxki6pdqO8_xWanzGUw96o-g-l-6r-Oh6MbJRbzYQgBiRsVQEMAdNxhJCAokkJhxcjOluaQ5V5sOVvtQyuR-",
  },
  {
    title: "Jasa Perbaikan Rumah",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAYIuHkyzuA3Jd6JvEd9aN-FChep-Vnvv3rg8qChO_MQYnFM75CfDDKxy7Tvmos_sbLHXhigdCVRfB3xqH-c0nart7rF1QcGuTMvfZRYmi5wvW6rV8BNPPUKlFNYyxQadmvVVBsmP55PyYE6fiFHciYEU24TrWlyt7vrrxN2A-7JWcR9pAHHkxwe4OMDFr_wzPWDrnIsHGv21omsaLy8lwLY7D59AjI18toyr9HtYA4b8oVVWBxTGtdkE02y5MukvTDCcJqthLb5GYQ",
  },
  {
    title: "Jasa Perawatan Hewan",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuChOR1M5xijyjniSYtlqfiC-5SPa-1D6XndpGpUHhctBArpbQtusCXvranHrzDFi1Hrd4pmYOvEEogaEWqnDVS4lWC-sP5MisVE3s437Yhsc8Baex0iGh9d7FOOrCcOtFWLm3txU6YID-11OH9JawUkTf2E01vaEseRPzggzK7JS70q9lqcRQNUq7p0QzHGX8Bi1ukc1bquMsuVCkR1NZvdIfG1cy25Wb38iQ3Br4BvA-y4tvbqLcEJGwl1TkohGcnVgQYTGsxdKBwt",
  },
];

const CategoryPopulerSection = () => {
  return (
    <Stack
      sx={{
        p: 2,
        width: "100%",
        overflow:"auto hidden"
      }}
      spacing={4}
    >
      <Box>
        <Typography
          fontWeight={700}
          fontSize={22}
          lineHeight={1.25}
          letterSpacing={"-0.015em"}
        >
          Kategori Jasa Populer
        </Typography>
      </Box>

      <Stack
        direction={"row"}
        alignItems={"stretch"}
        gap={"12px"}
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 176px)",
          width: "100%",
          gap: "12px",
        }}
      >
        {jasaList.map((value, i) => (
          <Stack key={i} flexShrink={0} spacing={2}>
            <Box
              sx={{
                overflow: "hidden",
                borderRadius: "var(--mui-shape-borderRadius)",
                position: "relative",
                backgroundImage: `url(${value.image})`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                aspectRatio: "1/1",
                width: 176,
                height: 176,
              }}
            ></Box>
            <Box>
              <Typography fontWeight={500}>{value.title}</Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default CategoryPopulerSection;
