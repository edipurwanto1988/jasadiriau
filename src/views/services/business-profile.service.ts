import { EventSend } from "ezhooks";

const url = {
  business: `/api/admin/business-profile`,
};

export const getBusinessProfile = async (
  event?: EventSend
): Promise<HttpResponse<BusinessProfile[]>> => {
  let urlQuery = url.business;
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

export const postBusinessProfile = async (event?: EventSend) => {
  const isNewRecord = !(event?.data && event.data().id);
  const res = await fetch(url.business, {
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

export const deleteBusinessProfile = (event?: EventSend) => {
  return fetch(`${url.business}/${event?.params?.id}`, {
    method: "delete",
    signal: event?.ctr?.signal,
  });
};

export const getBusinessProfileID = async (
  event?: EventSend
): Promise<HttpResponse<BusinessProfile>> => {
  const res = await fetch(`${url.business}/${event?.params?.id}`, {
    signal: event?.ctr?.signal,
  });
  return res.json();
};
