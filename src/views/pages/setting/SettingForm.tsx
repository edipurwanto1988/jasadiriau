"use client";
import React from "react";
import SettingTemplate from "@/views/components/templates/SettingTemplate";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import InputField from "@/views/components/base/Input/InputField";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import SnacbarLoading from "@/views/components/base/Skeleton/SnacbarLoading";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import useSWRImmutable from "swr/immutable";
import useMutation from "ezhooks/lib/useMutation";
import useZod from "@/views/hooks/useZod";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { useSWRConfig } from "swr";
import { postSetting, settingUrl } from "@/views/services/setting.service";
import { parseResponseError } from "@/utils/format";
import { inputSettingSchema } from "@/schema/setting.schema";
import { dummySetting, imgUrl, settingFormGroups } from "@/lib/dummy";

const SettingForm = () => {
  const openSnackbar = useSnackbar();

  const { mutate } = useSWRConfig();
  const { data, isLoading } = useSWRImmutable<Setting>(
    settingUrl.setting,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
  );

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
          mutate(settingUrl.setting);
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

  React.useEffect(() => {
    if (!data) return;

    startTransition(() => {
      mutation.setData(data ?? dummySetting);
    });

    return () => {};
  }, [data, isLoading]);

  return (
    <SettingTemplate
      title="Pengaturan"
      onReload={() => mutate(settingUrl.setting)}
    >
      <Stack spacing={4} sx={{ p: 2, overflow: "auto" }}>
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
                      value={mutation.value(field.key, "")}
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
            loading={isLoading || mutation.processing}
            onClick={onSubmit}
            disableElevation
          >
            Simpan Perubahan
          </Button>
        </div>
        <Toolbar />
      </Stack>
      <SnacbarLoading loading={isLoading} pending={isPending} />
    </SettingTemplate>
  );
};

export default SettingForm;
