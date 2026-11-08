export const siteConfig = {
  name: "Sadatech",
  legalName: "PT Sadani Teknologi Indonesia",
  description: "Imagine. Build. Make It Real.",
  longDescription:
    "Sadatech builds and operates practical digital products, software platforms, and technology solutions that simplify everyday problems.",
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
  paymentProducts: [
    {
      name: "Serahin",
      slug: "serahin",
      url: "https://serahin.suraise.com",
      billing: "one-time order payments",
      currency: "IDR",
    },
    {
      name: "Manifly",
      slug: "manifly",
      url: "https://manifly.suraise.com/login",
      billing: "monthly memberships",
      currency: "IDR",
    },
  ],
} as const;
