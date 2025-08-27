import api from "@/utils/api";
import {
  createCatgorySchema,
  updateCategorySchema,
} from "@/schema/category.schema";
import CategoryResource from "@/http/resources/category.resource";
import {
  categoryPaginate,
  createCategory,
  updateCategory,
} from "@/http/services/category.service";
import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { uniqueImage } from "@/utils/format";
import omit from "lodash/omit";

const uploadDir = path.join(process.cwd(), process.env.NEXT_PUBLIC_IMAGE_PATH ?? "uploads/images");
fs.mkdirSync(uploadDir, { recursive: true });

export const GET = api(async (req) => {
  const [count, data] = await categoryPaginate(req.nextUrl.searchParams);
  return NextResponse.json(CategoryResource.paginate({ total: count, data }));
});

export const POST = api(async (req) => {
  const payload = await req.formData();
  let url;
  const blob = payload.get("file") as Blob;
  if (blob) {
    const ext = blob.type.split("/")[1] || "bin";
    const fileName = `${uniqueImage(ext)}`;
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(path.join(uploadDir, fileName), buffer);
    url = `/images/${fileName}`;
  }

  const validated = await createCatgorySchema.parseAsync(
    Object.fromEntries(payload.entries())
  );
  const result = await createCategory({ ...omit(validated, ["file"]), url });

  return NextResponse.json(new CategoryResource(result), { status: 201 });
});

export const PUT = api(async (req) => {
  const payload = await req.formData();

  let url;
  const blob = payload.get("file") as Blob;
  if (blob) {
    const ext = blob.type.split("/")[1] || "bin";
    const fileName = `${uniqueImage(ext)}`;
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(path.join(uploadDir, fileName), buffer);
    url = `/images/${fileName}`;
  }
  const validated = await updateCategorySchema.parseAsync(
    Object.fromEntries(payload.entries())
  );
  const result = await updateCategory({ ...omit(validated, ["file"]), url });
  return NextResponse.json(new CategoryResource(result));
});
