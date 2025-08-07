import { EventSend } from "ezhooks";

const url = {
  category: `/api/admin/category`,
};

export const getCategory = async (
  event?: EventSend
): Promise<HttpResponse<Category[]>> => {
  let urlQuery = url.category;
  const search = new URLSearchParams(event?.params);
  if (search.size > 0) {
    urlQuery += "?";
    urlQuery += search.toString();
  }

  const res = await fetch(urlQuery, {
    signal: event?.ctr?.signal,
  });

  return res.json();
};

export const postCategory = async (event?: EventSend) => {
  const isNewRecord = !(event?.data && event.data().id);
  const res = await fetch(url.category, {
    method: isNewRecord ? "post" : "put",
    signal: event?.ctr?.signal,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(event!.data!()),
  });

  if (!res.ok) {
    throw res;
  }

  return res.json();
};

export const deleteCategory = (event?: EventSend) => {
  return fetch(`${url.category}/${event?.params?.id}`, {
    method: "delete",
    signal: event?.ctr?.signal,
  });
};

export const getCategoryID = async (
  event?: EventSend
): Promise<HttpResponse<Category>> => {
  const res = await fetch(`${url.category}/${event?.params?.id}`, {
    signal: event?.ctr?.signal,
  });
  return res.json();
};
