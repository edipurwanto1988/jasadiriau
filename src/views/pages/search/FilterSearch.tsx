"use client";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { categoryUrl } from "@/views/services/category.service";
import { locationUrl } from "@/views/services/location.service";
import { AutocompleteChangeReason } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import React from "react";
import useSWRImmutable from "swr/immutable";

// const Autocomplete = LoadComponent(() => import("));
const SearchIcon = LoadComponent(() => import("@mui/icons-material/Search"));
type Props = {
  url: URL;
  setUrl: React.Dispatch<React.SetStateAction<URL>>;
  onSearch: () => void;
};

const FilterSearch = ({ url, setUrl, onSearch }: Props) => {
  const category = useSWRImmutable<Category[]>(categoryUrl.all, (url) =>
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => resp.data)
  );

  const categoriesMap = React.useMemo(() => {
    if (!category.data) return [];
    return category.data.map((val) => ({
      label: val.name,
      value: val.slug,
    }));
  }, [category.data]);

  const location = useSWRImmutable<Province[]>(locationUrl.province, (url) =>
    fetch(url)
      .then((resp) => resp.json())
      .then((resp) => resp.data)
  );

  const locationMap = React.useMemo(() => {
    if (!location.data) return [];
    return location.data
      .map((val) => [
        {
          label: val.name,
          value: val.slug,
        },
        ...val.regencies.flatMap((reg) => [
          { label: `${val.name}, ${reg.name}`, value: reg.slug },
          ...reg.districts.map((dis) => ({
            label: `${val.name}, ${reg.name}, ${dis.name}`,
            value: dis.slug,
          })),
        ]),
      ])
      .flatMap((v) => v);
  }, [location.data]);

  const onChange =
    (key: string) =>
    (
      _: React.SyntheticEvent<Element, Event>,
      newValue: any,
      reason: AutocompleteChangeReason
    ) => {
      setUrl((prev) => {
        const url = new URL(prev.toString());

        if (reason === "selectOption" && newValue?.value) {
          url.searchParams.set(key, newValue.value);
        } else if (reason === "clear") {
          url.searchParams.delete(key);
        }

        url.searchParams.set("page", "1");
        return url;
      });
    };

  return (
    <Stack
      direction={{
        xs: "column",
        sm: "column",
        md: "row",
        lg: "row",
        xl: "row",
      }}
      justifyContent={"space-between"}
      alignItems={{
        xs: "inherit",
        sm: "inherit",
        md: "center",
        lg: "center",
        xl: "center",
      }}
      spacing={2}
    >
      <Box flexGrow={1}>
        <TextField
          variant="outlined"
          placeholder="Pencarian penyedia dan jasa..."
          fullWidth
          name="q"
          type="search"
          value={url.searchParams.get("q") || ""}
          onChange={(e) => {
            setUrl((p) => {
              if (p.searchParams.has("q") && !e.target.value) {
                url.searchParams.delete("q");
              } else {
                p.searchParams.set("q", e.target.value);
                p.searchParams.set("page", "1");
              }
              return new URL(p);
            });
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon htmlColor="#4A739C" />
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>

      <Stack
        flexBasis={{
          xs: "100%",
          sm: "100%",
          md: "50%",
          lg: "50%",
          xl: "50%",
        }}
        direction={{
          xs: "column",
          sm: "row",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        alignItems={"center"}
        spacing={2}
      >
        <Autocomplete
          options={categoriesMap}
          fullWidth
          loading={category.isLoading}
          onChange={onChange("category")}
          value={
            categoriesMap.find(
              (f) => f.value === url.searchParams.get("category")
            ) ?? null
          }
          isOptionEqualToValue={(option: any, value: any) => {
            return option.value === value.value;
          }}
          getOptionLabel={(opt: any) => opt.label ?? ""}
          renderInput={(params) => (
            <TextField
              {...params}
              name="category"
              variant="outlined"
              placeholder="Kategori"
            />
          )}
          sx={{
            "&.MuiAutocomplete-root": {
              "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                padding: 0,
              },
            },
          }}
        />

        <Autocomplete
          options={locationMap}
          fullWidth
          size="small"
          loading={location.isLoading}
          onChange={onChange("location")}
          value={
            locationMap.find(
              (f) => f.value === url.searchParams.get("location33ree")
            ) ?? null
          }
          isOptionEqualToValue={(option: any, value: any) => {
            return option.value === value.value;
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              name="location"
              variant="outlined"
              placeholder="Lokasi"
            />
          )}
          sx={{
            "&.MuiAutocomplete-root": {
              "& .MuiOutlinedInput-root.MuiInputBase-sizeSmall": {
                padding: 0,
              },
            },
          }}
        />
      </Stack>

      <Box>
        <Button
          disableElevation
          fullWidth
          variant="contained"
          onClick={onSearch}
        >
          Cari
        </Button>
      </Box>
    </Stack>
  );
};

export default FilterSearch;
