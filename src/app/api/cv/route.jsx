import { getLanguage } from "@/lib/get-language"
import { createClient } from "@/lib/supabase/server"

export const dynamic = 'force-dynamic'

export async function GET(request) {
    try {
        const supabase = await createClient()
        const { searchParams } = new URL(request.url)
        const lang = searchParams.get('lang') ? searchParams.get('lang') : null
        const language = await getLanguage({ locale: lang })

        const { data, error } = await supabase.storage
            .from("portfolio")
            .createSignedUrl("assets/"+language.app.files.cv, 60)

        if (error) throw error

        return Response.redirect(data.signedUrl)
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
}
