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
import {
  createAccountBusinessProfileSchema,
  UpdateAccountBusinessProfileSchema,
  updateAccountBusinessProfileSchema,
} from "@/schema/business-profile.schema";
import { dummyBusinessProfile } from "@/lib/dummy";
import useMutation from "ezhooks/lib/useMutation";
import useZod from "@/views/hooks/useZod";
import PageTemplate from "@/views/components/templates/PageTemplate";
import useSWRImmutable from "swr/immutable";
import { locationUrl } from "@/views/services/location.service";
import InputSelectUncontrolled from "@/views/components/base/Input/InputSelectUncontrolled";
import Paper from "@mui/material/Paper";
import Toolbar from "@mui/material/Toolbar";
import SnacbarLoading from "@/views/components/base/Skeleton/SnacbarLoading";

const TextField = LoadComponent(() => import("@mui/material/TextField"));
const LanguageOutlinedIcon = LoadComponent(
  () => import("@mui/icons-material/LanguageOutlined")
);

const AccountCreateBusiness = ({
  id,
  current,
}: {
  id?: number;
  current?: UpdateAccountBusinessProfileSchema;
}) => {
  const router = useRouter();
  const openSnackbar = useSnackbar();
  const [province, setProvince] = React.useState<number | null>(null);
  const [regency, setRegency] = React.useState<number | null>(null);
  const [location, setLocation] = React.useState<Province | null>(null);
  const [time, setTime] = React.useState(0);

  const { data, isLoading } = useSWRImmutable<Province[]>(
    locationUrl.province,
    (url) =>
      fetch(url)
        .then((resp) => resp.json())
        .then((resp) => resp.data)
  );

  const mutation = useMutation({
    defaultValue: { ...dummyBusinessProfile, ...current },
  });

  const validation = useZod({
    data: mutation.data(),
    schema: id
      ? updateAccountBusinessProfileSchema
      : createAccountBusinessProfileSchema,
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
          openSnackbar(
            id
              ? "Profil bisnis Anda sudah berhasil diperbaharui."
              : "Profil bisnis anda sudah berhasil dibuat."
          );
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

  const provinces = React.useMemo(
    () => (data ?? []).map((v) => ({ primary: v.name, value: v.id })),
    [data]
  );

  const regencies = React.useMemo(
    () =>
      location
        ? location.regencies.map((v) => ({ primary: v.name, value: v.id }))
        : [],
    [data, location, province]
  );

  const districts = React.useMemo(() => {
    const find = location?.regencies?.find((v) => v.id === regency);
    if (find) {
      return find.districts.map((v) => ({ primary: v.name, value: v.id }));
    }
    return [];
  }, [data, location, regencies, province, regency]);

  React.useEffect(() => {
    if (!current) return;
    (current.businessLocation ?? []).forEach((v) => {
      setProvince(v.provinceId);
      setRegency(v.regencyId);
      setLocation((data ?? []).find((f) => f.id === +v.provinceId) ?? null);
    });

    setTime(new Date().getTime());
  }, [data, current]);

  return (
    <PageTemplate
      title={id ? "Ubah Profil Binis" : "Buat Profil Bisnis"}
      onBack={() => router.back()}
      onReload={router.refresh}
    >
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
          className="default-form"
        >
          <Stack direction={"column"} flexGrow={1} spacing={4}>
            <ListItemText
              primary="Profil Bisnis"
              secondary="Lengkapi informasi bisnis Anda untuk tampil lebih profesional."
            />

            <Stack direction={"column"} spacing={2} sx={{}}>
              {id ? <input type="hidden" name={`id`} value={id} /> : null}

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
                      name={`businessContact[0][id]`}
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

            <Stack direction={"column"} spacing={2}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <ListItemText
                  primary="Lokasi Bisnis"
                  secondary="Tambahkan lokasi bisnis anda."
                />
                <Box>
                  <Button
                    variant="outlined"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      mutation.add(
                        "businessLocation",
                        {
                          provinceId: 0,
                          regencyId: 0,
                          district: 0,
                          address: "",
                        },
                        "end"
                      );
                    }}
                  >
                    Tambah Lokasi
                  </Button>
                </Box>
              </Stack>

              <Stack direction={"column"} spacing={3}>
                {mutation.value("businessLocation", []).map((_, i) => (
                  <Stack
                    component={Paper}
                    direction={"column"}
                    spacing={2}
                    p={2}
                    variant="outlined"
                    key={i}
                  >
                    {mutation.has(`businessLocation.${i}.id`) ? (
                      <input
                        type="hidden"
                        name={`businessLocation[${i}][id]`}
                        value={mutation.value(`businessLocation.${i}.id`)}
                      />
                    ) : null}

                    <InputSelectUncontrolled
                      key={`${time + i + 1}-prov`}
                      name={`businessLocation[${i}][provinceId]`}
                      required
                      label="Provinsi"
                      items={provinces}
                      defaultValue={mutation.value(
                        `businessLocation.${i}.provinceId`,
                        ""
                      )}
                      onChange={(e) => {
                        const value = e.target.value;
                        setProvince(+value);
                        setLocation(
                          (data ?? []).find((f) => f.id === +value) ?? null
                        );
                      }}
                      error={validation.error(
                        `businessLocation.${i}.provinceId`
                      )}
                      helperText={validation.message(
                        `businessLocation.${i}.provinceId`
                      )}
                    />

                    <InputSelectUncontrolled
                      key={`${time + i + 1}-reg`}
                      name={`businessLocation[${i}][regencyId]`}
                      label="Kabupaten / Kota"
                      items={regencies}
                      required
                      defaultValue={mutation.value(
                        `businessLocation.${i}.regencyId`,
                        ""
                      )}
                      onChange={(e) => {
                        const value = e.target.value;
                        setRegency(+value);
                      }}
                      error={validation.error(
                        `businessLocation.${i}.regencyId`
                      )}
                      helperText={validation.message(
                        `businessLocation.${i}.regencyId`
                      )}
                    />

                    <InputSelectUncontrolled
                      key={`${time + i + 1}-dis`}
                      name={`businessLocation[${i}][districtId]`}
                      label="Kecamatan"
                      required
                      items={districts}
                      defaultValue={mutation.value(
                        `businessLocation.${i}.districtId`,
                        ""
                      )}
                      error={validation.error(
                        `businessLocation.${i}.districtId`
                      )}
                      helperText={validation.message(
                        `businessLocation.${i}.districtId`
                      )}
                    />

                    <TextField
                      label="Alamat"
                      rows={2}
                      multiline
                      required
                      placeholder="Masukkan alamat"
                      name={`businessLocation[${i}][address]`}
                      defaultValue={mutation.value(
                        `businessLocation.${i}.address`,
                        ""
                      )}
                    />

                    <Stack direction={"row"} justifyContent={"space-between"}>
                      {i > 0 ? (
                        <Box>
                          <Button
                            size="small"
                            color="error"
                            onClick={() =>
                              mutation.remove("businessLocation", i)
                            }
                          >
                            Hapus
                          </Button>
                        </Box>
                      ) : null}

                      {mutation.size("businessLocation") - 1 === i ? (
                        <Box>
                          <Button
                            variant="outlined"
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              mutation.add(
                                "businessLocation",
                                {
                                  provinceId: 0,
                                  regencyId: 0,
                                  district: 0,
                                  address: "",
                                },
                                "end"
                              );
                            }}
                          >
                            Tambah Lokasi
                          </Button>
                        </Box>
                      ) : null}
                    </Stack>
                  </Stack>
                ))}
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
                {id ? "Simpan Perubahan" : "Tambah Bisnis"}
              </Button>
            </Box>
            <Toolbar />
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
                        <InputAdornment position="start" sx={{ py: 1 }}>
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
      <SnacbarLoading loading={isLoading} />
    </PageTemplate>
  );
};

export default AccountCreateBusiness;
