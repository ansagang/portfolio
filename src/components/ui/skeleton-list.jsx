import SkeletonProject from "../skeletons/skeleton-project";

export default function SkeletonList({ count, className }) {
    return (
        <div className={className}>
            {
                [...Array(count)].map((i) => (
                    <SkeletonProject key={i} />
                ))
            }
        </div>
    )
}