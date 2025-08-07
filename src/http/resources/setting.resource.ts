import Resource from "frexp/lib/Resource";

export default class SettingResource extends Resource {
  toArray() {
    return {
      siteName: this.siteName,
      logo: this.logo,
      description: this.description,
      metaKeywords: this.metaKeywords,
      metaTitle: this.metaTitle,
      metaDescription: this.metaDescription,
      ogTitle: this.ogTitle,
      ogDescription: this.ogDescription,
      googleSiteVerification: this.googleSiteVerification,
      contactEmail: this.contactEmail,
      contactPhone: this.contactPhone,
      address: this.address,
      facebookUrl: this.facebookUrl,
      instagramUrl: this.instagramUrl,
      twitterUrl: this.twitterUrl,
      linkedinUrl: this.linkedinUrl,
      youtubeUrl: this.youtubeUrl,
      whatsappUrl: this.whatsappUrl,
    };
  }
}
