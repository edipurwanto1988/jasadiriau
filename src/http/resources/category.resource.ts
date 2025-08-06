import Resource from "frexp/lib/Resource";

export class CategoryResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      name: this.name,
      slug: this.slug,
      children: this.merge(this.children, (value) =>
        CategoryResource.collection(value.children)
      ),
    };
  }
}
