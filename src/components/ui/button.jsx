"use client"

export default function Button({ form, type, children, className, ...props }) {
    return (
        <button type={form ? 'submit' : 'button'} className={type + ' ' + className} {...props}>{children}</button>
    )
}