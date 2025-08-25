import Resource from "frexp/lib/Resource";

export default class CategoryResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      name: this.name,
      slug: this.slug,
      imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${
        this.imageUrl ?? "/images/placeholder.webp"
      }`,
      children: this.merge(this.children, (value) =>
        CategoryResource.collection(value.children)
      ),
    };
  }
}
