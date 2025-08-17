"use client";
import React from "react";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Image from "next/image";
import Button from "@mui/material/Button";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import InputAdornment from "@mui/material/InputAdornment";
import { formatPhoneNumber } from "@/utils/input";
import { dummySocials } from "@/lib/dummy";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { parseFormData, parseResponseError } from "@/utils/format";
import { postAccountBusinessProfile } from "@/views/services/business-profile.service";
import { useRouter } from "next/navigation";
import { createAccountBusinessProfileSchema } from "@/schema/business-profile.schema";
import { dummyBusinessProfile } from "@/lib/dummy";
import useMutation from "ezhooks/lib/useMutation";
import useZod from "@/views/hooks/useZod";
import PageTemplate from "@/views/components/templates/PageTemplate";

const TextField = LoadComponent(() => import("@mui/material/TextField"));
const LanguageOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/LanguageOutlined")
);

const AccountCreateBusiness = () => {
  const router = useRouter();
  const openSnackbar = useSnackbar();

  const mutation = useMutation({
    defaultValue: dummyBusinessProfile,
  });

  const validation = useZod({
    data: mutation.data(),
    schema: createAccountBusinessProfileSchema,
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
        service: postAccountBusinessProfile,
        onSuccess: (resp) => {
          openSnackbar("Profil bisnis Anda sudah berhasil dibuat.");
          const timer = setTimeout(() => {
            router.push(`/account/business-profile/${resp.data.id}`);
            clearTimeout(timer);
          }, 1500);
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
    <PageTemplate title="Buat Bisnis Profil" onBack={() => router.back()}>
      <Box sx={{ overflow: "hidden auto" }}>
        <Stack
          direction={"row"}
          component={"form"}
          noValidate
          overflow={"hidden"}
          spacing={4}
          justifyContent={"center"}
          onSubmit={onSubmit}
          px={3}
          py={2}
        >
          <Stack direction={"column"} flexGrow={1} spacing={4}>
            <ListItemText
              primary="Profil Bisnis"
              secondary="Lengkapi informasi bisnis Anda untuk tampil lebih profesional."
            />

            <Stack direction={"column"} spacing={2} sx={{}}>
              {mutation.has(`id`) ? (
                <input type="hidden" name={`id`} value={mutation.value(`id`)} />
              ) : null}

              <TextField
                label="Nama Profil"
                placeholder="Masukkan nama profil bisnis"
                required
                name="businessName"
                defaultValue={mutation.value("businessName", "")}
                error={validation.error("businessName")}
                helperText={validation.message("businessName")}
              />

              <TextField
                label="Alamat"
                rows={2}
                multiline
                required
                placeholder="Masukkan alamat"
                name="address"
                defaultValue={mutation.value("address", "")}
                error={validation.error("address")}
                helperText={validation.message("address")}
              />

              <TextField
                label="Deskripsi"
                rows={6}
                multiline
                placeholder="Masukkan deskripsi"
                name="description"
                defaultValue={mutation.value("description", "")}
              />
            </Stack>

            <Stack direction={"column"} spacing={2}>
              <ListItemText
                primary="Kontak WhatsApp Bisnis"
                secondary="Tambahkan nomor WhatsApp agar pelanggan dapat menghubungi Anda dengan mudah."
              />

              <Stack direction={"column"} spacing={2}>
                <div>
                  {mutation.has(`businessContact.0.id`) ? (
                    <input
                      type="hidden"
                      name={`businessContact.0.id`}
                      value={mutation.value(`businessContact.0.id`)}
                    />
                  ) : null}

                  <TextField
                    name="businessContact[0][whatsappNumber]"
                    defaultValue={mutation.value(
                      "businessContact.0.whatsappNumber",
                      ""
                    )}
                    label="Nomor WhatsApp"
                    placeholder="81234567890"
                    error={validation.error("businessContact.0.whatsappNumber")}
                    helperText={validation.message(
                      "businessContact.0.whatsappNumber"
                    )}
                    onChange={(e) => {
                      e.target.value = formatPhoneNumber(e.target.value);
                    }}
                    slotProps={{
                      input: {
                        startAdornment: (
                          <Box mr={0.5} mb={0.5} sx={{ whiteSpace: "nowrap" }}>
                            +62 -
                          </Box>
                        ),
                      },
                    }}
                  />
                </div>
              </Stack>
            </Stack>

            <Box>
              <Button
                loading={mutation.processing}
                disabled={mutation.processing}
                variant="contained"
                disableElevation
                type="submit"
              >
                Tambah Bisnis
              </Button>
            </Box>
          </Stack>

          <Stack direction={"column"} spacing={3} flexBasis={"40%"}>
            <Stack direction={"column"} spacing={2}>
              <ListItemText
                primary="Media Sosial Bisnis"
                secondary="Cantumkan media sosial untuk memperkuat branding dan menjangkau pelanggan."
              />

              <Stack direction={"column"} spacing={2}>
                <TextField
                  label="Website(opsional)"
                  type="url"
                  name="websiteUrl"
                  placeholder="Masukkan alamat website"
                  defaultValue={mutation.value("websiteUrl", "")}
                  error={validation.error("websiteUrl")}
                  helperText={validation.message("websiteUrl")}
                  size="small"
                  slotProps={{
                    input: {
                      startAdornment: (
                        <InputAdornment position="start" sx={{ py: 2.5 }}>
                          <LanguageOutlinedIcon
                            fontSize="inherit"
                            sx={{ width: 24, height: 24 }}
                          />
                        </InputAdornment>
                      ),
                    },
                  }}
                />

                {dummySocials.map((social, i) => (
                  <React.Fragment key={i}>
                    {mutation.has(`businessSocial.${i}.id`) ? (
                      <input
                        type="hidden"
                        name={`businessSocial[${i}][id]`}
                        value={mutation.value(`businessSocial.${i}.id`)}
                      />
                    ) : null}

                    <input
                      type="hidden"
                      name={`businessSocial[${i}][platform]`}
                      value={social}
                    />
                    <input
                      type="hidden"
                      name={`businessSocial[${i}][name]`}
                      value={social}
                    />

                    <TextField
                      type="url"
                      name={`businessSocial[${i}][url]`}
                      defaultValue={mutation.value(
                        `businessSocial.${i}.url`,
                        ""
                      )}
                      label={`${social} (opsional)`}
                      placeholder={`Masukkan alamat ${social}`}
                      error={validation.error(`businessSocial.${i}.url`)}
                      helperText={validation.message(
                        "businessContact.0.whatsappNumber"
                      )}
                      size="small"
                      slotProps={{
                        input: {
                          startAdornment: (
                            <Box my={0.5} mr={1}>
                              <Image
                                src={`/icons/${social}.svg`}
                                alt={social}
                                width={24}
                                height={24}
                                loading="lazy"
                              />
                            </Box>
                          ),
                        },
                      }}
                    />
                  </React.Fragment>
                ))}
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </PageTemplate>
  );
};

export default AccountCreateBusiness;
