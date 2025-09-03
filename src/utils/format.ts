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

export const rupiah = (value?: number) => {
  if(value === null || value === undefined) return ''
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(value);
};

export const dateFormat = (
  value?: string,
  option?: { locale?: "en" | "id"; time?: boolean; date?: boolean }
) => {
  if (!value) return "-";
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

export const parseFormData = (formData: FormData) => {
  const result: any = {};

  for (const [key, value] of formData.entries()) {
    const path = key.match(/[^[\]]+/g) || [];
    let current = result;

    path.forEach((part, idx) => {
      const isLast = idx === path.length - 1;
      const next = path[idx + 1];
      const isArrayIndex = /^\d+$/.test(next || "");

      if (isLast) {
        if (Array.isArray(current)) {
          current[+part] = value;
        } else {
          current[part] = value;
        }
      } else {
        if (!current[part]) {
          current[part] = isArrayIndex ? [] : {};
        }
        current = current[part];
      }
    });
  }

  return result;
};

export const paginate = (search: URLSearchParams) => {
  if (search.has("page") && search.has("perPage")) {
    const skip = +(search.get("page") ?? 0) * +(search.get("perPage") ?? 25);
    const take = +(search.get("perPage") ?? 25);
    return { skip: +skip, take: +take };
  }

  return { skip: 0, take: 25 };
};

export const formatIndoPhone = (input: string) => {
  // Hapus semua karakter non-digit
  let digits = input.replace(/\D/g, "");

  // Kalau mulai dengan "0", ganti ke "62"
  if (digits.startsWith("0")) {
    digits = "62" + digits.slice(1);
  }

  // Kalau mulai dengan "620", rapikan jadi "62"
  if (digits.startsWith("620")) {
    digits = "62" + digits.slice(3);
  }

  // Tambahkan "+" di depan
  digits = "+" + digits;

  // Format menjadi +62 812-3456-7890
  return digits.replace(
    /^(\+62)(\d{3})(\d{3,4})(\d{3,4})$/,
    (_, code, p1, p2, p3) => `${code} ${p1} ${p2} ${p3}`
  );
}