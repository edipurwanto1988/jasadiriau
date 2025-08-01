export const months = [
  { index: 1, month: "Januari" },
  { index: 2, month: "Februari" },
  { index: 3, month: "Maret" },
  { index: 4, month: "April" },
  { index: 5, month: "Mei" },
  { index: 6, month: "Juni" },
  { index: 7, month: "Juli" },
  { index: 8, month: "Agustus" },
  { index: 9, month: "September" },
  { index: 10, month: "Oktober" },
  { index: 11, month: "November" },
  { index: 12, month: "Desember" },
];

export const years = Array.from(
  { length: new Date().getFullYear() - 2024 + 1 },
  (_, i) => 2024 + i
);

export const getMonthIDName = (index: number) => {
  return months.at(index - 1)?.month;
};

export const generateRandomColor = () => {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 80%)`; 
};

export const deepEqual = (obj1: any, obj2: any): boolean => {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) return false;

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
};
