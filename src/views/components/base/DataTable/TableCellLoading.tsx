import Skeleton from "@mui/material/Skeleton";
import TableCell, { TableCellProps } from "@mui/material/TableCell";

type Props = TableCellProps & { loading: boolean };

const TableCellLoading = ({ loading, ...props }: Props) => {
  return (
    <TableCell {...props}>
      {loading ? <Skeleton width={"100%"} variant="text" /> : props.children}
    </TableCell>
  );
};

export default TableCellLoading;
