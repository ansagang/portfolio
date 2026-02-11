import { getProjects } from "@/actions/api";
import Check from "@/components/projects/check";
import ProjectsChipsShell from "@/components/projects/projects-chips-shell";
import ProjectsList from "@/components/projects/projects-list";
import ProjectsSearch from "@/components/projects/projects-search";
import SkeletonProjects from "@/components/skeletons/skeleton-projects";
import SkeletonCategories from "@/components/ui/skeleton-categories";
import { getLanguage } from "@/lib/get-language";
import Image from "next/image";
import { Suspense } from "react";

export async function generateMetadata() {

  const language = await getLanguage({})

  return {
    title: language.app.pages.projects.meta.title
  }
}

export default async function Projects({ searchParams }) {

  const language = await getLanguage({})

  return (
    <>
      <section className="projects">
        <div className="container">
          <div className="projects__inner inner">
            {/* <div className="projects__title title">
              <h2>{language.app.pages.projects.meta.title}</h2>
            </div> */}
            <div className="projects__container">
              <ProjectsSearch language={language} searchParams={searchParams} />
              <Suspense key={(await searchParams).search} fallback={<SkeletonCategories count={10} />}>
                <ProjectsChipsShell language={language} searchParams={searchParams} />
              </Suspense>
              <Suspense key={(await searchParams).search + (await searchParams).categories} fallback={<SkeletonProjects className="list" number={9} />}>
                <ProjectsList language={language} searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
