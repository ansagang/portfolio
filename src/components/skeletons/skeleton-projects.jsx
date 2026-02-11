import SkeletonProject from "./skeleton-project";

export default function SkeletonProjects({ number, className }) {
    return (
        <div className={className}>
            {
                [...Array(number)].map((i, k) => (
                    <SkeletonProject key={k} />
                ))
            }
        </div>
    )
}