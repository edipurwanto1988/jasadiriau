import { EventSend } from "ezhooks";
import * as utils from "ezhooks/lib/utils";

const url = {
  slider: `/api/admin/slider`,
};

export const getSlider = async (
  event?: EventSend
): Promise<HttpResponse<Slider[]>> => {
  const res = await fetch(url.slider, {
    signal: event?.ctr?.signal,
  });

  return res.json();
};

export const postSlider = async (event?: EventSend) => {
  const isNewRecord = !event!.data!().id;

  const res = await fetch(url.slider, {
    method: isNewRecord ? "post" : "put",
    signal: event?.ctr?.signal,
    body: utils.toFormData(event!.data!()),
  });

  if (!res.ok) {
    throw res;
  }
  return res.json();
};

export const putSlider = async (event?: EventSend) => {
  const res = await fetch(url.slider, {
    method: "put",
    signal: event?.ctr?.signal,
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...event!.data!() }),
  });

  return res.json();
};

export const deleteSlider = (event?: EventSend) => {
  return fetch(`${url.slider}/${event?.params?.id}`, {
    method: "delete",
    signal: event?.ctr?.signal,
  });
};

export const getSliderID = async (
  event?: EventSend
): Promise<HttpResponse<Slider>> => {
  const res = await fetch(`${url.slider}/${event?.params?.id}`, {
    signal: event?.ctr?.signal,
  });
  return res.json();
};
