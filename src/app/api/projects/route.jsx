import supabaseErrors from "@/lib/supabase/errors"
import { createClient } from "@/lib/supabase/server"
import facetsFinder from "@/lib/utils"
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        const supabase = await createClient()

        const { searchParams } = new URL(request.url)
        const search = searchParams.get('search') ? searchParams.get('search') : null
        // const category = searchParams.get('category') ? searchParams.get('category') : null
        const sort = searchParams.get('sort') ? { code: searchParams.get('sort').split('.')[0], ascending: searchParams.get('sort').split('.')[1] == 'asc' ? true : false } : null
        const lang = searchParams.get('lang') ? searchParams.get('lang') : null
        const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')) : null

        let query = supabase.from("projects").select('*')
        if (search) {
            query = query.textSearch('fts', `${search}`,)
        }
        // if (category) {
        //     query = query.eq("category->>code", category)
        // }
        if (sort) {
            query = query.order(sort.code, { ascending: sort.ascending })
        }
        if (lang) {
            query = query.match({ lang: lang })
        }
        if (limit) {
            query = query.limit(limit)
        }

        const { data, error, count } = await query
        // const { data: facetsData } = await supabase.from("projects").select('*').match({ lang: lang })
        // const facets = await facetsFinder(facetsData, "category")
        

        if (!error) {
            return NextResponse.json({
                data: data,
                count: count,
                // facets: facets
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