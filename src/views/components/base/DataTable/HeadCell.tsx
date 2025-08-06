import React from "react";
import Box from "@mui/material/Box";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import Typography, { TypographyProps } from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";
import * as use from "ezhooks/lib/utils";

export type IHead = Omit<TableCellProps, "sortDirection" | "id"> & {
  noWrap?: boolean;
  disabledTypography?: boolean;
  typographyProps?: TypographyProps;
};

export interface HeadCellProps {
  sortKey?: string;
  label: React.ReactNode;
  order?: "asc" | "desc";
  orderBy?: string;
  head?: IHead;
  onOrder?: (value: string) => void;
}

export type CellProps = Omit<HeadCellProps, "order" | "orderBy" | "onOrder">;

const HeadCell = ({
  sortKey,
  label,
  order,
  orderBy,
  head,
  onOrder,
}: HeadCellProps) => {
  let disabledTypography: any = false;
  let noWrap: any = true;
  let otherHead: TableCellProps = {};
  let typographyProps: TypographyProps = {};

  if (head) {
    const {
      noWrap: no,
      disabledTypography: disabled,
      typographyProps: typoProps,
      ...other
    } = head;
    noWrap = no;
    disabledTypography = disabled;
    otherHead = other;
 if(typoProps){
     typographyProps = typoProps;
 }
  }

  return (
    <TableCell
      variant="head"
      {...use.omit(otherHead, ["sx"])}
      sx={{
        ...(otherHead.sx ? otherHead.sx : undefined),
        ...(noWrap ? { whiteSpace: "nowrap" } : undefined),
      }}
    >
      {sortKey && orderBy && onOrder ? (
        <TableSortLabel
          active={orderBy === sortKey || false}
          direction={order}
          onClick={() => {
            onOrder(sortKey);
          }}
        >
          {disabledTypography ? (
            label
          ) : (
            <Typography
              variant="inherit"
              noWrap={noWrap}
              fontWeight={600}
              {...typographyProps}
              whiteSpace={noWrap ? "nowrap" : "normal"}
            >
              {label}
            </Typography>
          )}

          {orderBy && orderBy === sortKey ? (
            <Box component="span" sx={visuallyHidden}>
              {order === "desc" ? "sortKeyed descending" : "sorted ascending"}
            </Box>
          ) : null}
        </TableSortLabel>
      ) : disabledTypography ? (
        label
      ) : (
        <Typography
          variant="inherit"
          noWrap={noWrap}
          fontWeight={600}
          {...typographyProps}
        >
          {label}
        </Typography>
      )}
    </TableCell>
  );
};

export default HeadCell;
