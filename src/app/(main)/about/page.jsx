import AboutMe from "@/components/sections/about.about";
import { getLanguage } from "@/lib/get-language";
import Skills from "@/components/sections/skills.about";
import Experience from "@/components/sections/experience.about";

export async function generateMetadata() {

  const language = await getLanguage({})

  return {
    title: language.app.pages.about.meta.title
  }
}

export default async function About() {

  const language = await getLanguage({})

  return (
    <>
      <AboutMe language={language} />
      {/* <Divider /> */}
      <Skills language={language} />
      <Experience language={language} />
      {/* <Achievements language={language} /> */}
    </>
  );
}
