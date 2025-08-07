import api from "@/utils/api";
import { inputSettingSchema } from "@/schema/setting.schema";
import SettingResource from "@/http/resources/setting.resource";
import { createSettings, getSettingsID } from "@/http/services/setting.service";
import { NextResponse } from "next/server";

export const GET = api(async (req) => {
  const result = await getSettingsID();
  return NextResponse.json(new SettingResource(result, true));
});

export const POST = api(async (req) => {
  const payload = await req.formData();
  const validated = await inputSettingSchema.parseAsync(
    Object.fromEntries(payload.entries())
  );
  const result = await createSettings(validated);
  return NextResponse.json(new SettingResource(result, true));
});
