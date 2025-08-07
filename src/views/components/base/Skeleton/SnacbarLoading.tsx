import { textLoading } from "@/utils/string";
import Snackbar from "@mui/material/Snackbar";

const SnacbarLoading = ({
  loading,
  pending,
}: {
  loading?: boolean;
  pending?: boolean;
}) => {
  return (
    <Snackbar
      open={loading || pending}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      message={textLoading(loading, pending)}
    />
  );
};

export default SnacbarLoading;
