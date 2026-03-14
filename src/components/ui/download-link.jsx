"use client"

export default function DownloadLink({ href, download, children, className, ...props }) {
    return (
        <a href={href} target="_blank" rel="noopener noreferrer" download={download} className={'link link__download' + " " + className} {...props}>{children}</a>
    )
}