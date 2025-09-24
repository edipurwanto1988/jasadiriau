import "../style.scss";
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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ButtonShare from "@/views/components/base/Button/ButtonShare";
import { dateFormat } from "@/utils/format";
import { estimateReadTimeFromHTML } from "@/utils/string";
import { getArticleAllSlug, getArticleBySlug } from "@/actions/article.action";
import { getSetting } from "@/actions/setting.action";
import {
  renderToHTMLString,
  renderToReactElement,
} from "@tiptap/static-renderer";
import { extensions } from "@/views/components/tiptap-templates/simple/extensions";
import { Metadata } from "next";
import ArticleRelated from "@/views/pages/article/ArticleRelated";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  if (process.env.SKIP) {
    return [];
  }
  const data = await getArticleAllSlug();
  return data.map((val) => ({
    slug: val.slug as string,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getArticleBySlug(slug);
  const setting = await getSetting();
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/article/${slug}`,
    },
    openGraph: {
      title: data.metaTitle ?? data.title,
      description: data.metaDescription ?? "",
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/article/${slug}`,
      siteName: setting?.siteName || "JasaDiRiau",
      images: {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/${data.thumbnail}`, // OG Image
        width: 1200,
        height: 630,
        alt: slug,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: data.metaTitle ?? data.title,
      description: data.metaDescription ?? "",
      images: [`${process.env.NEXT_PUBLIC_BASE_URL}/${data.thumbnail}`],
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const data = await getArticleBySlug(slug);

  const output = renderToReactElement({
    content: JSON.parse(data.content as string),
    extensions,
  });

  const html = renderToHTMLString({
    content: JSON.parse(data.content as string),
    extensions,
  });

  const estimated = estimateReadTimeFromHTML(html);
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
      <Stack
        direction={{
          xs: "column-reverse",
          sm: "column-reverse",
          md: "row",
          lg: "row",
          xl: "row",
        }}
        alignItems={{
          xs: "baseline",
          sm: "baseline",
          md: "center",
          lg: "center",
          xl: "center",
        }}
        spacing={2}
        mb={3}
      >
        <Stack
          flexGrow={1}
          direction={{
            xs: "column",
            sm: "column",
            md: "row",
            lg: "row",
            xl: "row",
          }}
          spacing={{
            xs: 0,
            sm: 0,
            md: 1,
            lg: 1,
            xl: 1,
          }}
        >
          <Box>
            <Typography variant="caption">
              Diposting Tanggal:{" "}
              {dateFormat(data.createdAt?.toISOString(), { time: true })}{" "}
            </Typography>
          </Box>

          <Divider
            flexItem
            orientation="vertical"
            sx={{
              xs: "none",
              sm: "none",
              md: "block",
              lg: "block",
              xl: "block",
            }}
          />

          <Box>
            <Typography variant="caption">Durasi: {estimated.human}</Typography>
          </Box>
        </Stack>

        <Breadcrumbs text={data.title} />
      </Stack>

      <div className="tiptap ProseMirror simple-editor">{output}</div>

      <ButtonShare
        shareUrl={`${process.env.NEXT_PUBLIC_BASE_URL}/article/${slug}`}
        title={data.title}
      />

      <ArticleRelated slug={data.slug ?? ""} />
    </MainTemplate>
  );
}
