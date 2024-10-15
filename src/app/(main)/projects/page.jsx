import Projects from "@/components/sections/projects.projects";
import { getLanguage } from "@/lib/get-language";

export const revalidate = 3600

export async function generateMetadata() {

  const language = await getLanguage({})

  return {
    title: language.app.pages.projects.meta.title
  }
}

export default async function ProjectsPage({searchParams}) {

  const language = await getLanguage({})

  return (
    <>
      <Projects language={language} searchParams={searchParams} />
    </>
  );
}
