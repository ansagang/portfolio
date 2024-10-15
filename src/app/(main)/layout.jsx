import { getCV } from "@/actions/actions";
import { getStatus } from "@/actions/api";
import Footer from "@/components/navigation/footer";
import Header from "@/components/navigation/header";
import Translator from "@/components/ui/translator";
import { getLanguage } from "@/lib/get-language";


export default async function Mainlayout({ children }) {

    const language = await getLanguage({})
    const {data: status} = await getStatus({lang: language.lang, revalidate: 3600})
    
    const {data: cv} = await getCV(status.cv)

    return (
        <>
            <Translator language={language} />
            <Header language={language} status={status} cv={cv} />
            <main>
                {children}
            </main>
            <Footer language={language} />
        </>
    )
}