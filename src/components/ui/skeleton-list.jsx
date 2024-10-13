import SkeletonProject from "./skeleton-project";

export default function SkeletonList({ count }) {
    return (
        <>
            {
                [...Array(count)].map((i) => (
                    <SkeletonProject key={i} />
                ))
            }
        </>
    )
}