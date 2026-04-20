import ProjectsChipsShell from "@/components/projects/projects-chips-shell";
import ProjectsList from "@/components/projects/projects-list";
import ProjectsSearch from "@/components/projects/projects-search";
import SkeletonProjects from "@/components/skeletons/skeleton-projects";
import SkeletonCategories from "@/components/ui/skeleton-categories";
import { getLanguage } from "@/lib/get-language";
import { getAlternates } from "@/lib/get-alternates";
import { BASE_URL } from "@/lib/base-url";
import { Suspense } from "react";

export async function generateMetadata({ params }) {

  const { lang } = await params
  const language = await getLanguage({ locale: lang })

  return {
    title: language.app.pages.projects.meta.title,
    description: language.app.pages.projects.meta.description,
    openGraph: {
      type: "website",
      ...getAlternates(lang).openGraph,
      title: language.app.pages.projects.meta.title,
      description: language.app.pages.projects.meta.description,
      siteName: language.app.meta.title,
      images: [`${BASE_URL}/images/banner-one.png`]
    },
    ...getAlternates(lang, '/projects'),
  }
}

export default async function Projects({ params, searchParams }) {

  const { lang } = await params
  const language = await getLanguage({ locale: lang })

  const searchQuery = await searchParams

  return (
    <>
      <section className="projects">
        <div className="container">
          <div className="projects__inner inner__big">
            <div className="projects__title title">
              <h2>{language.app.pages.projects.meta.title}</h2>
            </div>
            <div className="projects__info info">
              <p>{language.app.pages.projects.meta.description}</p>
            </div>
            <div className="projects__container">
              <ProjectsSearch language={language} searchParams={searchQuery} />
              <Suspense key={(await searchParams).search} fallback={<SkeletonCategories count={10} />}>
                <ProjectsChipsShell language={language} searchParams={searchQuery} />
              </Suspense>
              <Suspense key={(await searchParams).search + (await searchParams).categories} fallback={<SkeletonProjects className="list" number={9} />}>
                <ProjectsList language={language} searchParams={searchQuery} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
