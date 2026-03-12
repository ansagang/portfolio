import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    try {
        const supabase = await createClient()
        const { media } = await params
        if (media) {
            const { data, error } = await supabase.storage
                .from('portfolio')
                .createSignedUrl(`projects/${media}`, 3600)

            if (!error) {                
                return NextResponse.json({
                    data: data.signedUrl
                })
            } else {
                return NextResponse.json({
                    data: data
                })
            }
        }

    } catch (err) {
        return NextResponse.json({
            message: err.message
        })
    }
}