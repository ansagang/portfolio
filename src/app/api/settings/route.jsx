import { getLanguage } from "@/lib/get-language"
import supabaseErrors from "@/lib/supabase/errors"
import { createClient } from "@/lib/supabase/server"
import { settingsValidation } from "@/lib/validation"
import { NextResponse } from "next/server"

export async function GET(request) {
    try {
        const supabase = await createClient()

        const { searchParams } = new URL(request.url)
        const lang = searchParams.get('lang') ? searchParams.get('lang') : null
        const {data, error} = await supabase.from("settings").select('*').match({ lang: lang }).single()
        
        if (!error) {
            return NextResponse.json({
                data: data
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

export async function POST(request) {
    try {
        const supabase = await createClient()
        const { searchParams } = new URL(request.url)
        const { status, available } = await request.json()
        const lang = searchParams.get('lang') ? searchParams.get('lang') : null
        const language = await getLanguage({ locale: lang })
        const errors = settingsValidation({ lang: language.lang, language })
        if (errors.length === 0) {
            const { error } = await supabase.from('settings').upsert({
                status,
                available,
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