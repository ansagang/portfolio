import ListProjects from "./list.projects";
import { getProjects } from "@/actions/api";

export default async function ListServer({ language, searchParams }) {
  const { search, category, limit, sort } = searchParams ?? {};
  const searchQ   = search   ?? "";
  const categoryQ = category ?? "";
  const limitQ    = limit    ?? "";
  const sortQ     = sort
    ? { code: sort.split(".")[0], ascending: sort.split(".")[1] === "asc" }
    : { code: "created_at", ascending: false };

  const { data: projects } = await getProjects({
    lang: language.lang,
    search: searchQ,
    category: categoryQ,
    limit: limitQ,
    sort: sortQ,
    revalidate: 0,
  });

  return (
    <div className="projects__list">
      <ListProjects language={language} projects={projects ?? []} />
    </div>
  );
}
