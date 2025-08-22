import Resource from "frexp/lib/Resource";
import UserResource from "./user.resource";
import BusinessSocialResource from "./business-social.resource";
import BusinessContactResource from "./business-contact.resource";
import ValidationResource from "./validation.resource";
import ServiceResource from "./service.resource";

export default class BusinessProfileResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      userId: +this.userId,
      businessName: this.businessName,
      description: this.description,
      address: this.address,
      websiteUrl: this.websiteUrl,
      status: this.status,
      user: new UserResource(this.User),
      imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${
        this.imageUrl ?? "/images/placeholder.webp"
      }`,
      businessSocial: BusinessSocialResource.collection(this.BusinessSocial),
      businessContact: BusinessContactResource.collection(this.BusinessContact),
      validations: ValidationResource.collection(this.validations),
      services: ServiceResource.collection(this.Service)
    };
  }
}
