import { getLanguage } from "@/lib/get-language"
import supabaseErrors from "@/lib/supabase/errors"
import { createClient } from "@/lib/supabase/server"
import { contactValidation } from "@/lib/validation"
import { NextResponse } from "next/server"

export async function POST(request) {
    try {
        const supabase = await createClient()
        const { searchParams } = new URL(request.url)
        const {first_name, last_name, email, message} = await request.json()
        const lang = searchParams.get('lang') ? searchParams.get('lang') : null
        const language = await getLanguage({ locale: lang })
        const errors = contactValidation({ first_name, last_name, email, message, language })
        if (errors.length === 0) {
            const { error } = await supabase.from('contact').insert({ first_name: first_name, last_name: last_name, email: email, message: message, lang: language.lang })
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