import { EventSend } from "ezhooks";

const url = {
  current: `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/current`,
};

export const getCurrent = async (
  event?: EventSend
): Promise<HttpResponse<User>> => {
  const res = await fetch(url.current, {
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw res;
  }

  return res.json();
};
