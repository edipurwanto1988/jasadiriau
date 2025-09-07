"use client";
import React from "react";
import DataTablePage from "@/views/components/base/DataTable/DataTablePage";
import Dropdown from "@/views/components/base/Dropdown/Dropdown";
import PageTemplate from "@/views/components/templates/PageTemplate";
import StatusChip from "@/views/components/base/Chip/StatusChip";
import { getPagination } from "@/utils/table";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { useAlert } from "@/views/contexts/AlertContext";
import { Link } from "react-transition-progress/next";
import { useProgress } from "react-transition-progress";
import { useRouter } from "next/navigation";
import useTable from "ezhooks/lib/useTable";
import { deleteArticle, getArticles } from "@/views/services/article.service";
import Avatar from "@mui/material/Avatar";

const ArticleTable = () => {
  const startProgress = useProgress();
  const openSnackbar = useSnackbar();
  const alert = useAlert();
  const router = useRouter();

  const table = useTable({
    service: getArticles,
    selector: (resp) => resp.data,
    total: (resp) => resp.total ?? 0,
    pagination: {
      startPage: 0,
    },
    replaceUrl: true,
  });

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
            deleteArticle({ params: { id } })
              .then((resp) => {
                if (!resp.ok) {
                  throw resp;
                }
                openSnackbar("Artikel berhasil dihapuskan.");
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
      React.startTransition(() => {
        startProgress();
        router.push(`/editor/article/${_id}`);
      });
    },
    [table.data]
  );

  return (
    <PageTemplate
      title="Artikel"
      onCreate={() => {
        React.startTransition(() => {
          startProgress();
          router.push("/editor/article");
        });
      }}
      onReload={table.reload}
    >
      <DataTablePage
        data={table.data}
        loading={table.loading}
        tableProps={{ size: "small" }}
        column={[
          {
            label: "Gambar",
            value: (value) => (
              <Avatar
                alt={value.title}
                src={value.thumbnail}
                variant="rounded"
              />
            ),
            head: { align: "center", padding: "checkbox" },
            align: "center",
            padding: "checkbox",
          },
          {
            label: "Judul",
            value: (value) => (
              <Link
                href={`/article/${value.slug}`}
                prefetch={false}
                target="_blank"
              >
                {value.title}
              </Link>
            ),
            filter: {
              type: "text",
              value: table.query("title", ""),
              onChange: (e) => table.setQuery({ title: e.target.value }),
            },
            sx: (theme) => ({
              [theme.breakpoints.between("xs", "sm")]: {
                whiteSpace: "nowrap",
              },
            }),
          },
          {
            label: "Slug",
            value: (value) => value.slug,
            sx: (theme) => ({
              [theme.breakpoints.between("xs", "sm")]: {
                whiteSpace: "nowrap",
              },
            }),
          },

          {
            label: "Kategori",
            value: (value) => value.category?.name,
            sx: {
              whiteSpace: "nowrap",
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
              return (
                <Dropdown
                  menu={[
                    {
                      text: "Ubah",
                      onClick: onClickUpdate(val.id),
                    },
                    {
                      text: "Hapus",
                      onClick: onClickDelete(val.id),
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
    </PageTemplate>
  );
};

export default ArticleTable;
