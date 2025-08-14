import { EventSend } from "ezhooks";

const url = {
  advantage: `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/advantage`,
};

export const getAdvantage = async (
  event?: EventSend
): Promise<HttpResponse<Advantage[]>> => {
  let urlQuery = url.advantage;
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

export const postAdvantage = async (event?: EventSend) => {
  const isNewRecord = !!event!.data!().id;
  const res = await fetch(url.advantage, {
    method: isNewRecord ? "post" : "put",
   signal: event?.ctr?.signal,
next: { revalidate: 0 },
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...event!.data!() }),
  });

   if (!res.ok) {
    throw res;
  }

  return res.json();
};

export const deleteAdvantage = (event?: EventSend) => {
  return fetch(`${url.advantage}/${event?.params?.id}`, {
    method: "delete",
   signal: event?.ctr?.signal,
next: { revalidate: 0 },
  });
};

export const getAdvantageID = async (
  event?: EventSend
): Promise<HttpResponse<Advantage>> => {
  const res = await fetch(`${url.advantage}/${event?.params?.id}`, {
   signal: event?.ctr?.signal,
next: { revalidate: 0 },
  });
  return res.json();
};
