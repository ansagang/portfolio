import { getLanguage } from "@/lib/get-language"
import { createClient } from "@/lib/supabase/server"

export const revalidate = 3600

export async function GET(request) {
    try {
        const supabase = await createClient()
        const { searchParams } = new URL(request.url)
        const lang = searchParams.get('lang') ? searchParams.get('lang') : null
        const language = await getLanguage({ locale: lang })

        const { data, error } = await supabase.storage
            .from("portfolio")
            .download("assets/"+language.app.files.cv)

        if (error) throw error

        const bytes = await data.arrayBuffer()

        return new Response(bytes, {
            headers: {
                "Content-Type": "application/pdf",
                "Content-Disposition": 'attachment; filename="CV.pdf"',
                "Cache-Control": "public, max-age=3600, s-maxage=3600",
            },
        })
    } catch (err) {
        return new Response(JSON.stringify({ message: err.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        })
    }
}
