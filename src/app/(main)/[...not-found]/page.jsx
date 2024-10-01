import NotFound from "@/components/sections/not-found";
import { getLanguage } from "@/lib/get-language";

export async function generateMetadata() {

  const language = await getLanguage({})

  return {
    title: language.app.pages.notFound.meta.title
  }
}

export default async function Page() {

    const language = await getLanguage({})

    return (
        <NotFound language={language} />
    )
}