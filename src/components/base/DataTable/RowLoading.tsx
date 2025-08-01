import Skeleton from "@mui/material/Skeleton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { JSX } from "react";

const RowLoading = ({ count }: { count: number }): JSX.Element => {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <TableRow key={`row-${i}`}>
          {[...Array(count)].map((_, j) => (
            <TableCell
              key={`row-${i}_cell-${j}`}
              variant="body"
              sx={{ padding: "4px 8px" }}
            >
              <Skeleton variant="text" width="100%" height={24} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default RowLoading;
