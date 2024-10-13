import { createClient } from "@/lib/supabase/client";
import facetsFinder from "@/lib/utils";

export async function getProjects({ search, category, lang, limit, sort }) {
    
    try {
        const supabase = createClient()
    
        let query = supabase.from("projects").select('*')
        if (search) {
            query = query.textSearch('description_title', `${search}`, {type: 'websearch'})     
        }
        if (category) {
            query = query.eq("category->>code", category)
        }
        if (sort) {
            query = query.order(sort.code, { ascending: sort.ascending })
        }
        if (lang) {
            query = query.match({lang: lang})
        }
        if (limit) {
            query = query.limit(limit)
        }

        const { data, error, count } = await query
        const {data: facetsData} = await supabase.from("projects").select('*').match({lang: lang})
        const facets = await facetsFinder(facetsData, "category")
        
        
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

export async function getProject({ lang, slug }) {
    
    try {
        const supabase = createClient()

        const {data, error} = await supabase.from("projects").select("").match({lang: lang, slug: slug}).single()        

        if (!error) {
            return {
                data: data,
            }
        }
    
    } catch (err) {
        console.log(err);
    }
}

export async function getProjectMedia(media) {
    // const res = await fetch(`${process.env.URL}/api/auth/login-session?lang=en`, {
    //     method: 'POST',
    //     body: JSON.stringify({ session: session }),
    // })
    // const data = await res.json()

    // return data
    try {
        const supabase = createClient()
        if (media) {
            const { data } = supabase.storage.from('projects').getPublicUrl(media)

            if (data) {
                return {
                    data: data.publicUrl
                }
            }
        }
    } catch (err) {
        return {
            success: false,
        }
    }
}

export async function getBlogs({ search, category, lang, limit, sort }) {
    
    try {
        const supabase = createClient()

        let query = supabase.from("blogs").select('*', { count: 'exact' }).match({lang: lang})
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

export async function getBlogMedia(media) {
    // const res = await fetch(`${process.env.URL}/api/auth/login-session?lang=en`, {
    //     method: 'POST',
    //     body: JSON.stringify({ session: session }),
    // })
    // const data = await res.json()

    // return data
    try {
        const supabase = createClient()
        if (media) {
            const { data } = supabase.storage.from('blogs').getPublicUrl(media)

            if (data) {
                return {
                    data: data.publicUrl
                }
            }
        }
    } catch (err) {
        return {
            success: false,
        }
    }
}