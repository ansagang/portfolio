"use client"

export default function Chip({ active, type = 'primary', children, className, ...props }) {

    return (
        <div className={`chip ${className} ${type}`} {...props}>
            <button className={active ? "chip__button active" : "chip__button"}>{children}</button>
        </div>
    )
}