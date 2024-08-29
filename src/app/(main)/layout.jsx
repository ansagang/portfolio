import Footer from "@/components/navigation/footer";
import Header from "@/components/navigation/header";
import Translator from "@/components/ui/translator";
import { getLanguage } from "@/lib/get-language";

export default async function Mainlayout({ children }) {

    const language = await getLanguage({})

    return (
        <>
            <Translator language={language} />
            <main>
                <Header language={language} />
                {children}
                <Footer language={language} />
            </main>
        </>
    )
}