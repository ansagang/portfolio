import supabaseErrors from "@/lib/supabase/errors"
import { createClient } from "@/lib/supabase/server"
import facetsFinder from "@/lib/utils"
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        const supabase = await createClient()

        const { searchParams } = new URL(request.url)
        const search = searchParams.get('search') ? searchParams.get('search') : null
        const categories = searchParams.get('categories') ? searchParams.get('categories').split(',') : null
        const sort = searchParams.get('sort') ? { code: searchParams.get('sort').split('.')[0], ascending: searchParams.get('sort').split('.')[1] == 'asc' ? true : false } : null
        const lang = searchParams.get('lang') ? searchParams.get('lang') : null
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : null
        const favorite = searchParams.get('favorite') ? searchParams.get('favorite') : null


        let query = supabase.from("projects").select('*')
        if (search) {
            const searchTerm = search
                .trim()
                .split(/\s+/)
                .map(t => `${t.replace(/'/g, "")}:*`)
                .join(" & ");

            query = query.textSearch("search_vector", searchTerm, { type: "raw", config: "simple" });
        }
        if (sort) {
            query = query.order(sort.code, { ascending: sort.ascending })
        }
        if (lang) {
            query = query.match({ lang: lang })
        }
        if (limit) {
            query = query.limit(limit)
        }

        if (favorite) {
            query = query.eq('favorite', favorite)
        }


        let { data, error, count } = await query

        if (categories) {
            data = data.filter(row =>
                row.categories.some(category => {
                    return categories.includes(category.slug)
                })
            )
        }


        let querySearch = supabase.from("projects").select('*').match({ lang: lang })
        if (search) {
            const searchTerm = search
                .trim()
                .split(/\s+/)
                .map(t => `${t.replace(/'/g, "")}:*`)
                .join(" & ");

            querySearch = querySearch.textSearch("search_vector", searchTerm, { type: "raw", config: "simple" });
        }

        const { data: dataSearch } = await querySearch

        const facets = await facetsFinder(dataSearch, "categories")
        console.log(facets);


        if (!error) {
            return NextResponse.json({
                data: data,
                count: count,
                facets: facets
            })
        } else {
            const res = supabaseErrors({ error })
            return NextResponse.json(res)
        }

    } catch (err) {

        return NextResponse.json({
            message: err.message
        })
    }
}