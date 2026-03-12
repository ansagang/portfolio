import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
    try {
        const supabase = await createClient()
        const { media } = await params
        if (media) {
             const { error, data } = supabase.storage.from('portfolio').getPublicUrl('projects/'+media)

            if (!error) {                
                return NextResponse.json({
                    data: data.publicUrl
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