"use client"

import Link from "next/link"

export default function Button({ href, form, type, children, className, ...props }) {
    return (
        href ?
        <Link href={href}><button type={form ? 'submit' : 'button'} className={type + ' white ' + className} {...props}>{children}</button></Link>
        :
        <button type={form ? 'submit' : 'button'} className={type + ' white ' + className} {...props}>{children}</button>
    )
}