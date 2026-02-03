import { getLanguage } from "@/lib/get-language";
import AboutStats from "@/components/home/about-stats";
import ProjectsList from "@/components/home/projects-list";
import Scene from "@/components/three/landing-scene";
import { Icons } from "@/config/icons";
import Button from "@/components/ui/button";
import ContactBanner from "@/components/home/contact-banner";
import Dither from "@/components/three/dither";
import { Suspense } from "react";
import SkeletonProjects from "@/components/skeletons/skeleton-projects";

export default async function Home() {

  const language = await getLanguage({})

  return (
    <>
      <section className="landing">
        <Scene quantity={70} />
        <div className="container__mini">
          <div className="landing__inner inner__big">
            <div className="landing__signature">
              <Icons.signature />
            </div>
            <div className="landing__title title">
              <h1>{language.app.pages.home.sections.landing.title}</h1>
            </div>
            <div className="landing__info info">
              <p>{language.app.pages.home.sections.landing.info}</p>
            </div>
          </div>
        </div>
      </section>
      <section className="block">
        <div className="container__fluid">
          <div className="block__inner inner">
            <div className="block__heading">
              <div className="block__heading-title title">
                <h2>{language.app.pages.about.meta.title}</h2>
              </div>
            </div>
            <div className="block__content">
              <AboutStats language={language} />
            </div>
          </div>
        </div>
      </section>
      <section className="block">
        <div className="container__fluid">
          <div className="block__inner inner">
            <div className="block__heading">
              <div className="block__heading-title title">
                <h2>{language.app.pages.projects.meta.title}</h2>
              </div>
            </div>
            <div className="block__content">
              <Suspense fallback={<SkeletonProjects number={2} />}>
                <ProjectsList language={language} />
              </Suspense>
              <Button href={'/projects'} type={'secondary'} className={'block__content-button'}>{language.app.buttons.otherProjects}<Icons.arrow /></Button>
            </div>
          </div>
        </div>
      </section>
      <section className="block">
        <div className="container__fluid">
          <div className="block__inner inner">
            <div className="block__heading">
              <div className="block__heading-title title">
                <h2>{language.app.pages.contact.meta.title}</h2>
              </div>
            </div>
            <div className="block__content">
              <ContactBanner language={language} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
