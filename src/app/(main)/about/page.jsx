import AboutMe from "@/components/sections/about.about";
import { getLanguage } from "@/lib/get-language";
import Skills from "@/components/sections/skills.about";
import Experience from "@/components/sections/experience.about";
import { getExperience, getSkills } from "@/actions/api";
import Dither from "@/components/three/dither";
import AboutVisual from "@/components/about/about-visual";
import SkillsList from "@/components/about/skills-list";
import AchievementsList from "@/components/about/achievements-list";

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
      <section className="about">
        <div className="container">
          <div className="about__inner inner__big">
            <AboutVisual language={language} />
            <div className="about__content">
              <div className="about__title title">
                <h2>{language.app.pages.about.sections.about.info1}</h2>
                <h2>{language.app.pages.about.sections.about.info2}</h2>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="skills white">
        <div className="container">
          <div className="skills__inner inner">
            <div className="skills__title title">
              <h2>{language.app.pages.about.sections.skills.title}</h2>
            </div>
            <SkillsList language={language} />
          </div>
        </div>
      </section>
      <section className="achievements">
        <div className="container">
          <div className="achievements__inner inner">
            <div className="achievements__title title">
              <h2>{language.app.pages.about.sections.achievements.title}</h2>
            </div>
            <div className="achievements__info info">
              <p>{language.app.pages.about.sections.achievements.description}</p>
            </div>
            <AchievementsList language={language} />
          </div>
        </div>
      </section>
    </>
  );
}
