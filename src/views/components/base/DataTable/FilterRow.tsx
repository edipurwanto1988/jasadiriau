import React from "react";
import FilterCell, { FilterCellProps } from "./FilterCell";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TextFieldProps } from "@mui/material/TextField";
import Loading from "../Skeleton/Spinner";

export interface FilterRowProps {
  filterOptions?: TextFieldProps;
  column: (Omit<FilterCellProps, "filterOptions"> | undefined)[];
}

const FilterRow = ({ column, filterOptions }: FilterRowProps) => {
  return !!column.length ? (
    <TableRow
      sx={{
        "&.MuiTableRow-root th:last-child": {
          borderRight: "none",
        },
      }}
    >
      {column.map((val, i) =>
        val ? (
          <FilterCell
            key={`th-filter_${i}`}
            filterOptions={filterOptions}
            sx={{
              borderRight: 1,
              borderRightColor: "var( --mui-palette-default-divider)",
              ...(i > 0 &&
                !column[i - 1] && {
                  borderLeft: 1,
                  borderLeftColor: "var( --mui-palette-default-divider)",
                }),
            }}
            {...val}
          />
        ) : (
          <React.Suspense key={`th-filter_${i}`} fallback={<Loading />}>
            <TableCell
              variant="head"
              size="small"
              padding="none"
              align="center"
              sx={{
                ...(!val &&
                  column[i + 1] && {
                    borderRight: 1,
                    borderRightColor: "var( --mui-palette-default-divider)",
                  }),
              }}
            />
          </React.Suspense>
        )
      )}
    </TableRow>
  ) : null;
};

export default FilterRow;
