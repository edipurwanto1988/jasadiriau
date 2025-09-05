export const snackCaseToWord = (text: string) => {
  return (text || "")
    .replace(/^[-_]*(.)/, (_, c) => c.toUpperCase()) // Initial char (after -/_)
    .replace(/[-_]+(.)/g, (_, c) => " " + c.toUpperCase()); // First char after each -/_
};

export const ucwords = (text: string) => {
  return (text || "").toLowerCase().replace(/\b[a-z]/g, function (letter) {
    return (letter || "").toUpperCase();
  });
};

export const convertPath = (path: string) => {
  if (!path) return "";
  return path.replace(/\.?(\d+)/g, "[$1]");
};

export const replaceSpacesToUndescore = (input: string) => {
  if (!input) return "";
  return input.replace(/\s/g, "_");
};

export const replaceUnderscore = (input: string) => {
  if (!input) return "";
  return input.replace(/_/g, " ");
};

export const cleanString = (input: string) => {
  if (!input) return "";
  return input
    .replace(/<\/?[^>]+(>|$)/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

export const yesNoText = (value: boolean) => {
  return value ? "Ya" : "Tidak";
};

export const formatCountdown = (seconds: number): string => {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
};

export const statusActiveLabel = (value: string) => {
  return value === "inactive"
    ? "Tidak Aktif"
    : value === "active"
    ? "Aktif"
    : "Menunggu Persetujuan";
};

export const actionLabel = (value?: string | null) => {
  return value === "rejected"
    ? "Ditolak"
    : value === "approved"
    ? "Disetujui"
    : "Menunggu Persetujuan";
};

export const textLoading = (loading?: boolean, pending?: boolean) => {
  return loading ? "Mengambil data..." : pending ? "Memuat data..." : "";
};

export const decodeJwtResponse = (token: string) => {
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize("NFD") // hapus accent
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // hapus karakter spesial
    .replace(/\s+/g, "-") // spasi jadi -
    .replace(/-+/g, "-"); // multiple - jadi 1
};

export const typeSearch = (type?: "profile" | "service") => {
  if(!type) return ''
  return type === "profile" ? "Penyedia Jasa" : "Jasa";
};

export function slugToWords(slug: string): string {
  if (!slug) return '';
  return slug
    .replace(/[-_]/g, ' ') // Ganti - atau _ dengan spasi
    .replace(/\b\w/g, char => char.toUpperCase()); // Kapitalisasi tiap kata
}