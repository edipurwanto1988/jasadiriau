"use client";
import { SimpleEditor } from "@/views/components/tiptap-templates/simple/simple-editor";
import { createPageSchema, CreatePageSchema } from "@/schema/page.schema";
import InputSelect from "@/views/components/base/Input/InputSelect";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import EditorTemplate from "@/views/components/templates/EditorTemplate";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import useZod from "@/views/hooks/useZod";
import { pageUrl, postPage } from "@/views/services/page.service";
import {
  Box,
  Drawer,
  IconButton,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import useMutation from "ezhooks/lib/useMutation";
import { useRouter } from "next/navigation";
import React from "react";
import useSWRImmutable from "swr/immutable";

type Props = {
  pageID?: string;
};

const CloseOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/CloseOutlined")
);

const PageEditor = ({ pageID }: Props) => {
  const router = useRouter();
  const openSnackbar = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const mutation = useMutation<CreatePageSchema>({
    defaultValue: {
      title: "",
    },
  });

  const validation = useZod({
    data: mutation.data(),
    schema: createPageSchema,
  });

  const page = useSWRImmutable<Page>(
    pageID ? `${pageUrl.index}/${pageID}` : null,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
  );

  const onSubmit = () => {
    const validated = validation.validated();
    if (validated) {
      mutation.send({
        service: postPage,
        onSuccess: () => {
          openSnackbar("Halaman berhasil disimpan");
          router.back()
          mutation.reset()
        },
        onError: (resp) => {
          console.log(resp);
        },
      });
    }
  };

  const onCloseDrawer = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (!pageID || !page.data) return;
    mutation.setData({
      ...page.data,
      content: JSON.stringify(page.data.content),
    });
  }, [pageID, page.data]);

  console.log(validation.message());

  React.useEffect(() => {
    if (!validation.error("title")) return;

    openSnackbar("Judul Wajib Ditambahkan.", {
      severity: "error",
      anchorOrigin: {
        horizontal: "center",
        vertical: "top",
      },
    });
  }, [validation.message(), mutation.data()]);

  return (
    <EditorTemplate
      title="Halaman"
      onCreate={onSubmit}
      onBack={router.back}
      onSetting={() => {
        setOpen(true);
      }}
    >
      <SimpleEditor
        data={page.data?.content}
        watchContent={(val) => {
          console.log(val);
          mutation.setData({ content: JSON.stringify(val) });
          if (val) {
            const head = val.content?.at(0);
            if (head && head.type === "heading") {
              const cont = head.content?.at(0);
              if (cont) {
                if (String(cont.text).toLowerCase().trim() !== "tambah judul") {
                  mutation.setData({ title: cont.text });
                }
              }
            }
          }
        }}
      />

      <Drawer
        open={open}
        onClose={onCloseDrawer}
        slotProps={{
          paper: {
            sx: {
              width: "30%",
            },
          },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: 1,
            borderColor: "divider",
          }}
        >
          <Box flexGrow={1}>
            <Typography fontWeight={600}>Halaman</Typography>
          </Box>

          <Box>
            <IconButton
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseOutlinedIcon />
            </IconButton>
          </Box>
        </Toolbar>

        <Stack
          direction={"column"}
          px={2}
          py={2}
          spacing={3}
          className="default-form"
        >
          <TextField
            label="Meta Keywords"
            variant="standard"
            placeholder="Masukkan keywords"
            value={mutation.value("metaKeywords", "")}
            onChange={(e) => mutation.setData({ metaKeywords: e.target.value })}
          />

          <TextField
            label="Meta Deskripsi"
            variant="standard"
            multiline
            rows={5}
            placeholder="Masukkan deskripsi"
            value={mutation.value("metaDescription", "")}
            onChange={(e) =>
              mutation.setData({ metaDescription: e.target.value })
            }
          />

          <InputSelect
            label="Status"
            items={[
              { primary: "Aktif", value: "active" },
              { primary: "Tidak Aktif", value: "inactive" },
              { primary: "Menunggu", value: "pending" },
            ]}
            value={mutation.value("status", "")}
            onChange={(e) =>
              mutation.setData({
                status: e.target.value === "00" ? "" : e.target.value,
              })
            }
          />
        </Stack>
      </Drawer>
    </EditorTemplate>
  );
};

export default PageEditor;
