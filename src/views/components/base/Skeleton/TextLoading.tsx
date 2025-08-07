import { textLoading } from "@/utils/string";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const TextLoading = ({
  loading,
  pending,
}: {
  loading?: boolean;
  pending?: boolean;
}) => {
  return (
    <Fade in={loading || pending} unmountOnExit>
      <div>
        <Typography variant="body2" fontStyle={"italic"}>
          {textLoading(loading, pending)}
        </Typography>
      </div>
    </Fade>
  );
};

export default TextLoading;
