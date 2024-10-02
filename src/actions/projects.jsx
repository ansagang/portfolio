"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server";
import facetsFinder from "@/lib/utils";

export default async function getProjects({ search, category, lang, limit, sort }) {
    console.log('AaaaAaaaaaaAA');
    
    try {
        const supabase = createClient()

        let query = supabase.from("projects").select('*', { count: 'exact' }).match({lang: lang})
        if (search) {
            query = query.textSearch('title', `${search}`, { type: 'websearch', config: lang })
        }
        if (category) {
            query = query.in('category', category)
        }
        if (sort) {
            query = query.order(sort.by, { ascending: sort.ascending })
        }
        query = query.limit(limit)

        const { data, error, count } = await query
        const facets = facetsFinder(data, "category")
        console.log(error);
        

        if (!error) {
            return {
                data: data,
                count: count,
                facets: facets
            }
        }
    
    } catch (err) {
        console.log(err);
    }
}