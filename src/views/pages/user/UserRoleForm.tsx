"use client";
import React from "react";
import Dialog from "@/views/components/base/Dialog";
import InputSelect from "@/views/components/base/Input/InputSelect";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { parseResponseError } from "@/utils/format";
import { UseDialog } from "@/views/hooks/useDialog";
import { updateRoleSchema } from "@/schema/user.schema";
import useMutation from "ezhooks/lib/useMutation";
import useZod from "@/views/hooks/useZod";
import { updateRole } from "@/views/services/user.service";

type Props = {
  id: number;
  dialog: UseDialog;
  callback: () => void;
};

const UserRoleForm = ({ id, dialog, callback }: Props) => {
  const openSnackbar = useSnackbar();

  const mutation = useMutation({
    defaultValue: {
      id: id,
      role: "",
    },
  });

  const validation = useZod({
    data: mutation.data(),
    schema: updateRoleSchema,
  });

  const onSubmit = () => {
    const validated = validation.validated();

    if (validated) {
      mutation.send({
        service: updateRole,
        onSuccess: (resp) => {
          openSnackbar("Role baru pengguna berhasil diperbaharui.");
          dialog.closeDialog();
          mutation.reset();
          callback();
        },
        onError(e) {
          parseResponseError(e, (msg) => {
            openSnackbar(msg, { severity: "error" });
          });
        },
      });
    }
  };

  const close = () => {
    dialog.closeDialog();
    mutation.reset();
    validation.clear();
  };

  return (
    <Dialog
      open={dialog.open}
      title={"Role"}
      maxWidth="xs"
      fullWidth
      draggable
      actionButton={[
        { text: "Batal", onClick: close },
        {
          text: "Simpan Perubahan",
          variant: "text",
          onClick: onSubmit,
        },
      ]}
    >
      <InputSelect
        label="Role"
        items={[
          { primary: "Admin", value: "admin" },
          { primary: "Operator", value: "operator" },
          { primary: "Pengguna", value: "user" },
        ]}
        value={mutation.value("role", "")}
        error={validation.error("role")}
        helperText={validation.message("role")}
        fullWidth
        onChange={(e) => {
          const val = e.target.value;
          mutation.setData({ role: val === "00" ? "" : val });
        }}
      />
    </Dialog>
  );
};

export default UserRoleForm;
