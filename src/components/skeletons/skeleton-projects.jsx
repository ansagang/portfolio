import SkeletonProject from "./skeleton-project";

export default function SkeletonProjects({ number }) {
    return (
        [...Array(number)].map((i) => (
            <SkeletonProject key={i} />
        ))
    )
}