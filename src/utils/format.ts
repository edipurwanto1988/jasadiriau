import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { ZodError } from "zod";
dayjs.extend(utc);
dayjs().utcOffset(7);

export const ccFormat = (value: any, defaultValue = "") => {
  if (!value) {
    return defaultValue;
  }

  var v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  var matches = v.match(/\d{4,16}/g);
  var match = (matches && matches[0]) || "";
  var parts: any[] = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
};

export const uniqueImage = (ext = "") => {
  return (
    Date.now() + "" + Math.round(Math.random() * 1e9) + (ext ? "." + ext : "")
  );
};

export const uniqueNumber = (number?: number) => {
  return (
    Date.now() + "" + Math.round(Math.random() * 1e9) + "" + (number || "")
  );
};

export const rupiah = (value: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

export const dateFormat = (
  value: string,
  option?: { locale?: "en" | "id"; time?: boolean; date?: boolean }
) => {
  let format = "DD-MM-YYYY";
  const opt = {
    locale: "id",
    date: true,
    ...option,
  };

  if (!opt.date) {
    format = "";
  }

  if (opt.locale === "en") {
    format = "YYYY-MM-DD";
  }

  if (opt.time) {
    if (!opt.date) {
      format = "HH:mm:ss";
    } else {
      format += " HH:mm:ss";
    }
  }

  if (value) {
    return dayjs(value).local().format(format);
  }
  return value;
};

export const parseZodError = (err: ZodError) => {
  return err.issues.map((val, i) => ({ [val.path.at(0) ?? i]: val.message }));
};

export const parseResponseError = async (
  error: any,
  message?: (msg: string) => void
) => {
  if (error instanceof Response) {
    const resp = await error.json();
    if (error.status === 422) {
    }
    if (message) {
      message(resp.message);
    }
  }
};
