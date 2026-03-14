"use server"

import { revalidatePath, revalidateTag } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { cookies, headers } from "next/headers"
import languageDefiner from "@/lib/language-definer"

export async function getLanguage({ locale }) {
    const headersList = await headers()
    const headerLanguage = headersList.get("accept-language").split(",")[0].split("-")[0]
    const cookiesList = await cookies()
    const lang = cookiesList.get("lang") ? cookiesList.get("lang").value : headerLanguage

    const language = await languageDefiner({locale: locale, headerLanguage: lang})

    return language
}

export async function revalidateData({tag}) {
    revalidateTag(tag)
}

export default async function changeLanguage({ lang, path = '/' }) {
    try {
        const cookiesList = await cookies()
        cookiesList.set("lang", lang)
        revalidatePath(path)

    } catch (err) {
    }
}

export async function getProjectMedia(media) {
    try {
        const supabase = await createClient()
        if (media) {
            const { error, data } = supabase.storage.from('portfolio').getPublicUrl('projects/'+media)

            if (!error) {
                return {
                    data: data.publicUrl
                }
            } else {
                return {
                    data: data
                }
            }
        }
    } catch (err) {
        return {
            success: false
        }
    }
}

// export async function getCV(cv) {
//     try {
//         const supabase = await createClient()
//         if (cv) {
//             const { data } = supabase.storage.from('portfolio').getPublicUrl('assets/'+cv)

//             if (data) {
//                 return {
//                     data: data.publicUrl
//                 }
//             }
//         }
//     } catch (err) {
//         return {
//             success: false,
//         }
//     }
// }