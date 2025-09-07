import Resource from "frexp/lib/Resource";

export default class PageResource extends Resource {
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
    };
  }
}
