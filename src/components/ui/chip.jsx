"use client"

export default function Chip({ active, type, children, className, ...props }) {

    return (
        <div className={type ? type === 'primary' ? `chip ${className} primary` : `chip ${className} secondary` : `chip ${className} primary`} {...props}>
            <button className={active ? "chip__button active" : "chip__button"}>{children}</button>
        </div>
    )
}