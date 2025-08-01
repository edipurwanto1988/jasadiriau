"use client";
import React from "react";
import HeadRow, { HeadRowProps } from "./HeadRow";
import { CellProps } from "./HeadCell";
import TableHead from "@mui/material/TableHead";
import TableRow, { TableRowProps } from "@mui/material/TableRow";
import Table, { TableProps } from "@mui/material/Table";
import TableContainer, {
  TableContainerProps,
} from "@mui/material/TableContainer";
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
import * as utils from "ezhooks/lib/utils";
import Toolbar from "@mui/material/Toolbar";
import LoadComponent from "../LoadComponent/LoadComponent";

const TablePagination = LoadComponent(
  () => import("@mui/material/TablePagination")
);

export type ColumnProps<T> = CellProps & {
  filter?: Omit<FilterCellProps, "filterOptions">;
} & {
  value: (value: T, index?: number) => React.ReactNode;
  noWrap?: boolean;
} & TableCellProps;

export interface DataTablePageProps<T> extends Omit<HeadRowProps, "column"> {
  hover?: boolean;
  pagination?: TablePaginationProps;
  container?: TableContainerProps;
  row?: TableRowProps;
  filterOptions?: TextFieldProps;
  tableProps?: TableProps;
  column: ColumnProps<T>[];
  loading?: boolean;
  data: T[];
  emptyText?: React.ReactNode;
  emptyCellText?: string;
  responsive?: boolean;
  renderSmallView?: (
    value: T
  ) => TableCellProps & { headProps?: TableCellProps };
  selected?: (value: T) => boolean;
}

const TableCell = styled(MuiTableCell)(() => ({
  padding: "8px 16px",
}));

const DataTablePage = <T,>({
  loading,
  order,
  orderBy,
  column,
  data,
  onOrder,
  selected,
  emptyText,
  emptyCellText,
  pagination,
  hover,
  container,
  row,
  headRowProps,
  tableProps,
  filterOptions,
  responsive,
  renderSmallView,
}: DataTablePageProps<T>): React.JSX.Element => {
  const cdata = React.useMemo(
    () =>
      column.map((value) =>
        utils.omit(value, ["head", "label", "sortKey", "filter"])
      ),
    [column, data]
  );

  const cfilter = React.useMemo(
    () => column.map((value) => value.filter),
    [column, data]
  );

  const chead = React.useMemo(
    () =>
      column.map((value) => utils.pick(value, ["label", "sortKey", "head"])),
    [column, data]
  );

  return (
    <TableContainer
      {...container}
      sx={{
        flexGrow: 1,
        position: "relative",
        height: "100vh",
        ...(container && container.sx ? { ...container.sx } : undefined),
      }}
    >
      <Table
        stickyHeader
        {...tableProps}
        sx={{
          "& thead > tr > th": {
            backgroundColor: "#f5f5f5",
            whiteSpace: "nowrap",
          },
          "& tbody > tr": {
            opacity: 0,
            animation: "fadein 1s forwards",
          },
          "@keyframes fadein": {
            to: {
              opacity: 1,
            },
          },
          ...(tableProps && tableProps.sx ? { ...tableProps.sx } : undefined),
        }}
      >
        {responsive ? null : (
          <TableHead sx={{ position: "sticky", top: 0, zIndex: 1 }}>
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
        )}

        <TableBody component={"tbody"}>
          {loading ? (
            <RowLoading count={responsive ? 1 : column.length} />
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell variant="body" colSpan={column.length} align="center">
                {emptyText ?? "Data not available"}
              </TableCell>
            </TableRow>
          ) : (
            data.map((_data: T, i: number) =>
              responsive && renderSmallView ? (
                <TableRow
                  key={`row-${i}`}
                  component="tr"
                  hover={hover}
                  selected={selected ? selected(_data) : undefined}
                  style={{ animationDelay: `${i * 0.02}s` }}
                  {...row}
                >
                  <TableCell
                    {...utils.omit(renderSmallView(_data), ["headProps"])}
                  />
                </TableRow>
              ) : (
                <TableRow
                  key={`row-${i}`}
                  component="tr"
                  hover={hover}
                  selected={selected ? selected(_data) : undefined}
                  {...row}
                >
                  {cdata.map(({ value, noWrap, ...col }, j) => (
                    <TableCell key={`row-${i}-cell-${j}`} {...col}>
                      {value(_data, i) ?? emptyCellText ?? "N/A"}
                    </TableCell>
                  ))}
                </TableRow>
              )
            )
          )}
        </TableBody>
      </Table>

      {pagination ? (
        <React.Suspense fallback={"loading..."}>
          <TablePagination
            component="div"
            sx={{
              width: "100%",
              position: "fixed",
              bottom: responsive ? "56px" : 0,
              left: 0,
              backgroundColor: "#f5f5f5",
              zIndex: 1199,
            }}
            {...pagination}
          />
        </React.Suspense>
      ) : null}

      <Toolbar />
      <Toolbar />
    </TableContainer>
  );
};

export default DataTablePage;
