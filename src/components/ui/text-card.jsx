"use client"

export default function TextCard({color, children, ...props}) {
    return (
        <div style={{backgroundColor: color}} className="text-card" {...props}>
            {children}
        </div>
    )
}