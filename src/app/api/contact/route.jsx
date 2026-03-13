import { getLanguage } from "@/lib/get-language"
import { rateLimit } from "@/lib/utils"
import { LRUCache } from "lru-cache"
import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const cache = new LRUCache({ max: 500, ttl: 60_000 })

export async function POST(request) {
    try {
        const ip = request.headers.get('x-forwarded-for') ?? 'unknown'
        const rateLimitRes = rateLimit(ip, 5, cache)        
        if (rateLimitRes) {
            return NextResponse.json({
                success: false,
                message: 'Too many requests'
            });
        }
        
        const { searchParams } = new URL(request.url)
        const { name, email, phone, message } = await request.json()
        const lang = searchParams.get('lang') ? searchParams.get('lang') : null
        const language = await getLanguage({ locale: lang })

        const { error } = await resend.emails.send({
            from: "contact@angsar-aben.kz",
            to: [email],
            template: {
                id: `contact-${lang}`,
                variables: {
                    name: name,
                }
            },
        })

        await resend.emails.send({
            from: "contact@angsar-aben.kz",
            to: "angsar.aben@gmail.com",
            template: {
                id: `request`,
                variables: {
                    name: name,
                    email: email,
                    phone: phone,
                    message: message,
                    lang: lang
                }
            },
        })

        if (error) {
            return NextResponse.json({
                success: false,
                message: JSON.stringify(error)
            });
        }

        return NextResponse.json({
            success: true,
            message: language.res.requestSuccess
        });

    } catch (err) {
        return NextResponse.json({
            success: false,
            message: JSON.stringify(err)
        })
    }
}