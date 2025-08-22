import Resource from "frexp/lib/Resource";
import ValidationResource from "./validation.resource";

export default class ServiceResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      name: this.name,
      slug: this.slug,
      description: this.description,
      price: +this.price,
      categoryId: +this.categoryId,
      profileId: +this.profileId,
      status: this.status,
      terms: this.terms,
      bussinessName: this.businessProfile?.businessName,
      categoryName: this.category?.name,
      imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${
        this.imageUrl ?? "/images/placeholder.webp"
      }`,
      validations: ValidationResource.collection(this.validations),
    };
  }
}
