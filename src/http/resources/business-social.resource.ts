import Resource from "frexp/lib/Resource";

export default class BusinessSocialResource extends Resource {
  toArray() {
    return {
      id: +this.id,
      profileId: +this.profileId,
      name: this.name,
      platform: this.platform,
      url: this.url,
    };
  }
}
