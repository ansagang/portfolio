import Footer from "@/components/navigation/footer";
import Header from "@/components/navigation/header";
import Translator from "@/components/ui/translator";
import { getLanguage } from "@/lib/get-language";
import { languages_codes } from "@/config/languages";
import { getAlternates } from "@/lib/get-alternates";
import { BASE_URL } from "@/lib/base-url";

export function generateStaticParams() {
    return languages_codes.map(lang => ({ lang }))
}

export async function generateMetadata({ params }) {
    const { lang } = await params
    const language = await getLanguage({ locale: lang })

    return {
        title: {
            default: language.app.meta.title,
            template: `%s | ${language.app.meta.title}`
        },
        description: language.app.meta.description,
        keywords: language.app.meta.keywords,
        openGraph: {
            type: "website",
            ...getAlternates(lang).openGraph,
            title: language.app.meta.title,
            description: language.app.meta.description,
            siteName: language.app.meta.title,
            images: [`${BASE_URL}/images/banner-one.png`]
        },
        twitter: {
            card: "summary_large_image",
            title: language.app.meta.title,
            description: language.app.meta.description,
            images: [`${BASE_URL}/images/banner-one.png`],
            creator: "@ansagang",
        },
        ...getAlternates(lang),
    }
}

export default async function LangLayout({ children, params }) {
    const { lang } = await params

    const language = await getLanguage({ locale: lang })

    return (
        <>
            <Translator language={language} />
            <Header language={language} />
            <main>
                {children}
            </main>
            <Footer language={language} />
        </>
    )
}
