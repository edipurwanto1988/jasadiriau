import { EventSend } from "ezhooks";

const url = {
  accountCurrent: `${process.env.NEXT_PUBLIC_BASE_URL}/api/account/user/current`,
};

export const getCurrent = async (
  event?: EventSend
): Promise<HttpResponse<User>> => {
  const res = await fetch(url.accountCurrent, {
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw res;
  }

  return res.json();
};
