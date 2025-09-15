import { EventSend } from "ezhooks";
import * as utils from "ezhooks/lib/utils";

const url = {
  slider: `${process.env.NEXT_PUBLIC_BASE_URL}/api/slider`,
};

export const getSlider = async (
  event?: EventSend
): Promise<HttpResponse<Slider[]>> => {
  const res = await fetch(url.slider, {
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });

  return res.json();
};

export const postSlider = async (event?: EventSend) => {
  const isNewRecord = !(event?.data && event.data().id);
  const res = await fetch(url.slider, {
    method: isNewRecord ? "post" : "put",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
    body: utils.toFormData(event!.data!()),
  });

  if (!res.ok) {
    throw res;
  }
  return res.json();
};

export const deleteSlider = (event?: EventSend) => {
  return fetch(`${url.slider}/${event?.params?.id}`, {
    method: "delete",
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });
};

export const getSliderID = async (
  event?: EventSend
): Promise<HttpResponse<Slider>> => {
  const res = await fetch(`${url.slider}/${event?.params?.id}`, {
    signal: event?.ctr?.signal,
    next: { revalidate: 0 },
  });
  return res.json();
};
