import { EventSend } from "ezhooks";

const url = {
  index: `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/validation`,
};

export const postValidation = async (
  event?: EventSend
): Promise<HttpResponse<Validation>> => {
  const res = await fetch(url.index, {
    method: "post",
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
