// Server Component: fetch only facets/categories for current params
import CategorySelect from "./category.select";
import { getProjects } from "@/actions/api";

export default async function CategoriesServer({ language, searchParams }) {
  const { search, category, limit, sort } = searchParams ?? {};
  const searchQ   = search   ?? "";
  const categoryQ = category ?? "";
  const limitQ    = limit    ?? "";
  const sortQ     = sort
    ? { code: sort.split(".")[0], ascending: sort.split(".")[1] === "asc" }
    : { code: "created_at", ascending: false };

  // hit API to get facets only; if your API supports it, request limit: 0
  const { facets: categories } = await getProjects({
    lang: language.lang,
    search: searchQ,
    category: categoryQ,
    limit: 0, // fetch no items, just facets
    sort: sortQ,
    revalidate: 0,
  });

  return (
    <CategorySelect
      language={language}
      categories={categories ?? []}
      value={categoryQ}
    />
  );
}
