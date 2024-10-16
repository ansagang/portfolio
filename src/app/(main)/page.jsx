import { getProjects } from "@/actions/api";
import AboutMe from "@/components/sections/about-me.home";
import Contact from "@/components/sections/contact.home";
import Landing from "@/components/sections/landing.home";
import Projects from "@/components/sections/projects.home";
import { getLanguage } from "@/lib/get-language";

export default async function Home() {

  const language = await getLanguage({})
  const {data: projects} = await getProjects({lang: language.lang, limit: 4, revalidate: 0})
  
  return (
    <>
      <Landing language={language} />
      <AboutMe language={language} />
      <Projects language={language} projects={projects} />
      <Contact language={language} />
    </>
  );
}
