"use client";
import React from "react";
import DataTablePage from "@/views/components/base/DataTable/DataTablePage";
import Dropdown, {
  DropdownProps,
} from "@/views/components/base/Dropdown/Dropdown";
import PageTemplate from "@/views/components/templates/PageTemplate";
import Link from "@mui/material/Link";
import StatusChip from "@/views/components/base/Chip/StatusChip";
import { getPagination } from "@/utils/table";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { useAlert } from "@/views/contexts/AlertContext";
import { deleteService, getService } from "@/views/services/service.service";
import { categoryUrl } from "@/views/services/category.service";
import { useAuth } from "@/views/contexts/AuthContext";
import useTable from "ezhooks/lib/useTable";
import useMultiDialog from "@/views/hooks/useMultiDialog";
import useSWRImmutable from "swr/immutable";
import { getUser } from "@/views/services/user.service";
import Avatar from "@mui/material/Avatar";
import useDialog from "@/views/hooks/useDialog";
import UserRoleForm from "./UserRoleForm";

const UserList = () => {
  const [id, setID] = React.useState(0);
  const dialog = useDialog({
    onClose: () => {
      setID(0);
    },
  });

  const table = useTable({
    service: getUser,
    selector: (resp) => resp.data,
    total: (resp) => resp.total ?? 0,
    pagination: {
      startPage: 0,
    },
    replaceUrl: true,
  });

  const onClickUpdate = React.useCallback(
    (_id: number) => () => {
      dialog.openDialog();
      setID(_id);
    },
    [table.data]
  );

  return (
    <PageTemplate title="Pengguna" onReload={table.reload}>
      <DataTablePage
        data={table.data}
        loading={table.loading}
        tableProps={{ size: "small" }}
        column={[
          {
            label: "No",
            value: (_, i) => table.pagination.from + (i ?? 0),
            head: { padding: "checkbox", align: "center" },
            align: "center",
          },
          {
            label: "Foto",
            value: (value) => (
              <Avatar
                alt={value.name}
                src={value.imageUrl}
                variant="rounded"
                sx={{ width: 32, height: 32 }}
                slotProps={{
                  img: {
                    referrerPolicy: "no-referrer",
                  },
                }}
              />
            ),
            head: { padding: "checkbox", align: "center" },
            align: "center",
          },
          {
            label: "Nama",
            value: (value) => value.name,
            filter: {
              type: "text",
              value: table.query("name", ""),
              onChange: (e) => table.setQuery({ name: e.target.value }),
            },
          },

          {
            label: "Email",
            value: (value) => value.email,
            filter: {
              type: "text",
              value: table.query("email", ""),
              onChange: (e) => table.setQuery({ email: e.target.value }),
            },
          },

          {
            label: "Kontak",
            value: (value) => value.phoneNumber,
            filter: {
              type: "text",
              value: table.query("phoneNumber", ""),
              onChange: (e) => table.setQuery({ phoneNumber: e.target.value }),
            },
          },

          {
            label: "Role",
            value: (value) => value.role,
            head: { align: "center" },
            align: "center",
            filter: {
              type: "select",
              items: [
                { primary: "Admin", value: "admin" },
                { primary: "Operator", value: "operator" },
                { primary: "Pengguna", value: "user" },
              ],
              value: table.query("role", ""),
              onChange: (e) =>
                table.setQuery({
                  role: e.target.value === "00" ? "" : e.target.value,
                }),
            },
            width: "15%",
          },
          {
            label: "",
            value: (val) => {
              return (
                <Dropdown
                  menu={[
                    {
                      text: "Ubah Role",
                      onClick: onClickUpdate(val.id),
                    },
                  ]}
                />
              );
            },
            head: { padding: "checkbox", align: "center" },
            align: "center",
          },
        ]}
        pagination={getPagination(table.pagination)}
      />

      <UserRoleForm id={id} dialog={dialog} callback={table.reload} />
    </PageTemplate>
  );
};

export default UserList;
