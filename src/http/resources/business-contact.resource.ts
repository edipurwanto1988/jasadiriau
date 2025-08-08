import Resource from "frexp/lib/Resource";

export default class BusinessContactResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      profileId: +this.profileId,
      whatsappNumber: this.whatsappNumber,
    };
  }
}
