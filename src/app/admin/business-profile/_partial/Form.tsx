"use client";
import React from "react";
import { UseMutation } from "ezhooks/lib/useMutation";
import { CreateBusinessProfileSchema } from "@/schema/business-profile.schema";
import { dummySocials } from "@/lib/dummy";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Image from "next/image";
import Toolbar from "@mui/material/Toolbar";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { formatPhoneNumber } from "@/utils/input";
import { UseZod } from "@/views/hooks/useZod";

const TextField = LoadComponent(() => import("@mui/material/TextField"));

type Props = {
  ref: React.RefObject<HTMLFormElement | null>;
  mutation: UseMutation<CreateBusinessProfileSchema>;
  validation: UseZod<CreateBusinessProfileSchema>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

const Form = ({ ref, mutation, validation, onSubmit }: Props) => {
  return (
    <Stack
      ref={ref}
      component={"form"}
      noValidate
      direction={"row"}
      overflow={"hidden"}
      spacing={3}
      justifyContent={'center'}
      onSubmit={onSubmit}
    >
      <Stack
        direction={"column"}
        p={2}
        spacing={4}
        flexBasis={"40%"}
        sx={{ overflow: "hidden auto" }}
      >
        <Stack direction={"column"} spacing={2}>
          <ListItemText
            primary="Data Pemilik Bisnis"
            secondary="Masukkan informasi akun pemilik utama dari bisnis ini."
          />

          <Stack
            direction={"column"}
            spacing={2}
            sx={{
              "& >div": {
                width: "75%",
              },
            }}
          >
            <div>
              <TextField
                label="Nama"
                placeholder="Masukkan nama"
                required
                fullWidth
                name="user[name]"
                defaultValue={mutation.value("user.name", "")}
                error={validation.error("user.name")}
                helperText={validation.message("user.name")}
              />
            </div>

            <div>
              <TextField
                required
                label="Nomor Kontak"
                placeholder="Masukkan nomor kontak"
                name="user[phoneNumber]"
                fullWidth
                error={validation.error("user.phoneNumber")}
                helperText={validation.message("user.phoneNumber")}
              />
            </div>

            <div>
              <TextField
                label="Email"
                type="email"
                name="user[email]"
                defaultValue={mutation.value("user.email", "")}
                required
                placeholder="Masukkan alamat email"
                fullWidth
                error={validation.error("user.email")}
                helperText={validation.message("user.email")}
              />
            </div>
          </Stack>
        </Stack>

        <Stack direction={"column"} spacing={2}>
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
              label="Deskripsi"
              rows={4}
              multiline
              placeholder="Masukkan deskripsi"
              name="description"
              defaultValue={mutation.value("description", "")}
            />

            <TextField
              label="Alamat"
              rows={4}
              multiline
              required
              placeholder="Masukkan alamat"
              name="address"
              defaultValue={mutation.value("address", "")}
              error={validation.error("address")}
              helperText={validation.message("address")}
            />

            <TextField
              label="Alamat Website"
              type="url"
              name="websiteUrl"
              placeholder="Masukkan alamat website"
              defaultValue={mutation.value("websiteUrl", "")}
              error={validation.error("websiteUrl")}
              helperText={validation.message("websiteUrl")}
            />

            <TextField
              label="Status"
              select
              slotProps={{
                select: {
                  native: true,
                },
              }}
              name="status"
              defaultValue={mutation.value("status", "")}
            >
              <option value={"active"}>Aktif</option>
              <option value={"inactive"}>Tidak Aktif</option>
            </TextField>
          </Stack>
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

        <Toolbar />
      </Stack>

      <Stack direction={"column"} p={2} flexBasis={"30%"}>
        <Stack direction={"column"} spacing={2}>
          <ListItemText
            primary="Media Sosial Bisnis"
            secondary="Cantumkan media sosial untuk memperkuat branding dan menjangkau pelanggan."
          />

          <Stack direction={"column"} spacing={2}>
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
                  defaultValue={mutation.value(`businessSocial.${i}.url`, "")}
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
  );
};

export default Form;
