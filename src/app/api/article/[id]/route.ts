import ArticleResource from "@/http/resources/article.resource";
import { deleteArticle, getArticleID } from "@/http/services/article.service";
import api from "@/utils/api";

import { NextResponse } from "next/server";

export const GET = api(async (_, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getArticleID(+id);
  return NextResponse.json(new ArticleResource(data, { wrap: true }));
});

export const DELETE = api(async (_, { params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  await deleteArticle(+id);
  return new NextResponse(null, { status: 204 });
});
