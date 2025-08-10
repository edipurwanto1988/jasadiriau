"use client";
import React from "react";

import useMutation from "ezhooks/lib/useMutation";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import SettingTemplate from "@/views/components/templates/SettingTemplate";
import useZod from "@/views/hooks/useZod";
import { parseResponseError } from "@/utils/format";
import { inputSettingSchema } from "@/schema/setting.schema";
import { dummySetting, imgUrl, settingFormGroups } from "@/lib/dummy";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import InputField from "@/views/components/base/Input/InputField";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import { getSetting, postSetting } from "@/views/services/setting.service";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SnacbarLoading from "@/views/components/base/Skeleton/SnacbarLoading";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

export default function Page() {
  const openSnackbar = useSnackbar();

  const [isPending, startTransition] = React.useTransition();

  const mutation = useMutation({
    defaultValue: dummySetting,
  });

  const validation = useZod({
    data: mutation.data(),
    schema: inputSettingSchema,
  });

  const onSubmit = () => {
    const validated = validation.validated();

    if (validated) {
      mutation.send({
        service: postSetting,
        onSuccess: () => {
          mutation.reset();
          openSnackbar("Pengaturan berhasil diperbaharui");
        },
        onError: (e) => {
          parseResponseError(e, (msg) => {
            openSnackbar(msg, { severity: "error" });
          });
        },
      });
    }
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    mutation.setData({ [e.target.name]: e.target.value });
  };

  const fecthData = () => {
    mutation.send({
      loading: true,
      service: getSetting,
      onSuccess: (resp) => {
        startTransition(() => {
          mutation.setData(resp.data);
        });
      },
    });
  };

  React.useEffect(() => {
    fecthData();
    return () => {
      mutation.cancel();
    };
  }, []);

  return (
    <SettingTemplate title="Pengaturan" onReload={fecthData}>
      <Stack spacing={4} sx={{ p: 2, overflow: "hidden auto" }}>
        {settingFormGroups.map((group, g) => (
          <Stack direction={"column"} key={`group-${g}`} spacing={2}>
            <ListItemText
              primary={group.title}
              secondary={group.subtitle}
              slotProps={{
                primary: {
                  variant: "subtitle1",
                },
                secondary: { variant: "subtitle2" },
              }}
            />

            <Stack spacing={2}>
              {group.fields.map((field, i) => (
                <Stack
                  key={i}
                  direction={"row"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                  spacing={2.5}
                >
                  <Box sx={{ flexBasis: "20%" }}>
                    <Typography variant="subtitle2" whiteSpace={"nowrap"}>
                      {field.label}
                    </Typography>
                  </Box>

                  {field.props?.type === "file" ? (
                    <Stack
                      direction={"row"}
                      spacing={2}
                      alignItems={"center"}
                      flexGrow={1}
                      width={"100%"}
                    >
                      <Avatar
                        alt={mutation.value("siteName")}
                        src={mutation.value("logo", imgUrl)}
                        variant="square"
                      />

                      <InputField
                        name={field.key}
                        placeholder={field.placeholder}
                        {...field.props}
                        variant="outlined"
                        value={mutation.value(field.key)}
                        onChange={onChange}
                        error={validation.error(field.key)}
                        helperText={validation.message(field.key)}
                      />
                    </Stack>
                  ) : (
                    <InputField
                      name={field.key}
                      placeholder={field.placeholder}
                      fullWidth
                      {...field.props}
                      value={mutation.value(field.key)}
                      onChange={onChange}
                      error={validation.error(field.key)}
                      helperText={validation.message(field.key)}
                    />
                  )}
                </Stack>
              ))}
            </Stack>

            <Divider flexItem />
          </Stack>
        ))}

        <div>
          <Button
            variant="contained"
            loading={mutation.loading || mutation.processing}
            onClick={onSubmit}
            disableElevation
          >
            Simpan Perubahan
          </Button>
        </div>
        <Toolbar />
      </Stack>
      <SnacbarLoading loading={mutation.loading} pending={isPending} />
    </SettingTemplate>
  );
}
