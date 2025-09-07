import { EventSend } from "ezhooks";

export const pageUrl = {
  index: `${process.env.NEXT_PUBLIC_BASE_URL}/api/page`,
};

export const getPages= async (
  event?: EventSend
): Promise<HttpResponse<Page[]>> => {
  let urlQuery = pageUrl.index;
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

export const postPage = async (event?: EventSend) => {
  const isNewRecord = !(event?.data && event.data().id);
  const res = await fetch(pageUrl.index, {
    method: isNewRecord ? "post" : "put",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
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

export const deletePage = (event?: EventSend) => {
  return fetch(`${pageUrl.index}/${event?.params?.id}`, {
    method: "delete",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });
};
