import { EventSend } from "ezhooks";

export const menuUrl = {
  index: `${process.env.NEXT_PUBLIC_BASE_URL}/api/menu`,
  reorder: `${process.env.NEXT_PUBLIC_BASE_URL}/api/menu/reorder`,
};

export const getMenuAll = async (url: string) => {
  const req = await fetch(url);
  const resp = await req.json();
  return resp.data;
};

export const postMenu = async (event?: EventSend) => {
  const isNewRecord = !(event?.data && event.data().id);
  const res = await fetch(menuUrl.index, {
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

export const putMenutReorder = async (event?: EventSend) => {
  const res = await fetch(menuUrl.reorder, {
    method: "put",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(event!.data!().items),
  });

  if (!res.ok) {
    throw res;
  }

  return res
};

export const deleteMenu = async (event?: EventSend) => {
  return fetch(`${menuUrl.index}/${event?.params?.id}`, {
    method: "delete",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });
};
