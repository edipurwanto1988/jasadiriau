"use client";

import React from "react";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { deleteMenu, menuUrl, postMenu } from "@/views/services/menu.service";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import {
  TreeItemComponentProps,
  SimpleTreeItemWrapper,
} from "dnd-kit-sortable-tree";
import useMutation from "ezhooks/lib/useMutation";
import { useSWRConfig } from "swr";

const TextField = LoadComponent(() => import("@mui/material/TextField"));

const TreeItem = React.forwardRef<
  HTMLDivElement,
  TreeItemComponentProps<IMenu>
>((props, ref) => {
  const { mutate } = useSWRConfig();
  const openSnackbar = useSnackbar();
  const mutation = useMutation({
    defaultValue: props.item,
  });

  const onSave = () => {
    mutation.send({
      service: postMenu,
      onSuccess: () => {
        openSnackbar("Menu berhasil diperbaharui.");
        mutate(`${menuUrl.index}?position=${props.item.position}`);
      },
    });
  };

  const onAdd = () => {
    mutation.send({
      data: {
        parentId: props.item.id,
        position: props.item.position,
      },
      service: postMenu,
      onSuccess: () => {
        openSnackbar("Menu berhasil ditambah.");
        mutate(`${menuUrl.index}?position=${props.item.position}`);
      },
    });
  };

  const onDelete = (id: number) => () => {
    mutation.send({
      params: { id },
      service: deleteMenu,
      onSuccess: () => {
        openSnackbar("Menu berhasil dihapus.");
        mutate(`${menuUrl.index}?position=${props.item.position}`);
      },
    });
  };

  return (
    <SimpleTreeItemWrapper {...props} ref={ref} disableCollapseOnItemClick>
      <Stack
        direction={"row"}
        width={"100%"}
        alignItems={"center"}
        spacing={1}
        ml={2}
      >
        <Stack direction={"row"} spacing={2} flexBasis={"60%"}>
          <TextField
            value={mutation.value("name", "")}
            onChange={(e) => mutation.setData({ name: e.target.value })}
            variant="outlined"
            placeholder="Masukkan nama menu"
            size="small"
            fullWidth
            sx={{
              m: 0,
              "& .MuiOutlinedInput-notchedOutline": {
                border: 0,
                borderColor: "transparent",
                borderRadius: "0 !important",
              },
            }}
          />

         {!!props.item.children.length ? null:  <TextField
            value={mutation.value("url", "")}
            onChange={(e) => mutation.setData({ url: e.target.value })}
            variant="outlined"
            placeholder="Masukkan alamat URL"
            size="small"
            fullWidth
            sx={{
              m: 0,
              "& .MuiOutlinedInput-notchedOutline": {
                border: 0,
                borderColor: "transparent",
                borderRadius: "0 !important",
              },
            }}
          />}
        </Stack>

        <Stack
          direction={"row"}
          flexGrow={1}
          justifyContent={"flex-end"}
          spacing={1}
        >
          <Box>
            <Button
              loading={mutation.processing}
              variant="outlined"
              color="success"
              size="small"
              disableElevation
              onClick={onSave}
            >
              Simpan
            </Button>
          </Box>

          <Box>
            <Button
              loading={mutation.processing}
              variant="outlined"
              color="error"
              disableElevation
              size="small"
              onClick={onDelete(props.item.id)}
            >
              Hapus
            </Button>
          </Box>

          <Box>
            <Button
              loading={mutation.processing}
              variant="outlined"
              disableElevation
              size="small"
              onClick={onAdd}
            >
              Tambah Sub Menu
            </Button>
          </Box>
        </Stack>
      </Stack>
    </SimpleTreeItemWrapper>
  );
});

export default TreeItem;
