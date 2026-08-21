export const siteConfig = {
  name: "Sadani",
  legalName: "PT Sadani Teknologi Indonesia",
  description: "Building digital products for everyday possibilities.",
  longDescription:
    "PT Sadani Teknologi Indonesia builds digital products, software platforms, and technology solutions designed to simplify everyday problems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sadani.suraise.com",
  email: process.env.CONTACT_EMAIL || "",
  phone: {
    display: "0851 1151 0038",
    href: "+6285111510038",
  },
  address: {
    city: "Sukoharjo",
    province: "Jawa Tengah",
    country: "Indonesia",
  },
} as const;
