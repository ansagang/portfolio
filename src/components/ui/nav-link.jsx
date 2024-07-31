"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({ href, children, exact, className, ...props }) {
    const pathname = usePathname()
    const regEx = /^http/ || /^tel/
    const state = exact ? (pathname === `${href}` ? `active ${className}` : `${className}`) : (pathname.startsWith(href) ? `active ${className}` : `${className}`)
    return (
        regEx.test(href) ?
            (
                <a target='blank' href={href} className={`link ${state}`}>
                    {children}
                </a>
            )
            :
            (

                <Link href={href} exact={exact} className={`link ${state}`} {...props}>
                    {children}
                </Link>
            )
    )
}