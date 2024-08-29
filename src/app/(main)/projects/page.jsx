import Gallery from "@/components/sections/gallery.projects";
import { getLanguage } from "@/lib/get-language";

export async function generateMetadata() {

  const language = await getLanguage({})

  return {
    title: language.app.pages.projects.meta.title
  }
}

export default async function Projects() {

  const language = await getLanguage({})

  return (
    <>
      <Gallery language={language} />
    </>
  );
}
