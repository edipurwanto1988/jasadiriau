import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import omit from "lodash/omit";
import { createMultiImageSchema } from "@/schema/image.schema";
import { createMultImage } from "@/http/services/image.service";
import { uniqueImage } from "@/utils/format";
import api from "@/utils/api";

const uploadDir = path.join(
  process.cwd(),
  process.env.NEXT_PUBLIC_IMAGE_PATH ?? "uploads/images"
);
fs.mkdirSync(uploadDir, { recursive: true });

export const POST = api(async (req) => {
  const payload = await req.formData();
  const inputfiles: Blob[] = [];

  for (const [key, value] of payload.entries()) {
    if (key.startsWith("files[")) {
      if (value instanceof Blob) {
        inputfiles.push(value);
      }
    }
  }
  
  const validated = await createMultiImageSchema.parseAsync({
    entityType: payload.get("entityType"),
    entityId: payload.get("entityId"),
    files: inputfiles,
  });

  const files = validated.files;

  let urls: string[] = [];
  if (files.length) {
    for (const file of files) {
      const fileName = `${uniqueImage("webp")}`;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const url = `/images/${fileName}`;
      fs.writeFileSync(path.join(uploadDir, fileName), buffer);
      urls.push(url);
    }
  }

  await createMultImage({
    ...omit(validated, ["files"]),
    url: urls,
  });

  return new NextResponse(null, { status: 204 });
});
