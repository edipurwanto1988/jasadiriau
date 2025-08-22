import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import omit from "lodash/omit";
import { createImageSchema } from "@/schema/image.schema";
import { createImage } from "@/http/services/image.service";
import { uniqueImage } from "@/utils/format";
import api from "@/utils/api";

const uploadDir = path.join(process.cwd(), "public", "images");
fs.mkdirSync(uploadDir, { recursive: true });

export const POST = api(async (req) => {
  const payload = await req.formData();
  const validated = await createImageSchema.parseAsync(
    Object.fromEntries(payload.entries())
  );

  const blob = payload.get("file") as Blob;
  const ext = blob.type.split("/")[1] || "bin";
  const fileName = `${uniqueImage(ext)}`;
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const url = `/images/${fileName}`;

  const result = await createImage({ ...omit(validated, ["file"]), url });
  fs.writeFileSync(path.join(uploadDir, fileName), buffer);

  return NextResponse.json({ data: result }, { status: 201 });
});
