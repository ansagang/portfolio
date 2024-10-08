import { useState, useCallback } from "react";

function throttle(
    func,
    delay
) {
    let lastCall = 0;
    return (...args) => {
        const now = new Date().getTime();
        if (now - lastCall < delay) {
            return;
        }
        lastCall = now;
        return func(...args);
    };
}

export const TiltCard = ({ children, ...props }) => {
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const onMouseMove = useCallback(
        throttle((e) => {
            const card = e.currentTarget;
            const box = card.getBoundingClientRect();
            const x = e.clientX - box.left;
            const y = e.clientY - box.top;
            const centerX = box.width / 2;
            const centerY = box.height / 2;
            const rotateX = (y - centerY) / 40;
            const rotateY = (centerX - x) / 40;

            setRotate({ x: rotateX, y: rotateY });
        }, 100),
        []
    );

    const onMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <div {...props} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave} style={{transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1, 1, 1)`, transition: "all 400ms cubic-bezier(0.03, 0.98, 0.52, 0.99) 0s"}}>
            {children}
        </div>
    );
};
