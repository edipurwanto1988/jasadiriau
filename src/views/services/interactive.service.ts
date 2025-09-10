import {
  CreateBusinessViewSchema,
  CreateContacClickSchema,
  CreateServiceViewSchema,
} from "@/schema/interactive.schema";

export const interactiveUrl = {
  contact: `${process.env.NEXT_PUBLIC_BASE_URL}/api/interactive/contact`,
  business: `${process.env.NEXT_PUBLIC_BASE_URL}/api/interactive/business`,
  service: `${process.env.NEXT_PUBLIC_BASE_URL}/api/interactive/service`,
};

export const postContact = (data: CreateContacClickSchema) => {
  return fetch(interactiveUrl.contact, {
    method: "post",
    next: { revalidate: 0 },
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const postBusinessView = (data: CreateBusinessViewSchema) => {
  return fetch(interactiveUrl.business, {
    method: "post",
    next: { revalidate: 0 },
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const postServiceView = (data: CreateServiceViewSchema) => {
  return fetch(interactiveUrl.service, {
    method: "post",
    next: { revalidate: 0 },
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
};
