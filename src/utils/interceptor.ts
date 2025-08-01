export default function (watch) {
  return async function (...args) {
    const date = new Date();
    const offset = date.getTimezoneOffset() / -60;

    let [resource, config] = args;

    const cfg = {
      headers: {
        TimeZoneOffset: offset,
        ...(!!localStorage.getItem("token") && {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }),

        ...config?.headers,
      },
    };

    const { headers, ...other } = config;

    if (other) {
      Object.assign(cfg, other);
    }

    let response = await watch(resource, cfg);
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
      }
      throw response;
    }

    return response;
  };
}
