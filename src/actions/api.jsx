"use server"

import { revalidatePath, revalidateTag } from "next/cache";

export async function getSkills({ lang = '', revalidate}) {
    try {
        const res = await fetch(`${process.env.URL}/api/skills?lang=${lang}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.API_KEY
            },
            next: {
                revalidate: revalidate,
                tags: ['skills']
            }
        })

        const data = await res.json()

        return data
    } catch (err) {
        console.log(err);

    }
}

export async function getAchievements({ lang = '', revalidate}) {
    try {
        const res = await fetch(`${process.env.URL}/api/achievements?lang=${lang}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.API_KEY
            },
            next: {
                revalidate: revalidate,
                tags: ['achievements']
            }
        })

        const data = await res.json()

        return data
    } catch (err) {
        console.log(err);

    }
}


export async function getExperience({ lang = '' }) {
    try {
        const res = await fetch(`${process.env.URL || ''}/api/experience?lang=${lang}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.API_KEY
            }
        })

        const data = await res.json()

        return data
    } catch (err) {
        console.log(err);

    }
}

export async function postContact({ first_name, last_name, email, message, lang }) {
    try {
        const res = await fetch(`${process.env.URL}/api/contact?lang=${lang}`, {
            method: 'POST',
            headers: {
                'x-api-key': process.env.API_KEY
            },
            body: JSON.stringify({first_name: first_name,
                last_name: last_name,
                email: email,
                message: message})
        })

        const data = await res.json()

        return data
    } catch (err) {
        console.log(err);

    }
}

export async function getProjects({ search = '', categories = [], lang = '', limit = '', sort = '', revalidate, cache = 'no-cache'}) {
    try {
        const sortQ = sort ? `${sort.code}.${sort.ascending ? 'asc' : 'desc'}` : ''
        const res = await fetch(`${process.env.URL}/api/projects?search=${search}&categories=${categories.join(',')}&lang=${lang}&sort=${sortQ}&limit=${limit}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.API_KEY
            },
            cache: cache,                                                                                                                                                                                                                                               
            next: {
                revalidate: revalidate,
                tags: ['projects']
            }
        })

        const data = await res.json()

        return data
    } catch (err) {
        console.log(err);

    }
}

export async function getProject({ lang, slug, revalidate }) {
    try {
        const res = await fetch(`${process.env.URL}/api/projects/${slug}?lang=${lang}`, {
            method: 'GET',
            headers: {
                'x-api-key': process.env.API_KEY
            },
            next: {
                revalidate: revalidate
            }
        })

        const data = await res.json()

        return data
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

        let query = supabase.from("blogs").select('*', { count: 'exact' }).match({ lang: lang })
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