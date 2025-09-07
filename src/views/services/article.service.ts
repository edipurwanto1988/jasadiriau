import { EventSend } from "ezhooks";
import * as utils from "ezhooks/lib/utils";

export const articleUrl = {
  index: `${process.env.NEXT_PUBLIC_BASE_URL}/api/article`,
};

export const getArticles= async (
  event?: EventSend
): Promise<HttpResponse<Article[]>> => {
  let urlQuery = articleUrl.index;
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

export const postArticle = async (event?: EventSend) => {
  const isNewRecord = !(event?.data && event.data().id);
  const res = await fetch(articleUrl.index, {
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

export const deleteArticle = (event?: EventSend) => {
  return fetch(`${articleUrl.index}/${event?.params?.id}`, {
    method: "delete",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });
};
