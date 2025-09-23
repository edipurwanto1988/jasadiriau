import { EventSend } from "ezhooks";

export const userUrl = {
  index: `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`,
  role: `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/role`,
  current: `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/current`,
  check: `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/check`,
};

export const getUser = async (
  event?: EventSend
): Promise<HttpResponse<User[]>> => {
  let urlQuery = userUrl.index;
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

export const getCurrent = async (
  event?: EventSend
): Promise<HttpResponse<User>> => {
  const res = await fetch(userUrl.current, {
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw res;
  }

  return res.json();
};

export const getCheck = async (
  event?: EventSend
): Promise<
  HttpResponse<{
    dontHaveBusiness: boolean;
    dontHaveService: boolean;
    login: boolean;
  }>
> => {
  const res = await fetch(userUrl.check, {
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw res;
  }

  return res.json();
};

export const updateRole = async (event?: EventSend) => {
  const res = await fetch(userUrl.role, {
    method: "put",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(event?.data!()),
  });

  return res.json();
};
