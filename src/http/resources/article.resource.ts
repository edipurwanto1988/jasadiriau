import Resource from "frexp/lib/Resource";

export default class ArticleResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      slug: this.slug,
      title: this.title,
      content: JSON.parse(this.content),
      metaTitle: this.metaTitle,
      metaDescription: this.metaDescription,
      metaKeywords: this.metaKeywords,
      status: this.status,
      thumbnail: `${process.env.NEXT_PUBLIC_BASE_URL}${
        this.thumbnail ?? "/images/placeholder.webp"
      }`,
      category: this.category,
    };
  }
}
