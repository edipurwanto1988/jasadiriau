type HttpResponse<T> = {
  total?: number;
  data: T;
};

type Category = {
  id: number;
  name: string;
  slug: string;
  parentId?: number;
  children?: Category[];
};

type Advantage = {
  id: number;
  title: string;
  description: string;
  icon?: string;
  sortOrder?: number;
  status: "active" | "inactive" | "pending";
};

type Slider = {
  id: number;
  title: string;
  caption?: string;
  imageUrl: string;
  link?: string;
  sortOrder?: number;
  status: "active" | "inactive" | "pending";
};

type Setting = {
  siteName: string;
  logo?: string;
  description?: string;
  metaKeywords?: string;
  metaTitle: string;
  metaDescription: string;
  ogTitle?: string;
  ogDescription?: string;
  googleSiteVerification?: string;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  youtubeUrl?: string;
  whatsappUrl?: string;
};

type BusinessContact = {
  id: number;
  profileId: number;
  whatsappNumber: string;
  createdAt?: string; // ISO format
  updatedAt?: string;
  businessProfile?: BusinessProfile;
};

type BusinessSocial = {
  id: number;
  profileId: number;
  name?: string | null;
  platform:
    | "facebook"
    | "instagram"
    | "tiktok"
    | "whatsapp"
    | "linkedin"
    | "youtube"
    | "twitter"
    | "other";
  url: string;
  businessProfile?: BusinessProfile;
};

type BusinessProfile = {
  id: number;
  userId?: number;
  businessName: string;
  description?: string;
  address?: string;
  websiteUrl?: string;
  status: StatusType;
  user?: User;
  businessSocial?: BusinessSocial[];
  businessContact?: BusinessContact[];
};

type User = {
  id: number;
  name: string;
  email: string;
  phoneNumber?: string | null;
  role?: "user" | "operator" | "admin" | null;
};

type Service = {
  id?: number;
  name: string;
  slug?: string;
  description?: string;
  price?: number;
  status: "active" | "inactive" | "pending";
  terms?: string;
  categoryId: number;
  profileId?: number;
  category?: Category;
};
