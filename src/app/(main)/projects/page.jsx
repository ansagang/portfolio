import Gallery from "@/components/sections/gallery.projects";
import Portfolio from "@/components/sections/portfolio.projects";
import HeroProjects from "@/components/sections/projects.projects";
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
      <HeroProjects language={language} />
      <Portfolio language={language} />
    </>
  );
}
