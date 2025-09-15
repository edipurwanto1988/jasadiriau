import { EventSend } from "ezhooks";

export const businessUrl = {
  business: `${process.env.NEXT_PUBLIC_BASE_URL}/api/business-profile`,
  meta: `${process.env.NEXT_PUBLIC_BASE_URL}/api/business-profile/meta`,
  interactive: `${process.env.NEXT_PUBLIC_BASE_URL}/api/business-profile/interactive`,
};

export const getBusinessProfile = async (
  event?: EventSend
): Promise<HttpResponse<BusinessProfile[]>> => {
  let urlQuery = businessUrl.business;
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

export const getBusinessInteractive = async (
  event?: EventSend
): Promise<HttpResponse<BusinessView[]>> => {
  let urlQuery = businessUrl.interactive;
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

export const postBusinessProfile = async (event?: EventSend) => {
  const isNewRecord = !(event?.data && event.data().id);
  const res = await fetch(businessUrl.business, {
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

export const deleteBusinessProfile = (event?: EventSend) => {
  return fetch(`${businessUrl.business}/${event?.params?.id}`, {
    method: "delete",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });
};

export const getBusinessProfileID = async (
  event?: EventSend
): Promise<HttpResponse<BusinessProfile>> => {
  const res = await fetch(`${businessUrl.business}/${event?.params?.id}`, {
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });
  return res.json();
};

export const postAccountBusinessProfile = async (
  event?: EventSend
): Promise<HttpResponse<BusinessProfile>> => {
  const isNewRecord = !(event?.data && event.data().id);
  const res = await fetch(businessUrl.business, {
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

export const deleteAccountBusinessProfile = (event?: EventSend) => {
  return fetch(`${businessUrl.business}/${event?.params?.id}`, {
    method: "delete",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });
};

export const getBusinessMeta = async (event?: EventSend) => {
  const res = await fetch(businessUrl.meta, {
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });
  return res.json();
};
