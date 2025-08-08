import Resource from "frexp/lib/Resource";
import UserResource from "./user.resource";
import BusinessSocialResource from "./business-social.resource";
import BusinessContactResource from "./business-contact.resource";

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
      businessSocial: BusinessSocialResource.collection(this.BusinessSocial),
      businessContact: BusinessContactResource.collection(this.BusinessContact),
    };
  }
}
