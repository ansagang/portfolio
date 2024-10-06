import Footer from "@/components/navigation/footer";
import Header from "@/components/navigation/header";
import Translator from "@/components/ui/translator";
import { getLanguage } from "@/lib/get-language";


export default async function Mainlayout({ projects, children }) {

    const language = await getLanguage({})
    // console.log(projects);
    

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