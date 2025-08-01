import { styled } from "@mui/material/styles";
import TableCell, { TableCellProps } from "@mui/material/TableCell";

const InputCell = styled((props: TableCellProps) => {
  return (
    <TableCell contentEditable suppressContentEditableWarning {...props} />
  );
})(() => ({
  textAlign: "center",
  width: "100px",
  maxWidth: "100px",
  whiteSpace: "nowrap",
  overflow: "hidden",
}));

export default InputCell;
