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

export const sendType = (value: boolean) => {
  if (value) {
    return "Antar ke Alamat";
  }
  return "Ambil Diloket";
};
