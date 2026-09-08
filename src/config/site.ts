export const siteConfig = {
  name: "Sadani",
  legalName: "PT Sadani Teknologi Indonesia",
  description: "Building digital products for everyday possibilities.",
  longDescription:
    "PT Sadani Teknologi Indonesia builds and operates digital products, software platforms, and technology solutions designed to simplify everyday problems.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://sadani.suraise.com",
  // Monitored business inbox. Override per environment with CONTACT_EMAIL.
  email: process.env.CONTACT_EMAIL || "suryadanikmah@gmail.com",
  phone: {
    display: "0851 1151 0038",
    href: "+6285111510038",
  },
  address: {
    city: "Sukoharjo",
    province: "Jawa Tengah",
    country: "Indonesia",
  },
  // The product that accepts online customer payments today. Used by the
  // "How payments work" and refund pages.
  paymentsProduct: {
    name: "Serahin",
    slug: "serahin",
    url: "https://serahin.suraise.com",
    currency: "IDR",
  },
} as const;
