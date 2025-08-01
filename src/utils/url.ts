export const route = (url: string, arg: any) => {
  let path = url;
  if (arg && typeof arg === "object" && !!Object.keys(arg).length) {
    Object.entries<any>(arg).forEach(
      ([param, value]) => (path = url.replace(`:${param}`, value))
    );
  }

  return path;
};

export const parseUrlToObject = (search: URLSearchParams) => {
  if (search.size === 0) {
    return undefined;
  }
  return Object.fromEntries(search.entries());
};
