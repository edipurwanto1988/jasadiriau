import Resource from "frexp/lib/Resource";

export default class ServiceResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      name: this.name,
      slug: this.slug,
      description: this.description,
      price: this.price,
      categoryId: +this.categoryId,
      status: this.status,
      terms: this.terms,
    };
  }
}
