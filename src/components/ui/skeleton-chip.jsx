"use client"

export default function SkeletonChip({ active, type, className, ...props }) {

    return (
        <div className={'chip skeleton'} {...props}>
            <button className={"chip__button"}>Loading</button>
        </div>
    )
}