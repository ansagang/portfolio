"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export default async function changeLanguage({ lang, path = '/' }) {
    try {
        const cookiesList = cookies()
        console.log(path);
        
        cookiesList.set("lang", lang)
        revalidatePath(path)

    } catch (err) {
        console.log(err);
    }
}

export async function getProjectMedia(media) {
    try {
        const supabase = createClient()
        if (media) {
            const { data } = supabase.storage.from('projects').getPublicUrl(media)

            if (data) {
                return {
                    data: data.publicUrl
                }
            }
        }
    } catch (err) {
        return {
            success: false,
        }
    }
}

export async function getCV(cv) {
    try {
        const supabase = createClient()
        if (cv) {
            const { data } = supabase.storage.from('assets').getPublicUrl(cv)

            if (data) {
                return {
                    data: data.publicUrl
                }
            }
        }
    } catch (err) {
        return {
            success: false,
        }
    }
}