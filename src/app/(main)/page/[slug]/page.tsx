import { renderToReactElement } from "@tiptap/static-renderer";
import { extensions } from "@/views/components/tiptap-templates/simple/extensions";
import { getPageAllSlug, getPageBySlug } from "@/actions/page.action";
import { Metadata } from "next";
import "@/views/components/tiptap-node/blockquote-node/blockquote-node.scss";
import "@/views/components/tiptap-node/code-block-node/code-block-node.scss";
import "@/views/components/tiptap-node/horizontal-rule-node/horizontal-rule-node.scss";
import "@/views/components/tiptap-node/list-node/list-node.scss";
import "@/views/components/tiptap-node/image-node/image-node.scss";
import "@/views/components/tiptap-node/heading-node/heading-node.scss";
import "@/views/components/tiptap-node/paragraph-node/paragraph-node.scss";
import "@/views/components/tiptap-templates/simple/simple-editor.scss";
import MainTemplate from "@/views/components/templates/MainTemplate";
import Stack from "@mui/material/Stack";
import Breadcrumbs from "@/views/components/base/Breadcrumbs";
import "../style.scss";

type Props = {
  params: Promise<{ slug: string }>;
};

// export const revalidate = 60;

// export async function generateStaticParams() {
//   if (process.env.SKIP_DB === "true") {
//     return [];
//   }
//   const data = await getPageAllSlug();
//   return data.map((val) => ({
//     slug: val.slug as string,
//   }));
// }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPageBySlug(slug);
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/page/${slug}`,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getPageBySlug(slug);

  const output = renderToReactElement({
    content: JSON.parse(data.content as string),
    extensions,
  });
  return (
    <MainTemplate
      columnProps={{
        overflow: "hidden",
        px: {
          xs: 3,
          sm: 3,
          md: 0,
          lg: 0,
          xl: 0,
        },
        py: {
          xs: 2,
          sm: 2,
          md: 0,
          lg: 0,
          xl: 0,
        },
      }}
    >
      <Stack mb={3}>
        <Breadcrumbs />
      </Stack>
      <div className="tiptap ProseMirror simple-editor">{output}</div>
    </MainTemplate>
  );
}
