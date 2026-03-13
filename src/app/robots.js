export default function robot() {
    return {
        rules: {
            userAgent: "*",
            allow: '/',
            dissallow: ['/api', '/images']
        },
        sitemap: `${process.env.URL}/sitemap.xml`
    }
}