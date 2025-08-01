export const getPagination = (
  value: import("ezhooks").UseTablePagination
): import("@mui/material/TablePagination").TablePaginationProps => {
  return {
    count: value.total,
    rowsPerPage: value.perPage,
    page: value.page,
    rowsPerPageOptions: value.perPageOptions,
    onPageChange: (_, page) => {
      value.setPage(page);
    },
    onRowsPerPageChange: value.onPerPageChange,
  };
};
