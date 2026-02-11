import SkeletonChip from "./skeleton-chip"

export default function SkeletonCategories({ count }) {
    return (
        <div className="projects__chips" >
            {
                [...Array(count)].map((i, k) => (
                    <SkeletonChip key={k} />
                ))
            }
        </div>
    )
}