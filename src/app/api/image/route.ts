import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { uniqueImage } from "@/utils/format";
import api from "@/utils/api";
import { createImageSchema } from "@/schema/image.schema";
import { createImage } from "@/http/services/image.service";
import omit from "lodash/omit";

const uploadDir = path.join(
  process.cwd(),
  process.env.NEXT_PUBLIC_IMAGE_PATH ?? "uploads/images"
);
fs.mkdirSync(uploadDir, { recursive: true });

export const POST = api(async (req) => {
  const payload = await req.formData();
  const validated = await createImageSchema.parseAsync(
    Object.fromEntries(payload.entries())
  );

  const blob = payload.get("file") as Blob;
  const fileName = `${uniqueImage("webp")}`;
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const url = `/images/${fileName}`;

  fs.writeFileSync(path.join(uploadDir, fileName), buffer);
  await createImage({ ...omit(validated, ["file"]), url });

  return NextResponse.json({ url }, { status: 201 });
});
