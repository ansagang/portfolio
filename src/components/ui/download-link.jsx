"use client"

export default function DownloadLink({ file, children, className, ...props }) {
    return (
        <a href={`/files/${file}`} target="_blank" rel="noopener noreferrer" className={'link link__download' + " " + className} {...props}>{children}</a>
    )
}