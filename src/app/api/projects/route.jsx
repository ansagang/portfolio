import { getLanguage } from "@/lib/get-language"
import supabaseErrors from "@/lib/supabase/errors"
import { createClient } from "@/lib/supabase/server"
import { projectValidation } from "@/lib/validation"
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


        if (!error) {
            return NextResponse.json({
                data: data,
                count: count,
                facets: facets
            })
        } else {
            const res = supabaseErrors({ error })
            return NextResponse.json({
                message: res,
                data: {}
            })
        }

    } catch (err) {

        return NextResponse.json({
            message: err.message
        })
    }
}

export async function DELETE(request) {
    try {
        const supabase = await createClient()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ success: false, message: 'Missing id' }, { status: 400 })
        }

        const { error } = await supabase.from('projects').delete().eq('id', id)

        if (!error) {
            return NextResponse.json({ success: true })
        } else {
            const res = supabaseErrors({ error })
            return NextResponse.json(res)
        }
    } catch (err) {
        return NextResponse.json({ success: false, message: err.message })
    }
}

export async function POST(request) {
    try {
        const supabase = await createClient()
        const { searchParams } = new URL(request.url)
        const formData = await request.formData()

        const title = formData.get('title')
        const description = formData.get('description')
        const tech_stack = formData.get('tech_stack') ? JSON.parse(formData.get('tech_stack')) : null
        const slug = formData.get('slug')
        const git = formData.get('git')
        const categories = formData.get('categories') ? JSON.parse(formData.get('categories')) : null
        const link = formData.get('link')
        const key_features = formData.get('key_features') ? JSON.parse(formData.get('key_features')) : null
        const favorite = formData.get('favorite') === 'true'
        const videoFile = formData.get('video')
        const bannerFile = formData.get('banner')

        console.log(request, formData);
        

        const lang = searchParams.get('lang') ? searchParams.get('lang') : null
        const language = await getLanguage({ locale: lang })
        const errors = projectValidation({ title, description, slug, language })

        if (errors.length === 0) {
            let videoFilename = null

            if (videoFile && videoFile instanceof File && videoFile.size > 0) {
                const ext = videoFile.name.split('.').pop()
                const filename = `${slug}.${ext}`
                const { error: storageError } = await supabase.storage
                    .from('portfolio')
                    .upload(`projects/${filename}`, videoFile, { upsert: true })

                if (storageError) {
                    const res = supabaseErrors({ error: storageError })
                    return NextResponse.json(res)
                }

                videoFilename = filename
            }

            let bannerFilename = null

            if (bannerFile && bannerFile instanceof File && bannerFile.size > 0) {
                const ext = bannerFile.name.split('.').pop()
                const filename = `${slug}.${ext}`
                const { error: storageError } = await supabase.storage
                    .from('portfolio')
                    .upload(`projects/${filename}`, bannerFile, { upsert: true })

                if (storageError) {
                    const res = supabaseErrors({ error: storageError })
                    return NextResponse.json(res)
                }

                bannerFilename = filename
            }

            const { error } = await supabase.from('projects').insert({
                title,
                description,
                video: videoFilename,
                banner: bannerFilename,
                tech_stack,
                slug,
                git,
                categories,
                link,
                key_features,
                favorite,
                lang: language.lang
            })
            if (!error) {
                return NextResponse.json({
                    success: true,
                    message: language.res.messageSuccess
                })
            } else {
                const res = supabaseErrors({ error })
                return NextResponse.json(res)
            }
        } else {
            return NextResponse.json({
                success: false,
                message: errors
            })
        }
    } catch (err) {
        return NextResponse.json({
            success: false,
            message: err.message
        })
    }
}