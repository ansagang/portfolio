// "use client"

// import { getProjects } from "@/actions/api";
// import ProjectCard from "../ui/project-card";
// import SkeletonList from "../ui/skeleton-list";
// import { useEffect, useState } from "react";
// import FilterProjects from "./filter.projects";

// export default function ListProjects({ language, searchQ, categoryQ, limitQ, sortQ }) {

//     const [projects, setProjects] = useState()
//     const [categories, setCategories] = useState()
//     useEffect(() => {
//         setProjects()
//         async function get() {
//             console.log(language, searchQ, categoryQ, limitQ, sortQ);

//             const { data, facets } = await getProjects({ lang: language.lang, search: searchQ, category: categoryQ, limit: limitQ, sort: sortQ, revalidate: 0 })
//             console.log(data);

//             setProjects(data)
//             setCategories(facets)
//         }

//         get()
//         console.log(projects + "aalo");

//     }, [language])

//     return (
//         <>
//             <FilterProjects language={language} searchQ={searchQ} sortQ={sortQ} categoryQ={categoryQ} limitQ={limitQ} categories={categories} />
//             {
//                 <div className="projects__list-items">
//                     {
//                         projects ?
//                             projects.length !== 0 ?
//                                 (
//                                     projects.map((project) => (
//                                         <ProjectCard key={project.id} className="projects__list-item" id={project.id} title={project.title} description={project.description} category={project.category} video={project.video} slug={project.slug} />
//                                     ))
//                                 )
//                                 :
//                                 null
//                             :
//                             <SkeletonList count={6} />
//                     }
//                 </div>

//             }
//         </>
//     )
// }

// list.projects.jsx (presentational)
"use client";
import ProjectCard from "../ui/project-card";

export default function ListProjects({ language, projects }) {
  return (
    <div className="projects__list-items">
      {projects?.length ? (
        projects.map((p) => {
          const cat =
            typeof p?.category === "object"
              ? p.category?.title ?? p.category?.code ?? ""
              : p?.category ?? "";
          return (
            <ProjectCard
              key={p.id}
              className="projects__list-item"
              id={p.id}
              title={p.title}
              description={p.description}
              category={cat}
              video={p.video}
              slug={p.slug}
            />
          );
        })
      ) : (
        <p>{language?.app?.pages?.projects?.empty ?? "No projects found."}</p>
      )}
    </div>
  );
}


