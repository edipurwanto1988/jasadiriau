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
  status: "inactive" | "active";
};

type Slider = {
  id: number;
  title: string;
  caption?: string;
  imageUrl: string;
  link?: string;
  sortOrder?: number;
  status: "inactive" | "active";
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
