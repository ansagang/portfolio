"use client"

export default function SkeletonChip({ key, active, type, className, ...props }) {

    return (
        <div key={key} className={'chip skeleton'} {...props}>
            <button className={"chip__button"}>Loading</button>
        </div>
    )
}