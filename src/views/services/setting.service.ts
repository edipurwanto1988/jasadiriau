import { EventSend } from "ezhooks";
import * as utils from "ezhooks/lib/utils";

const url = {
  setting: `/api/admin/setting`,
};

export const getSetting = async (
  event?: EventSend
): Promise<HttpResponse<Setting[]>> => {
  const res = await fetch(url.setting, {
    signal: event?.ctr?.signal,
  });

  return res.json();
};

export const postSetting = async (event?: EventSend) => {
  const res = await fetch(url.setting, {
    method: "post",
    signal: event?.ctr?.signal,
    body: utils.toFormData(event!.data!())
  });

  if (!res.ok) {
    throw res;
  }
  return res.json();
};
