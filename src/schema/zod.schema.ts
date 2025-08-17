import * as z from "zod";

z.config({
  customError: (iss) => {
    let message = "Input tidak valid";
    if (iss.code === "too_small") {
      if (iss.origin === "string" && iss.input === "" && iss.minimum === 1) {
        message = "Field ini wajib diisi";
      }
    }

    return message;
  },
});

export default z;
