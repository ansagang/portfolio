import { getStatus } from "@/actions/api";
import Footer from "@/components/navigation/footer";
import Header from "@/components/navigation/header";
import Translator from "@/components/ui/translator";
import { getLanguage } from "@/lib/get-language";


export default async function Mainlayout({ children }) {

    const language = await getLanguage({})
    const {data: status} = await getStatus({lang: language.lang, revalidate: 3600})

    return (
        <>
            <Translator language={language} />
            <Header language={language} status={status} />
            <main>
                {children}
            </main>
            <Footer language={language} />
        </>
    )
}