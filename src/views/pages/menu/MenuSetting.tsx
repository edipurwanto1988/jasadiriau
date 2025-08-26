"use client";

import React from "react";
import { SortableTree, TreeItems } from "dnd-kit-sortable-tree";
import TreeItem from "./TreeItem";
import useSWRImmutable from "swr/immutable";
import {
  getMenuAll,
  menuUrl,
  postMenu,
  putMenutReorder,
} from "@/views/services/menu.service";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Skeleton from "@mui/material/Skeleton";
import { useSWRConfig } from "swr";
import Toolbar from "@mui/material/Toolbar";
import useMutation from "ezhooks/lib/useMutation";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import SnacbarLoading from "@/views/components/base/Skeleton/SnacbarLoading";
import SettingTemplate from "@/views/components/templates/SettingTemplate";

const MenuSetting = () => {
  const [position, setPosition] = React.useState("header");
  const [items, setItems] = React.useState<TreeItems<IMenu>>([]);
  const openSnackbar = useSnackbar();
  const mutation = useMutation({
    defaultValue: {
      items: [],
    },
  });

  const { mutate } = useSWRConfig();
  const { data, isLoading } = useSWRImmutable(
    `${menuUrl.index}?position=${position}`,
    getMenuAll
  );

  const rebuild = (value: TreeItems<IMenu>) => {
    const tmp: any[] = [];
    let i = 1;
    for (const item of value) {
      tmp.push({
        id: item.id,
        name: item.name,
        url: item.url,
        parentId: item.parentId,
        sortOrder: i,
        position: position,
        children: rebuild(item.children),
      });
      i++;
    }
    return tmp;
  };

  const flatten = (value: any[]) => {
    return value
      .map((value) => [
        {
          id: value.id,
          sortOrder: value.sortOrder,
           parentId: value.parentId,
        },
        ...flatten(value.children),
      ])
      .flatMap((v) => v);
  };

  const onReorder = () => {
    mutation.send({
      service: putMenutReorder,
      onSuccess: () => {
        openSnackbar("Urutan menu berhasil diperbaharui.");
        mutate(`${menuUrl.index}?position=${position}`);
      },
    });
  };

  const onAdd = () => {
    mutation.send({
      data: {
        position,
        sortOrder: items.length + 1
      },
      service: postMenu,
      onSuccess: () => {
        openSnackbar("Menu berhasil ditambah.");
        mutate(`${menuUrl.index}?position=${position}`);
      },
    });
  };

  React.useEffect(() => {
    if (!data) return;
    setItems(data);
  }, [data]);

  return (
    <SettingTemplate
      title="Menu"
      onReload={() => {
        mutate(`${menuUrl.index}?position=${position}`);
      }}
    >
      <Stack
        direction={"column"}
        spacing={2}
        sx={{ overflow: "hidden", height: "100vh" }}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          px={2}
          py={1}
          spacing={2}
          sx={{ borderBottom: 1, borderColor: "divider", overflow: "hidden" }}
        >
          <Box>
            <Button
              disableElevation
              variant={position === "header" ? "contained" : "text"}
              size="small"
              onClick={() => setPosition("header")}
            >
              Menu Header
            </Button>
          </Box>

          <Box>
            <Button
              disableElevation
              variant={position === "footer" ? "contained" : "text"}
              size="small"
              onClick={() => setPosition("footer")}
            >
              Menu Footer
            </Button>
          </Box>

          <Box display={"flex"} flexGrow={1} justifyContent={"flex-end"}>
            <Button
              loading={mutation.processing}
              disableElevation
              variant="outlined"
              onClick={onReorder}
            >
              Simpan Urutan Menu
            </Button>
          </Box>
        </Stack>

        <Stack
          direction={"column"}
          spacing={2}
          sx={{ overflow: "hidden auto", height: "100vh", p: 2 }}
        >
          <Box>
            {isLoading ? (
              <Skeleton width={"100%"} />
            ) : !items.length ? null : (
              <SortableTree
                items={items}
                onItemsChanged={(items, reason) => {
                  setItems(items);
                  mutation.setData({ items: flatten(rebuild(items)) });
                }}
                TreeItemComponent={TreeItem}
              />
            )}
          </Box>

          <Box>
            <Button disabled={isLoading} size="small" variant="outlined" onClick={onAdd}>
              Tambah Menu
            </Button>
          </Box>

          <Toolbar />
        </Stack>
      </Stack>
      <SnacbarLoading loading={isLoading} />
    </SettingTemplate>
  );
};

export default MenuSetting;
