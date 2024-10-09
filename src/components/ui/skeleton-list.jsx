import SkeletonProject from "./skeleton-project";

export default function SkeletonList({ count, ...props }) {
    return (
        <div {...props}>
            {
                [...Array(count)].map((i) => (
                    <SkeletonProject key={i} />
                ))
            }
        </div>
    )
}