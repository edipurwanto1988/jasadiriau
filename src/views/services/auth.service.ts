import { EventSend } from "ezhooks";

const url = {
  register: `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
};

export const postRegister = async (event?: EventSend) => {
  const res = await fetch(url.register, {
    method: "post",
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
