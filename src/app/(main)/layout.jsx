import Footer from "@/components/navigation/footer";
import Header from "@/components/navigation/header";
import Translator from "@/components/ui/translator";
import { getLanguage } from "@/lib/get-language";


export default async function Mainlayout({ modal, children }) {

    const language = await getLanguage({})

    return (
        <>
            <Translator language={language} />
            <Header language={language} />

            <main>
                {children}
            </main>
            <Footer language={language} />
            {/* {modal} */}
        </>
    )
}