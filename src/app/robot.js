export default function robot() {
    return {
        rules: {
            userAgent: "*",
            allow: '/',
            dssallow: '/api'
        },
        sitemap: 'https://www.angsar-aben.kz/sitemap.xml'
    }
}