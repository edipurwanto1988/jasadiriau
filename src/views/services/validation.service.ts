import { UpdateValidationSchema } from "@/schema/validation.schema";
const url = {
  index: `${process.env.NEXT_PUBLIC_BASE_URL}/api/validation`,
};

export const postValidation = async (
  data: UpdateValidationSchema
): Promise<HttpResponse<Validation>> => {
  const res = await fetch(url.index, {
    method: "post",
    next: { revalidate: 0 },
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw res;
  }
  return res.json();
};
