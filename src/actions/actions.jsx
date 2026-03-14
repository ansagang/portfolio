"use server"

import { revalidateTag } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function revalidateData({tag}) {
    revalidateTag(tag)
}

export default async function changeLanguage({ lang, path = '/' }) {
    const cookiesList = await cookies()
    cookiesList.set("lang", lang)
    redirect(`/${lang}${path}`)
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
