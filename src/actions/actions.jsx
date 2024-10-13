"use server"

import { cookies } from "next/headers"
import { revalidatePath, revalidateTag } from "next/cache"
import { NextResponse } from "next/server"

export default async function changeLanguage({ lang, path = '/' }) {
    try {
        const cookiesList = cookies()
        console.log(path);
        
        cookiesList.set("lang", lang)
        // revalidatePath(path)

    } catch (err) {
        console.log(err);
    }
}