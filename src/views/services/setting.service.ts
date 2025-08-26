import { EventSend } from "ezhooks";
import * as utils from "ezhooks/lib/utils";

export const settingUrl = {
  setting: `${process.env.NEXT_PUBLIC_BASE_URL}/api/setting`,
};

export const getSetting = async (
  event?: EventSend
): Promise<HttpResponse<Setting[]>> => {
  const res = await fetch(settingUrl.setting, {
   signal: event?.ctr?.signal,
next: { revalidate: 0 },
  });

  return res.json();
};

export const postSetting = async (event?: EventSend) => {
  const res = await fetch(settingUrl.setting, {
    method: "post",
   signal: event?.ctr?.signal,
next: { revalidate: 0 },
    body: utils.toFormData(event!.data!())
  });

  if (!res.ok) {
    throw res;
  }
  return res.json();
};
