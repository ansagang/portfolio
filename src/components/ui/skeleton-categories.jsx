import SkeletonChip from "./skeleton-chip"

export default function SkeletonCategories({ count }) {
    return (
        <>
            {
                [...Array(count)].map((i) => (
                    <SkeletonChip key={i} />
                ))
            }
        </>
    )
}