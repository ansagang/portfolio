"use client"

export default function Input({ value, type, ...props }) {

    return (
        <div className="input">
            <input value={value} type={type} {...props} />
        </div>
    )
}