import { EventSend } from "ezhooks";

export const serviceUrl = {
  serviceAccount: `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/service`,
};

export const getService = async (
  event?: EventSend
): Promise<HttpResponse<Service[]>> => {
  let urlQuery = serviceUrl.serviceAccount;
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

export const postService = async (event?: EventSend) => {
  const isNewRecord = !(event?.data && event.data().id);
  const res = await fetch(serviceUrl.serviceAccount, {
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

export const deleteService = (event?: EventSend) => {
  return fetch(`${serviceUrl.serviceAccount}/${event?.params?.id}`, {
    method: "delete",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });
};

export const getServiceID = async (
  event?: EventSend
): Promise<HttpResponse<Service>> => {
  const res = await fetch(`${serviceUrl.serviceAccount}/${event?.params?.id}`, {
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });
  return res.json();
};
