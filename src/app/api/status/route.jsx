import supabaseErrors from "@/lib/supabase/errors"
import { createClient } from "@/lib/supabase/server"
import facetsFinder from "@/lib/utils"
import { NextResponse } from "next/server"

export const dynamic = 'force-dynamic'

export async function GET(request) {
    try {
        const supabase = createClient()

        const { searchParams } = new URL(request.url)
        const lang = searchParams.get('lang') ? searchParams.get('lang') : null
        const {data, error} = await supabase.from("status").select('*').match({ lang: lang }).single() 
        console.log(data);
        
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