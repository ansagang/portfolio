'use client'

export default function TextAnimation({ text }) {

    return (
        <div className="text-animation">
            {
                text.split('').map((char, k) => (
                    <span key={k} style={{ animationDelay: (k * 0.1) + 's' }}>{char}</span>
                ))
            }
        </div>
    )
}