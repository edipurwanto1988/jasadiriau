"use client";

import React from "react";
import InputSelect from "@/views/components/base/Input/InputSelect";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import EditorTemplate from "@/views/components/templates/EditorTemplate";
import useZod from "@/views/hooks/useZod";
import useMutation from "ezhooks/lib/useMutation";
import useSWRImmutable from "swr/immutable";
import InputField from "@/views/components/base/Input/InputField";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Collapse from "@mui/material/Collapse";
import Button from "@mui/material/Button";
import Image from "next/image";
import { categoryUrl } from "@/views/services/category.service";
import { uniqueImage } from "@/utils/format";
import { useRouter } from "next/navigation";
import { articleUrl, postArticle } from "@/views/services/article.service";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { SimpleEditor } from "@/views/components/tiptap-templates/simple/simple-editor";
import {
  createArticleSchema,
  CreateArticleSchema,
} from "@/schema/article.schema";

type Props = {
  articleID?: string;
};

const CloseOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/CloseOutlined")
);

const ArticleEditor = ({ articleID }: Props) => {
  const router = useRouter();
  const openSnackbar = useSnackbar();
  const [open, setOpen] = React.useState(false);
  const mutation = useMutation<CreateArticleSchema>({
    defaultValue: {
      title: "",
    },
  });

  const validation = useZod({
    data: mutation.data(),
    schema: createArticleSchema,
  });

  const article = useSWRImmutable<Article>(
    articleID ? `${articleUrl.index}/${articleID}` : null,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
  );

  const category = useSWRImmutable<Category[]>(categoryUrl.all, (url) =>
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => resp.data)
  );

  const onSubmit = () => {
    const validated = validation.validated();
    if (validated) {
      mutation.send({
        service: postArticle,
        onSuccess: () => {
          openSnackbar("Artikel berhasil disimpan");
          router.back();
          mutation.reset();
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

  const setImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      const file = e.target.files[0];
      const [_, ext] = file.type.split("/");
      const filename = uniqueImage(ext);
      const newFile = new File([file], filename, {
        type: file.type,
      });

      mutation.setData({ file: newFile });
    }

    (e.target.value as any) = null;
  };

  const categoryMap = React.useMemo(() => {
    if (!category.data) {
      return [];
    }

    return category.data.map((v) => ({ primary: v.name, value: v.id }));
  }, [category.data]);

  React.useEffect(() => {
    if (!articleID || !article.data) return;
    mutation.setData({
      ...article.data,
      content: article.data.content
        ? JSON.stringify(article.data.content)
        : null,
    });
  }, [articleID, article.data]);

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
      title="Artikel"
      onCreate={onSubmit}
      onBack={() => {
        router.back();
        mutation.reset();
      }}
      onSetting={() => {
        setOpen(true);
      }}
    >
      <SimpleEditor
        data={article.data?.content}
        watchContent={(val) => {
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
            <Typography fontWeight={600}>Artikel</Typography>
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
          overflow={"hidden auto"}
        >
          <InputField
            label="Gambar"
            type="file"
            placeholder="Masukkan caption"
            fullWidth
            required
            onChange={setImage}
            error={validation.error("file")}
            helperText={validation.message("file")}
          />

          <Box>
            <Collapse in={mutation.has("file")} unmountOnExit>
              <Stack direction={"column"} spacing={1}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "250px",
                  }}
                >
                  <Image
                    src={
                      mutation.has("file")
                        ? URL.createObjectURL(mutation.value("file"))
                        : `/images/placeholder.webp`
                    }
                    alt={mutation
                      .value<string>("title", "")
                      .replaceAll(" ", "_")
                      .toLowerCase()}
                    fill={true}
                    loading="lazy"
                  />
                </div>

                <div>
                  <Button
                    size="small"
                    onClick={() => {
                      mutation.singleReset("file");
                    }}
                    variant="text"
                    fullWidth
                  >
                    Hapus
                  </Button>
                </div>

                <Toolbar />
              </Stack>
            </Collapse>
          </Box>

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
            label="Kategori"
            items={categoryMap}
            value={mutation.value("categoryId", "")}
            onChange={(e) =>
              mutation.setData({
                categoryId: e.target.value === "00" ? "" : e.target.value,
              })
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

export default ArticleEditor;
