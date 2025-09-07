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

type ReadTimeOptions = {
  wpm?: number;                 // kata per menit (default 200)
  imageStart?: number;          // detik untuk gambar pertama (default 12)
  imageDecay?: number;          // pengurangan detik gambar berikutnya (default 1s)
  imageMin?: number;            // batas bawah detik per gambar (default 3)
  codePenalty?: number;         // faktor bobot untuk kata di <pre><code> (default 1.5)
};

type ReadTimeResult = {
  words: number;
  images: number;
  seconds: number;
  minutes: number;              // dibulatkan ke atas
  human: string;                // e.g. "3 menit baca"
};

export const estimateReadTimeFromHTML =(
  html: string,
  opts: ReadTimeOptions = {}
): ReadTimeResult => {
  const {
    wpm = 200,
    imageStart = 12,
    imageDecay = 1,
    imageMin = 3,
    codePenalty = 1.5,
  } = opts;

  if (!html) {
    return { words: 0, images: 0, seconds: 0, minutes: 0, human: "0 menit" };
  }

  // --- hitung gambar ---
  const images = (html.match(/<img\b[^>]*>/gi) || []).length;
  // model: 12s utk gambar 1, 11s utk gambar 2, dst minimum 3s
  let imageSeconds = 0;
  for (let i = 0; i < images; i++) {
    const dec = Math.max(imageMin, imageStart - i * imageDecay);
    imageSeconds += dec;
  }

  // --- hitung kata teks umum ---
  const textOnly = html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<\/?[^>]+>/g, " ")      // strip tag
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();

  const wordCount = textOnly ? textOnly.split(/\s+/).length : 0;

  // --- bobot khusus untuk blok kode (biasanya lebih lambat dibaca) ---
  // hitung kata di dalam <pre> atau <code> lalu beri penalty
  const codeBlocks = (html.match(/<(pre|code)\b[\s\S]*?<\/\1>/gi) || []);
  let codeWords = 0;
  for (const block of codeBlocks) {
    const blockText = block
      .replace(/<\/?[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
    if (blockText) codeWords += blockText.split(/\s+/).length;
  }
  const nonCodeWords = Math.max(0, wordCount - codeWords);
  const effectiveWords = nonCodeWords + Math.round(codeWords * codePenalty);

  // --- total detik ---
  const readingSeconds = effectiveWords / (wpm / 60);
  const totalSeconds = Math.round(readingSeconds + imageSeconds);

  const minutes = Math.ceil(totalSeconds / 60);

  const human =
    minutes < 1
      ? `${totalSeconds}s baca`
      : `${minutes} menit baca`;

  return {
    words: wordCount,
    images,
    seconds: totalSeconds,
    minutes,
    human,
  };
}
