import { CreateBusinessProfileSchema } from "@/schema/business-profile.schema";
import { CreateImageSchema } from "@/schema/image.schema";
import { InputSettingSchema } from "@/schema/setting.schema";
import { UpdateValidationSchema } from "@/schema/validation.schema";

export const imgUrl = "/images/placeholder.webp";

export const settingFormGroups = [
  {
    title: "Website Umum",
    subtitle: "Informasi dasar tentang situs Anda.",
    fields: [
      {
        key: "siteName",
        label: "Site Name",
        placeholder: "Masukkan nama situs",
      },
      {
        key: "logo",
        label: "Logo",
        placeholder: "Upload logo situs",
        props: { type: "file" },
      },
      {
        key: "description",
        label: "Deskripsi",
        placeholder: "Masukkan deskripsi singkat",
        props: { rows: 4, multiline: true },
      },
    ],
  },
  {
    title: "SEO",
    subtitle: "Optimalkan visibilitas situs Anda di mesin pencari.",
    fields: [
      {
        key: "metaKeywords",
        label: "Meta Keywords",
        placeholder: "Pisahkan dengan koma, misalnya: makanan, enak, murah",
      },
      {
        key: "metaTitle",
        label: "Meta Title",
        placeholder: "Judul SEO untuk halaman utama",
      },
      {
        key: "metaDescription",
        label: "Meta Description",
        placeholder: "Deskripsi untuk mesin pencari",
        props: { rows: 4, multiline: true },
      },
      {
        key: "ogTitle",
        label: "OG Title",
        placeholder: "Judul saat dibagikan di sosial media",
      },
      {
        key: "ogDescription",
        label: "OG Description",
        placeholder: "Deskripsi saat dibagikan di sosial media",
      },
      {
        key: "googleSiteVerification",
        label: "Google Site Verification",
        placeholder: "Kode verifikasi Google Search Console",
      },
    ],
  },
  {
    title: "Kontak",
    subtitle: "Informasi kontak pengunjung situs.",
    fields: [
      {
        key: "contactEmail",
        label: "Email Kontak",
        placeholder: "contoh: info@domain.com",
      },
      {
        key: "contactPhone",
        label: "Nomor Telepon",
        placeholder: "contoh: +62 812 3456 7890",
      },
      {
        key: "address",
        label: "Alamat",
        placeholder: "Masukkan alamat lengkap",
      },
    ],
  },
  {
    title: "Sosial Media",
    subtitle: "Tautan ke akun sosial media Anda.",
    fields: [
      {
        key: "facebookUrl",
        label: "Facebook URL",
        placeholder: "contoh: https://facebook.com/namapage",
      },
      {
        key: "instagramUrl",
        label: "Instagram URL",
        placeholder: "contoh: https://instagram.com/username",
      },
      {
        key: "twitterUrl",
        label: "Twitter URL",
        placeholder: "contoh: https://twitter.com/username",
      },
      {
        key: "linkedinUrl",
        label: "LinkedIn URL",
        placeholder: "contoh: https://linkedin.com/in/username",
      },
      {
        key: "youtubeUrl",
        label: "YouTube URL",
        placeholder: "contoh: https://youtube.com/channel/xxx",
      },
      {
        key: "whatsappUrl",
        label: "WhatsApp URL",
        placeholder: "contoh: https://wa.me/6281234567890",
      },
    ],
  },
];

export const dummySetting: InputSettingSchema = {
  siteName: "",
  logo: null,
  description: null,
  metaKeywords: null,
  metaTitle: "",
  metaDescription: "",
  ogTitle: null,
  ogDescription: null,
  googleSiteVerification: null,
  contactEmail: null,
  contactPhone: null,
  address: null,
  facebookUrl: null,
  instagramUrl: null,
  twitterUrl: null,
  linkedinUrl: null,
  youtubeUrl: null,
  whatsappUrl: null,
};

export const dummyBusinessProfile: CreateBusinessProfileSchema = {
  businessName: "",
  status: "",
  businessSocial: [],
  businessContact: [],
  user: {
    name: "",
    email: "",
    isActive: null,
    role: null,
  },
  address: "",
};

export const dummySocials = [
  "facebook",
  "instagram",
  "tiktok",
  "linkedin",
  "youtube",
  "twitter",
];

export const inputImage: CreateImageSchema = {
  entityType: "",
  entityId: 0,
  file: null,
};


export const inputValidasi: UpdateValidationSchema = {
  id: 0,
  action: "rejected"
};
