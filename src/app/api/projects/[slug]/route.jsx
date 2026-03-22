import supabaseErrors from "@/lib/supabase/errors"
import { createClient } from "@/lib/supabase/server"
import facetsFinder from "@/lib/utils"
import { NextResponse } from "next/server"
export async function GET(request, {params}) {
    try {
        const supabase = await createClient()
        const { slug } = await params
        const { searchParams } = new URL(request.url)
        const lang = searchParams.get('lang') ? searchParams.get('lang') : null        

        const { data, error } = await supabase.from("projects").select("").match({ lang: lang, slug: slug }).single()

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