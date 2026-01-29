// import Projects from "@/components/sections/projects.projects";
// import { getLanguage } from "@/lib/get-language";

// export const revalidate = 3600

// export async function generateMetadata() {

//   const language = await getLanguage({})

//   return {
//     title: language.app.pages.projects.meta.title
//   }
// }

// export default async function ProjectsPage({searchParams}) {

//   const language = await getLanguage({})

//   return (
//     <>
//       <Projects language={language} searchParams={searchParams} />
//     </>
//   );
// }

import { Suspense } from "react";
import { getLanguage } from "@/lib/get-language";
import FiltersShell from "@/components/sections/filters.shell";        // client
import CategoriesServer from "@/components/sections/categories.select";
import ListServer from "@/components/sections/list.server";            // server

export async function generateMetadata() {
  const language = await getLanguage({});
  return { title: language.app.pages.projects.meta.title };
}

export default async function ProjectsPage({ searchParams }) {
  const language = await getLanguage({});

  return (
    <section className="projects">
      <div className="container">
        <div className="projects__inner inner__big">
          {/* Filters are ALWAYS mounted */}
          <FiltersShell language={language} searchParams={searchParams}>
            {/* Categories area streams independently */}
            <Suspense
              key={`cats:${JSON.stringify(searchParams)}`}
              fallback={<div className="facet-skeleton">Loading categories…</div>}
            >
              <CategoriesServer language={language} searchParams={searchParams} />
            </Suspense>
          </FiltersShell>

          {/* Projects list streams separately */}
          <Suspense
            key={`list:${JSON.stringify(searchParams)}`}
            fallback={
              <div className="projects__list">
                <div className="projects__list-items">
                  {/* your animated skeleton list here */}
                  {/* <SkeletonList count={6} /> */}
                  <p>Loading projects…</p>
                </div>
              </div>
            }
          >
            <ListServer language={language} searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

