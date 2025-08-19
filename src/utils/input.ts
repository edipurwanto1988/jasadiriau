export const formatPhoneNumber = (input: string) => {
  if (input.startsWith("0")) {
    return input.slice(1);
  }
  return input;
};

export function fillNextNumber(arr: number[]): number {
  if (arr.length === 0) return 1;

  const sorted = [...arr].sort((a, b) => a - b);

  for (let i = 0; i < sorted.length; i++) {
    const expected = i === 0 ? 1 : sorted[i - 1] + 1;
    if (sorted[i] !== expected) {
      return expected;
    }
  }

  return sorted[sorted.length - 1] + 1;
}

export const paginate = (qs: any) => {
  return {
    skip: +(qs.page ?? 0) * +(qs.perPage ?? 25),
    take: +(qs.perPage ?? 25),
  };
};
