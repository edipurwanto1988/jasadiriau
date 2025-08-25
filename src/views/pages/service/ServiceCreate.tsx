"use client";
import React from "react";
import Dialog from "@/views/components/base/Dialog";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { businessUrl } from "@/views/services/business-profile.service";
import { categoryUrl } from "@/views/services/category.service";
import { postService } from "@/views/services/service.service";
import { inputService } from "@/lib/dummy";
import { createServiceSchema } from "@/schema/service.schema";
import { parseFormData, parseResponseError } from "@/utils/format";
import useMutation from "ezhooks/lib/useMutation";
import useSWR from "swr/immutable";
import useZod from "@/views/hooks/useZod";
import ServiceForm from "./ServiceForm";
import { UseDialog } from "@/views/hooks/useDialog";

type Props = {
  dialog: UseDialog;
  callback: () => void;
};

const ServiceCreate = ({ dialog, callback }: Props) => {
  const ref = React.useRef<HTMLFormElement | null>(null);
  const openSnackbar = useSnackbar();

  const { data: dataCategory } = useSWR<Category[]>(
    dialog.open ? categoryUrl.all : null,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
  );

  const { data: dataBusiness } = useSWR<BusinessProfile[]>(
    dialog.open ? businessUrl.business : null,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
  );

  const mutation = useMutation({
    defaultValue: inputService,
  });

  const validation = useZod({
    data: mutation.data(),
    schema: createServiceSchema,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = inputService;

    formData.set(
      "price",
      String(String(formData.get("price")).replace(/[^0-9]/g, ""))
    );

    const validated = validation.validated({
      data: parseFormData(formData),
      cb: (val) => {
        Object.assign(payload, val);
      },
    });

    if (validated) {
      mutation.send({
        data: payload,
        service: postService,
        onSuccess: (resp) => {
          openSnackbar("Layanan baru sudah berhasil dibuat.");
          mutation.reset();
          dialog.closeDialog();
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

  const categoryMemo = React.useMemo(() => {
    return (dataCategory ?? []).map((val) => ({
      primary: val.name,
      value: val.id,
    }));
  }, [dataCategory]);

  const businessMemo = React.useMemo(() => {
    return (dataBusiness ?? []).map((val) => ({
      primary: val.businessName,
      value: val.id,
    }));
  }, [dataBusiness]);

  return (
    <Dialog
      open={dialog.open}
      title={"Layanan"}
      fullWidth
      draggable
      actionButton={[
        { text: "Batal", onClick: close },
        {
          text: "Tambah Baru",
          variant: "text",
          onClick: () => {
            ref.current?.requestSubmit();
          },
        },
      ]}
    >
      <ServiceForm
        time={0}
        mutation={mutation}
        validation={validation}
        categories={categoryMemo}
        businesses={businessMemo}
        ref={ref}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};

export default ServiceCreate;
