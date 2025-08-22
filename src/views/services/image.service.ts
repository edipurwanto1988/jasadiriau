import { EventSend } from "ezhooks";
import * as utils from "ezhooks/lib/utils";

const url = {
  image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/image`,
};

export const postImage = async (
  event?: EventSend
): Promise<HttpResponse<Image>> => {
  const res = await fetch(url.image, {
    method: "post",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
    body: utils.toFormData(event!.data!()),
  });

  if (!res.ok) {
    throw res;
  }
  return res.json();
};
