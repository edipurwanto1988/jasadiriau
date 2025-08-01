'use client'
import React from "react";
import HeadRow, { HeadRowProps } from "./HeadRow";
import { CellProps } from "./HeadCell";
import TableHead from "@mui/material/TableHead";
import TableRow, { TableRowProps } from "@mui/material/TableRow";
import Table, { TableProps } from "@mui/material/Table";
import TableContainer, {
  TableContainerProps,
} from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import { TablePaginationProps } from "@mui/material/TablePagination";
import RowLoading from "./RowLoading";
import TableBody from "@mui/material/TableBody";
import styled from "@emotion/styled";
import {
  default as MuiTableCell,
  TableCellProps,
} from "@mui/material/TableCell";
import { TextFieldProps } from "@mui/material/TextField";
import { FilterCellProps } from "./FilterCell";
import FilterRow from "./FilterRow";
import * as use from "ezhooks/lib/utils";

const TablePagination = React.lazy(
  () => import("@mui/material/TablePagination")
);

export type ColumnProps<T> = CellProps & {
  filter?: Omit<FilterCellProps, "filterOptions">;
} & {
  value: (value: T, index?: number) => React.ReactNode;
} & TableCellProps;

export interface DataTableProps<T> extends Omit<HeadRowProps, "column"> {
  hover?: boolean;
  pagination?: TablePaginationProps;
  container?: TableContainerProps;
  row?: TableRowProps;
  filterOptions?: TextFieldProps;
  tableProps?: TableProps;
  column: ColumnProps<T>[];
  loading?: boolean;
  data: T[];
  emptyText?: string;
  selected?: (value: T) => boolean;
}

const TableCell = styled(MuiTableCell)(() => ({
  padding: "8px 16px",
}));

const DataTable = <T,>({
  loading,
  order,
  orderBy,
  column,
  data,
  onOrder,
  selected,
  emptyText,
  pagination,
  hover,
  container,
  row,
  headRowProps,
  tableProps,
  filterOptions,
}: DataTableProps<T>): React.JSX.Element => {
  const cdata = React.useMemo(
    () =>
      column.map((value) =>
        use.omit(value, ["head", "label", "sortKey", "filter"])
      ),
    [column, data]
  );

  const cfilter = React.useMemo(
    () => column.map((value) => value.filter),
    [column, data]
  );

  const chead = React.useMemo(
    () => column.map((value) => use.pick(value, ["label", "sortKey", "head"])),
    [column, data]
  );

  return (
    <TableContainer {...container}>
      <Table {...tableProps}>
        <TableHead>
          <HeadRow
            order={order}
            orderBy={orderBy}
            column={chead}
            onOrder={onOrder}
            headRowProps={headRowProps}
          />
          {!!cfilter.length && cfilter.some((v) => v !== undefined) ? (
            <FilterRow column={cfilter} filterOptions={filterOptions} />
          ) : null}
        </TableHead>

        <TableBody component={"tbody"}>
          {loading ? (
            <RowLoading count={column.length} />
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell variant="body" colSpan={column.length} align="center">
                {emptyText || "Data not available"}
              </TableCell>
            </TableRow>
          ) : (
            data.map((_data: T, i: number) => (
              <TableRow
                key={`row-${i}`}
                component="tr"
                hover={hover}
                selected={selected ? selected(_data) : undefined}
                {...row}
              >
                {cdata.map(({ value, ...col }, j) => (
                  <TableCell key={`row-${i}-cell-${j}`} {...col}>
                    {value(_data, i)}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>

        {pagination ? (
          <React.Suspense
            fallback={
              <tfoot>
                <tr>
                  <td colSpan={column.length}>loading....</td>
                </tr>
              </tfoot>
            }
          >
            <TableFooter>
              <TableRow>
                <TablePagination padding="none" size="small"  colSpan={column.length} {...pagination} />
              </TableRow>
            </TableFooter>
          </React.Suspense>
        ) : null}
      </Table>
    </TableContainer>
  );
};

export default DataTable
