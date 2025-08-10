"use client";
import React from "react";
import SnacbarLoading from "@/views/components/base/Skeleton/SnacbarLoading";
import PageTemplate from "@/views/components/templates/PageTemplate";
import Form from "../../_partial/Form";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import useZod from "@/views/hooks/useZod";
import {
  getBusinessProfileID,
  postBusinessProfile,
} from "@/views/services/business-profile.service";
import useMutation from "ezhooks/lib/useMutation";
import { useParams, useRouter } from "next/navigation";
import { dummyBusinessProfile } from "@/lib/dummy";
import { updateBusinessProfileSchema } from "@/schema/business-profile.schema";
import { parseFormData } from "@/utils/format";

export default function Page() {
  const { id } = useParams();
  const router = useRouter();
  const ref = React.useRef<HTMLFormElement | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const openSnackbar = useSnackbar();

  const mutation = useMutation({
    defaultValue: dummyBusinessProfile,
  });

  const validation = useZod({
    data: mutation.data(),
    schema: updateBusinessProfileSchema,
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
          openSnackbar("Profil Bisnis berhasil diperbaharui");
          const timer = setTimeout(() => {
            router.back();
            clearTimeout(timer);
          }, 1500);
        },
      });
    }
  };

  const fetchData = () => {
    mutation.send({
      loading: true,
      service: (event) => getBusinessProfileID({ ...event, params: { id } }),
      onSuccess: (resp) => {
        startTransition(() => {
          mutation.setData(resp.data);
        });
      },
    });
  };

  React.useEffect(() => {
    if (!id) return;

    fetchData();
    return () => {
      mutation.cancel();
      mutation.reset();
    };
  }, [id]);

  return (
    <PageTemplate
      title="Ubah Profil Bisnis"
      onBack={router.back}
      onUpdate={() => {
        if (ref.current) {
          ref.current.requestSubmit();
        }
      }}
    >
      <Form
        ref={ref}
        mutation={mutation}
        validation={validation}
        onSubmit={onSubmit}
      />
      
      <SnacbarLoading loading={mutation.loading} pending={isPending} />
    </PageTemplate>
  );
}
