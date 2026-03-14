import NotFound from "@/components/sections/not-found";
import { getLanguage } from "@/lib/get-language";

export default async function Page({ params }) {
    const { lang } = await params
    const language = await getLanguage({ locale: lang })

    return <NotFound language={language} />
}
