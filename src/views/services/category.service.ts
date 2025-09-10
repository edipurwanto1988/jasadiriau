import { EventSend } from "ezhooks";
import * as utils from "ezhooks/lib/utils";

export const categoryUrl = {
  category: `${process.env.NEXT_PUBLIC_BASE_URL}/api/category`,
  all: `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/all`,
  populer: `${process.env.NEXT_PUBLIC_BASE_URL}/api/category/populer`,
};

export const getCategory = async (
  event?: EventSend
): Promise<HttpResponse<Category[]>> => {
  let urlQuery = categoryUrl.category;
  const search = new URLSearchParams(event?.params);
  if (search.size > 0) {
    urlQuery += "?";
    urlQuery += search.toString();
  }

  const res = await fetch(urlQuery, {
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });

  return res.json();
};

export const postCategory = async (event?: EventSend) => {
  const isNewRecord = !(event?.data && event.data().id);
  const res = await fetch(categoryUrl.category, {
    method: isNewRecord ? "post" : "put",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
    body: utils.toFormData(event!.data!()),
  });

  if (!res.ok) {
    throw res;
  }

  return res.json();
};

export const deleteCategory = (event?: EventSend) => {
  return fetch(`${categoryUrl.category}/${event?.params?.id}`, {
    method: "delete",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });
};

export const getCategoryID = async (
  event?: EventSend
): Promise<HttpResponse<Category>> => {
  const res = await fetch(`${categoryUrl.category}/${event?.params?.id}`, {
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });
  return res.json();
};
