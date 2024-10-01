import { getLanguage } from "@/lib/get-language";
import Gallery from "@/components/sections/gallery.blog";

export async function generateMetadata() {

  const language = await getLanguage({})

  return {
    title: language.app.pages.blog.meta.title
  }
}

export default async function Blog() {

  const language = await getLanguage({})

  return (
    <>
      <Gallery  language={language}/>
    </>
  );
}
