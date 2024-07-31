"use server"

import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"

export default async function changeLanguage({ lang, path = '/' }) {
    try {
        const cookiesList = cookies()
        cookiesList.set("lang", lang)
        revalidatePath(path)
    } catch (err) {
        console.log(err);
    }
}