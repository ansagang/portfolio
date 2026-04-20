import { BASE_URL } from "@/lib/base-url";

export default function robot() {
    return {
        rules: {
            userAgent: "*",
            allow: '/',
            disallow: ['/api']
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
        host: BASE_URL,
    }
}