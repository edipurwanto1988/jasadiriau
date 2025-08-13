"use client";
import React from "react";
import useMutation, { UseMutation } from "ezhooks/lib/useMutation";
import {
  createBusinessProfileSchema,
  CreateBusinessProfileSchema,
} from "@/schema/business-profile.schema";
import { dummyBusinessProfile, dummySocials } from "@/lib/dummy";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Image from "next/image";
import Toolbar from "@mui/material/Toolbar";
import LoadComponent from "@/views/components/base/LoadComponent/LoadComponent";
import { formatPhoneNumber } from "@/utils/input";
import useZod, { UseZod } from "@/views/hooks/useZod";
import { parseFormData, parseResponseError } from "@/utils/format";
import { useSnackbar } from "@/views/contexts/SnackbarContext";
import { postBusinessProfile } from "@/views/services/business-profile.service";
import { useRouter } from "next/router";
import MainTemplate from "@/views/components/templates/MainTemplate";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";


export default function Page() {

  return (
    <MainTemplate>
      <Stack height={'100%'} justifyContent={'center'} alignItems={"center"}>
        <Stack>
            <Avatar />
        </Stack>
      </Stack>
    </MainTemplate>
  );
}
