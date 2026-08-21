import type { MetadataRoute } from "next";
import { products } from "@/config/products";
import { siteConfig } from "@/config/site";
export default function sitemap(): MetadataRoute.Sitemap { const routes = ["", "/products", "/about", "/careers", "/contact", "/privacy", "/terms", ...products.map((p) => `/products/${p.slug}`)]; return routes.map((route) => ({ url: `${siteConfig.url}${route}`, lastModified: new Date(), changeFrequency: route === "" ? "monthly" : "yearly", priority: route === "" ? 1 : route.startsWith("/products") ? .8 : .6 })); }
