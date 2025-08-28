import { EventSend } from "ezhooks";
import * as utils from "ezhooks/lib/utils";

export const imageUrl = {
  image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/image`,
  gallery: `${process.env.NEXT_PUBLIC_BASE_URL}/api/image/gallery`,
};

export const postImage = async (
  event?: EventSend
): Promise<HttpResponse<Image>> => {
  const res = await fetch(imageUrl.image, {
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

export const postGalleryImage = async (event?: EventSend) => {
  const res = await fetch(imageUrl.gallery, {
    method: "post",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
    body: utils.toFormData(event!.data!()),
  });

  if (!res.ok) {
    throw res;
  }
  return res;
};
