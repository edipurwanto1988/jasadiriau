import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { TextFieldProps } from "@mui/material/TextField";
import Box from "@mui/material/Box";

const SearchIcon = LoadComponent(() => import("@mui/icons-material/Search"));
const TextField = LoadComponent(() => import("@mui/material/TextField"));

const InputLargeSearch = (props?: TextFieldProps) => {
  return (
    <Box flexGrow={1}>
      <form>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Cari jasa atau penyedia jasa"
          size="medium"
          slotProps={{
            input: {
              startAdornment: <SearchIcon htmlColor="#4A739C" sx={{ mr: 1 }} />,
            },
          }}
          {...props}
        />
      </form>
    </Box>
  );
};

export default InputLargeSearch;
