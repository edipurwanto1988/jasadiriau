import * as z from "zod";

z.config({
  customError: (iss) => {
    let message = "Input tidak valid";
    if (iss.code === "too_small") {
      if (iss.origin === "string" && iss.input === "" && iss.minimum === 1) {
        message = "Field ini wajib diisi";
      }
    }

    if (iss.code === "invalid_type") {
      if (iss.expected === "number") {
        if (iss.input === "" || isNaN(Number(iss.input))) {
          message = "Field ini wajib diisi";
        }
      }
    }

    console.log(iss);

    return message;
  },
});

export default z;
