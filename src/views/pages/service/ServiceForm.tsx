"use client";
import React from "react";
import InputSelectUncontrolled from "@/views/components/base/Input/InputSelectUncontrolled";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import Stack from "@mui/material/Stack";
import { CreateServiceSchema } from "@/schema/service.schema";
import { UseZod } from "@/views/hooks/useZod";
import { formatValueRupiah } from "@/utils/input";

import { UseMutation } from "ezhooks/lib/useMutation";

const TextField = LoadComponent(() => import("@mui/material/TextField"));

type Props = {
  ref?: React.Ref<HTMLFormElement>;
  businessRef?: React.RefObject<HTMLSelectElement | null>;
  categoryRef?: React.RefObject<HTMLSelectElement | null>;
  businesses: { primary: string; value: any }[];
  categories: { primary: string; value: any }[];
  mutation: UseMutation<CreateServiceSchema>;
  validation: UseZod<CreateServiceSchema>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const ServiceForm = ({
  ref,
  businessRef,
  categoryRef,
  businesses,
  categories,
  mutation,
  validation,
  onSubmit,
}: Props) => {
  return (
    <form ref={ref} noValidate className="default-form" onSubmit={onSubmit}>
      <Stack direction={"column"} spacing={3}>
        <InputSelectUncontrolled
          label="Profil Bisnis"
          name="profileId"
          items={businesses}
          defaultValue={mutation.value("profileId", "")}
          error={validation.error("profileId")}
          helperText={validation.message("profileId")}
          required
            slotProps={{
            select: {
              native: true,
              ref: businessRef,
            },
          }}
        />

        <TextField
          label="Layanan"
          name="name"
          required
          placeholder="Masukkan nama layanan"
          defaultValue={mutation.value("name", "")}
          error={validation.error("name")}
          helperText={validation.message("name")}
        />

        <InputSelectUncontrolled
          label="Kategori"
          name="categoryId"
          items={categories}
          defaultValue={mutation.value("categoryId", "")}
          error={validation.error("categoryId")}
          helperText={validation.message("categoryId")}
          required
          slotProps={{
            select: {
              native: true,
              ref: categoryRef,
            },
          }}
        />

        <TextField
          label="Harga"
          name="price"
          onChange={(e) => {
            e.currentTarget.value = formatValueRupiah(e.currentTarget.value);
          }}
          defaultValue={mutation.value("price", "")}
          error={validation.error("price")}
          helperText={validation.message("price")}
        />

        <TextField
          label="Deskripsi"
          name="description"
          multiline
          rows={8}
          placeholder="Masukkan deskripsi"
          defaultValue={mutation.value("description", "")}
        />

        <TextField
          label="Syarat & Ketentuan"
          name="term"
          multiline
          rows={8}
          placeholder="Masukkan syarat & ketentuan"
          defaultValue={mutation.value("terms", "")}
        />
      </Stack>
    </form>
  );
};

export default ServiceForm;
