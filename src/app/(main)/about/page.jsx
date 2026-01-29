import AboutMe from "@/components/sections/about.about";
import { getLanguage } from "@/lib/get-language";
import Skills from "@/components/sections/skills.about";
import Experience from "@/components/sections/experience.about";
import { getExperience, getSkills } from "@/actions/api";

export async function generateMetadata() {

  const language = await getLanguage({})

  return {
    title: language.app.pages.about.meta.title
  }
}

export default async function About() {

  const language = await getLanguage({})

  const {data: skills} = await getSkills({lang: language.lang})
  const {data: experience} = await getExperience({lang: language.lang})
  
  return (
    <>
      <AboutMe language={language} />
      <Skills language={language} skills={skills} />
      <Experience language={language} experience={experience} />
    </>
  );
}
