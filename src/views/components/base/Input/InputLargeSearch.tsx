import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";

const SearchIcon = LoadComponent(() => import("@mui/icons-material/Search"));
const TextField = LoadComponent(() => import("@mui/material/TextField"));

const InputLargeSearch = (props?: TextFieldProps) => {
  return (
    <Box flexGrow={1}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Cari jasa atau penyedia jasa"
        size="medium"
        slotProps={{
          input: {
            sx: {
              minHeight: 40,
            },
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="primary" />
              </InputAdornment>
            ),
          },
        }}
        {...props}
      />
    </Box>
  );
};

export default InputLargeSearch;
