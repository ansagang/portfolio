// import ListProjects from "./list.projects"
// import FilterProjects from "./filter.projects"
// import { Suspense } from "react"

// export default async function Projects({ language, searchParams }) {

//     const {search, category, limit, sort} = await searchParams

//     // const searchQ = await searchParams?.search ? searchParams.search : ''
//     // const categoryQ = await searchParams?.category ? searchParams.category : ''
//     // const limitQ = await searchParams?.limit ? searchParams.limit : ''
//     // const sortQ = await searchParams?.sort ? { code: searchParams.sort.split('.')[0], ascending: searchParams.sort.split('.')[1] == 'asc' ? true : false } : {code: 'created_at', ascending: false}

//     const searchQ =  search ? search : ''
//     const categoryQ =  category ? category : ''
//     const limitQ =  limit ? limit : ''
//     const sortQ = sort ? { code: sort.split('.')[0], ascending:sort.split('.')[1] == 'asc' ? true : false } : {code: 'created_at', ascending: false}

//     return (
//         <section className="projects">
//             <div className="container">
//                 <div className="projects__inner inner__big">
//                     <div className="projects__list">
//                         {/* <FilterProjects language={language} searchQ={searchQ} categoryQ={categoryQ} limitQ={limitQ} sortQ={sortQ} /> */}
//                         <Suspense fallback={<h1>loading</h1>}>
//                         <ListProjects language={language} searchQ={searchQ} categoryQ={categoryQ} limitQ={limitQ} sortQ={sortQ} />
//                         </Suspense>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     )
// }

// Server Component: no "use client"
import ListProjects from "./list.projects";
import FilterProjects from "./filter.projects";
import { getProjects } from "@/actions/api";
import { redirect } from "next/navigation";

export default async function Projects({ language, searchParams }) {
  // normalize params (no await here)
// projects.server.jsx (or where you normalize params)
const { search, category, limit, sort } = searchParams ?? {};
const searchQ   = search   ?? "";
const categoryQ = typeof category === "string" ? category : ""; // code string


  const limitQ    = limit    ?? "";
  const sortQ     = sort
    ? { code: sort.split(".")[0], ascending: sort.split(".")[1] === "asc" }
    : { code: "created_at", ascending: false };

  // ✅ SERVER DATA FETCH
  const { data: projects, facets: categories } = await getProjects({
    lang: language.lang,
    search: searchQ,
    category: categoryQ,
    limit: limitQ,
    sort: sortQ,
    // keep this as you need; server can still control caches with revalidate
    revalidate: 0,
  });

  // ✅ SERVER ACTION to set search params via redirect (return nothing)
  async function setFiltersAction(formData) {
    "use server";
    const params = new URLSearchParams();

    const s = formData.get("search")?.toString().trim();
    const c = formData.get("category")?.toString().trim();
    const l = formData.get("limit")?.toString().trim();
    const code = formData.get("sortCode")?.toString().trim();
    const asc  = formData.get("sortAsc")?.toString().trim();

    if (s) params.set("search", s);
    if (c) params.set("category", c);
    if (l) params.set("limit", l);
    if (code && asc) params.set("sort", `${code}.${asc === "true" ? "asc" : "desc"}`);

    const qs = params.toString();
    redirect(qs ? `/projects?${qs}` : `/projects`);
  }

  return (
    <section className="projects">
      <div className="container">
        <div className="projects__inner inner__big">
          <div className="projects__list">
            {/* Pass the server action to the (client) filter component */}
            <FilterProjects
              language={language}
              searchQ={searchQ}
              categoryQ={categoryQ}
              limitQ={limitQ}
              sortQ={sortQ}
              categories={categories}
              setFiltersAction={setFiltersAction}
            />
            {/* Pure presentational list: no fetching inside */}
            <ListProjects
              language={language}
              projects={projects ?? []}
              categories={categories ?? []}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
