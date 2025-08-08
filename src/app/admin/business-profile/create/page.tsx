"use client";
import React from "react";
import useMutation from "ezhooks/lib/useMutation";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { parseFormData, parseResponseError } from "@/utils/format";
import { postBusinessProfile } from "@/views/services/business-profile.service";
import { useRouter } from "next/navigation";
import { createBusinessProfileSchema } from "@/schema/business-profile.schema";
import { dummyBusinessProfile } from "@/lib/dummy";
import useZod from "@/views/hooks/useZod";
import Form from "../_partial/Form";
import PageTemplate from "@/views/components/templates/PageTemplate";

export default function Page() {
  const ref = React.useRef<HTMLFormElement | null>(null);
  const router = useRouter();
  const openSnackbar = useSnackbar();

  const mutation = useMutation({
    defaultValue: dummyBusinessProfile,
  });

  const validation = useZod({
    data: mutation.data(),
    schema: createBusinessProfileSchema,
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = dummyBusinessProfile;

    const validated = validation.validated({
      data: parseFormData(formData),
      cb: (val) => {
        Object.assign(payload, val);
      },
    });

    if (validated) {
      mutation.send({
        data: payload,
        service: postBusinessProfile,
        onSuccess: () => {
          openSnackbar("Profil Bisnis baru berhasil ditambahkan.");
        },
        onError(e) {
          parseResponseError(e, (msg) => {
            openSnackbar(msg, { severity: "error" });
          });
        },
      });
    }
  };

  return (
    <PageTemplate
      title="Tambah Profil Bisnis"
      onBack={router.back}
      onCreate={() => {
        if (ref.current) {
          ref.current.requestSubmit();
        }
      }}
    >
      <Form
        ref={ref}
        validation={validation}
        mutation={mutation}
        onSubmit={onSubmit}
      />
    </PageTemplate>
  );
}
