"use client";
import React from "react";
import DataTablePage from "@/views/components/base/DataTable/DataTablePage";
import Dropdown, {
  DropdownProps,
} from "@/views/components/base/Dropdown/Dropdown";
import PageTemplate from "@/views/components/templates/PageTemplate";
import Link from "@mui/material/Link";
import StatusChip from "@/views/components/base/Chip/StatusChip";
import ServiceUpdate from "./ServiceUpdate";
import ServiceCreate from "./ServiceCreate";
import { getPagination } from "@/utils/table";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { useAlert } from "@/views/contexts/AlertContext";
import { deleteService, getService } from "@/views/services/service.service";
import { categoryUrl } from "@/views/services/category.service";
import { useAuth } from "@/views/contexts/AuthContext";
import useTable from "ezhooks/lib/useTable";
import useMultiDialog from "@/views/hooks/useMultiDialog";
import useSWRImmutable from "swr/immutable";

const ServiceTable = () => {
  const auth = useAuth();
  const openSnackbar = useSnackbar();
  const alert = useAlert();
  const [id, setID] = React.useState(0);

  const dialog = useMultiDialog({
    keys: ["create", "update"],
    onClose: {
      update: () => {
        setID(0);
      },
    },
  });

  const table = useTable({
    service: getService,
    selector: (resp) => resp.data,
    total: (resp) => resp.total ?? 0,
    pagination: {
      startPage: 0,
    },
    replaceUrl: true,
  });

  const { data: dataCategory } = useSWRImmutable<Category[]>(
    categoryUrl.all,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
  );

  const onClickDelete = React.useCallback(
    (id: number) => () => {
      alert.set({
        open: true,
        title: "Hapus Layanan",
        message:
          "Tindakan ini akan menghapus data secara permanen. Anda yakin ingin melanjutkan?",
        type: "warning",
        confirm: {
          onClick: () => {
            alert.set({ loading: true });
            deleteService({ params: { id } })
              .then((resp) => {
                if (!resp.ok) {
                  throw resp;
                }
                openSnackbar("Layanan berhasil dihapuskan.");
                alert.reset();
                const timer = setTimeout(() => {
                  table.reload();
                  clearTimeout(timer);
                }, 1000);
              })
              .catch((e) => {})
              .finally(() => {
                alert.set({ loading: false });
              });
          },
        },
      });
    },
    [table.data]
  );

  const onClickUpdate = React.useCallback(
    (_id: number) => () => {
      setID(_id);
      dialog.getDialog("update").openDialog();
    },
    [table.data]
  );

  const categoryMemo = React.useMemo(() => {
    return (dataCategory ?? []).map((val) => ({
      primary: val.name,
      value: val.id,
    }));
  }, [dataCategory]);

  return (
    <PageTemplate
      title="Layanan"
      onCreate={
        ["user"].includes(auth.role)
          ? dialog.getDialog("create").openDialog
          : undefined
      }
      onReload={table.reload}
    >
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
          // {
          //   label: "Foto",
          //   value: (value) => (
          //     <Avatar
          //       alt={value.name}
          //       src={value.imageUrl}
          //       variant="rounded"
          //       sx={{ width: 32, height: 32 }}
          //     />
          //   ),
          //   head: { padding: "checkbox", align: "center" },
          //   align: "center",
          // },
          {
            label: "Layanan",
            value: (value) => (
              <Link href={`service/${value.id}`} underline="none">
                {value.name}
              </Link>
            ),
            filter: {
              type: "text",
              value: table.query("name", ""),
              onChange: (e) => table.setQuery({ name: e.target.value }),
            },
          },
          {
            label: "Profil Bisnis",
            value: (value) => (
              <Link
                href={`business-profile/${value.profileId}`}
                underline="none"
              >
                {value.bussinessName ?? ""}
              </Link>
            ),
            filter: {
              type: "text",
              value: table.query("profile", ""),
              onChange: (e) => table.setQuery({ profile: e.target.value }),
            },
          },
          {
            label: "Kategori",
            value: (value) => value.categoryName,
            filter: {
              type: "select",
              items: categoryMemo,
              value: table.query("ctg", ""),
              onChange: (e) =>
                table.setQuery({
                  ctg: e.target.value === "00" ? "" : +e.target.value,
                }),
            },
          },

          {
            label: "Status",
            value: (value) => <StatusChip status={value.status} />,
            head: { align: "center" },
            align: "center",
            filter: {
              type: "select",
              items: [
                { primary: "Aktif", value: "active" },
                { primary: "Tidak Akif", value: "inactive" },
                { primary: "Menunggu", value: "pending" },
              ],
              value: table.query("status", ""),
              onChange: (e) =>
                table.setQuery({
                  status: e.target.value === "00" ? "" : e.target.value,
                }),
            },
            width: "15%",
          },
          {
            label: "",
            value: (val, i) => {
              let menu: DropdownProps["menu"] = [
                {
                  text: "Ubah",
                  onClick: onClickUpdate(val.id),
                },
                {
                  text: "Hapus",
                  onClick: onClickDelete(val.id),
                },
              ];

              if (auth.role && ["admin", "operator"].includes(auth.role)) {
                delete menu[0];
              }

              return <Dropdown menu={menu} />;
            },
            head: { padding: "checkbox", align: "center" },
            align: "center",
          },
        ]}
        pagination={getPagination(table.pagination)}
      />

      <ServiceCreate
        dialog={dialog.getDialog("create")}
        callback={table.reload}
      />
      <ServiceUpdate
        id={id}
        dialog={dialog.getDialog("update")}
        callback={table.reload}
      />
    </PageTemplate>
  );
};

export default ServiceTable;
