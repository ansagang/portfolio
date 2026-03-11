import ProjectsChipsShell from "@/components/projects/projects-chips-shell";
import ProjectsList from "@/components/projects/projects-list";
import ProjectsSearch from "@/components/projects/projects-search";
import SkeletonProjects from "@/components/skeletons/skeleton-projects";
import SkeletonCategories from "@/components/ui/skeleton-categories";
import { getLanguage } from "@/lib/get-language";
import { Suspense } from "react";

export async function generateMetadata() {

  const language = await getLanguage({})

  return {
    title: language.app.pages.projects.meta.title,
    description: language.app.pages.projects.meta.description,
    openGraph: {
      type: "website",
      locale: "en_US",
      title: language.app.pages.projects.meta.title,
      description: language.app.pages.projects.meta.description,
      siteName: language.app.meta.title,
      images: ["https://www.angsar-aben.kz/images/banner-one.png"]
    }
  }
}
export default async function Projects({ searchParams }) {

  const language = await getLanguage({})

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
