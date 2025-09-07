import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { uniqueImage } from "@/utils/format";
import api from "@/utils/api";

const uploadDir = path.join(
  process.cwd(),
  process.env.NEXT_PUBLIC_IMAGE_PATH ?? "uploads/images"
);
fs.mkdirSync(uploadDir, { recursive: true });

export const POST = api(async (req) => {
  const payload = await req.formData();

  const blob = payload.get("file") as Blob;
  const fileName = `${uniqueImage("webp")}`;
  const arrayBuffer = await blob.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const url = `/images/${fileName}`;

  fs.writeFileSync(path.join(uploadDir, fileName), buffer);

  return NextResponse.json({ url }, { status: 201 });
});
