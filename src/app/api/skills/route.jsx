import { getLanguage } from "@/lib/get-language"
import supabaseErrors from "@/lib/supabase/errors"
import { createClient } from "@/lib/supabase/server"
import { skillValidation } from "@/lib/validation"
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        const supabase = await createClient()

        const { searchParams } = new URL(request.url)
        const lang = searchParams.get('lang') ? searchParams.get('lang') : null
        const {data, error} = await supabase.from("skills").select('*').match({ lang: lang })
        
        if (!error) {
            return NextResponse.json({
                data: data
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

export async function DELETE(request) {
    try {
        const supabase = await createClient()
        const { searchParams } = new URL(request.url)
        const id = searchParams.get('id')

        if (!id) {
            return NextResponse.json({ success: false, message: 'Missing id' }, { status: 400 })
        }

        const { error } = await supabase.from('skills').delete().eq('id', id)

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
        const { title, tags } = await request.json()
        const lang = searchParams.get('lang') ? searchParams.get('lang') : null
        const language = await getLanguage({ locale: lang })
        const errors = skillValidation({ title, tags, language })
        if (errors.length === 0) {
            const { error } = await supabase.from('skills').insert({
                title,
                tags,
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