import React from "react";
import HeadCell, { CellProps } from "./HeadCell";
import TableRow, { TableRowProps } from "@mui/material/TableRow";

export interface HeadRowProps {
  order?: "asc" | "desc";
  orderBy?: string;
  onOrder?: (value: string) => void;
  column: CellProps[];
  headRowProps?: TableRowProps;
}

const HeadRow = ({
  column,
  order,
  orderBy,
  onOrder,
  headRowProps,
}: HeadRowProps) => (
  <TableRow {...headRowProps}>
    {column.map((col, i: number) => (
      <HeadCell
        key={`th-${i}`}
        order={order}
        orderBy={orderBy}
        onOrder={onOrder}
        {...col}
      />
    ))}
  </TableRow>
);

export default HeadRow
