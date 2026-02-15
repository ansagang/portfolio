import supabaseErrors from "@/lib/supabase/errors"
import { createClient } from "@/lib/supabase/server"
import facetsFinder from "@/lib/utils"
import { NextResponse } from "next/server"
import { slugify } from "@/lib/utils"

export async function GET(request) {
    try {
        const supabase = await createClient()

        const { searchParams } = new URL(request.url)
        const search = searchParams.get('search') ? searchParams.get('search') : null
        const categories = searchParams.get('categories') ? searchParams.get('categories').split(',') : null
        const sort = searchParams.get('sort') ? { code: searchParams.get('sort').split('.')[0], ascending: searchParams.get('sort').split('.')[1] == 'asc' ? true : false } : null
        const lang = searchParams.get('lang') ? searchParams.get('lang') : null
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : null

        let query = supabase.from("projects").select('*')
        if (search) {
            // query = query.textSearch('description', `${search}`, {
            //     type: 'phrase',
            // })
            // query = query.like('description', `%${search}%`)
            // query = query.or(`title.like.%${search}%,description.like.%${search}%),title.like.%${search.toLowerCase()}%,description.like.%${search.toLowerCase()}%),title.like.%${search.charAt(0).toUpperCase() + search.slice(1)}%,description.like.%${search.charAt(0).toUpperCase() + search.slice(1)}%)`)
            // query = query.textSearch('search_vector', `${search}`, {
            //     type: 'websearch',
            //     config: 'english'
            // })
            // query = query.or('')
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

        let { data, error, count } = await query

        if (categories) {
            data = data.filter(row =>
                row.categories.some(category => {
                    return categories.includes(slugify(category))
                })
            )
        }


        let querySearch = supabase.from("projects").select('*').match({ lang: lang })
        if (search) {
            querySearch = querySearch.textSearch('fts', `${search}`,)
        }

        const { data: dataSearch } = await querySearch

        const facets = await facetsFinder(dataSearch, "categories")


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