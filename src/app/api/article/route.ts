import api from "@/utils/api";

import { NextResponse } from "next/server";
import {
  createArticle,
  articlePaginate,
  updateArticle,
} from "@/http/services/article.service";
import {
  createArticleSchema,
  updateArticleSchema,
} from "@/schema/article.schema";
import ArticleResource from "@/http/resources/article.resource";
import path from "path";
import fs from "fs";
import { uniqueImage } from "@/utils/format";
import omit from "lodash/omit";

const uploadDir = path.join(
  process.cwd(),
  process.env.NEXT_PUBLIC_IMAGE_PATH ?? "uploads/images"
);
fs.mkdirSync(uploadDir, { recursive: true });

export const GET = api(async (req) => {
  const result = await articlePaginate(req.nextUrl.searchParams);
  return NextResponse.json(ArticleResource.paginate(result));
});

export const POST = api(async (req) => {
  const payload = await req.formData();

  const validated = await createArticleSchema.parseAsync(
    Object.fromEntries(payload.entries())
  );
  const blob = payload.get("file") as Blob;
  let imageUrl;
  if (blob) {
    const ext = blob.type.split("/")[1] || "bin";
    const fileName = `${uniqueImage(ext)}`;
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(path.join(uploadDir, fileName), buffer);
    imageUrl = `/images/${fileName}`;
  }
  const result = await createArticle({
    ...omit(validated, ["file"]),
    imageUrl,
  });

  return NextResponse.json(new ArticleResource(result, true), {
    status: 201,
  });
});

export const PUT = api(async (req) => {
  const payload = await req.formData();
  const validated = await updateArticleSchema.parseAsync(
    Object.fromEntries(payload.entries())
  );
  const blob = payload.get("file") as Blob;
  let imageUrl;
  if (blob) {
    const ext = blob.type.split("/")[1] || "bin";
    const fileName = `${uniqueImage(ext)}`;
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(path.join(uploadDir, fileName), buffer);
    imageUrl = `/images/${fileName}`;
  }
  const result = await updateArticle({
    ...omit(validated, ["file"]),
    imageUrl,
  });
  return NextResponse.json(new ArticleResource(result, true));
});
