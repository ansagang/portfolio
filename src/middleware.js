import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

export async function middleware(request) {

    // const dev = isDev()

    // const { data: user } = await getUser()
    // for (let route of routes) {
    //     for (let rout of route.routes)
    //         if (request.nextUrl.pathname.startsWith(rout)) {
    //             if (user) {
    //                 if (route.access) {
    //                     if (!route.access.includes(user.role)) {
    //                         return NextResponse.rewrite(new URL('/404', request.url))
    //                     }
    //                 } else {
    //                     return NextResponse.rewrite(new URL('/404', request.url))
    //                 }
    //             } else {
    //                 if (route.access) {
    //                     return NextResponse.rewrite(new URL('/404', request.url))
    //                 }
    //             }
    //         }
    //         // } else if (request.nextUrl.pathname.startsWith('/@')) {
    //         //     const { data: profile } = await getUsers({ username: request.nextUrl.pathname.split('/@')[1] })
    //         //     if (!profile) {
    //         //         console.log('a');
    //         //         return NextResponse.rewrite(new URL('/404', request.url))
    //         //     }
    //         // }
    // }

    const headersList = headers()
    const headerLanguage = headersList.get("accept-language").split(",")[0].split("-")[0]
    const response = NextResponse.next()

    const language = request.cookies.get('lang')
    
    if (!language) {
        response.cookies.set('lang', headerLanguage)
    }

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * Feel free to modify this pattern to include more paths.
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}