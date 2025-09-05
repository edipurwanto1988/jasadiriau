'use client';

import InputSelectUncontrolled from "@/views/components/base/Input/InputSelectUncontrolled";
import { useRouter } from "next/navigation";

type Props = {
  slug?: string;
  categories: {
    id: number;
    name: string;
    slug: string;
    imageUrl: string | null;
  }[];
};

export const revalidate = 60;

export default function SelectCategory({ slug, categories }: Props) {
  const router = useRouter();
  return (
    <InputSelectUncontrolled
      name="slug"
      items={categories.map((v) => ({
        primary: v.name,
        value: v.slug,
      }))}
      variant="outlined"
      sx={{ flexBasis: "30%" }}
      defaultValue={slug}
      onChange={(e) => router.push(`/category/${e.target.value}`)}
    />
  );
}
