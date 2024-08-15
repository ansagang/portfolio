"use client"

import { useState, useEffect } from 'react';

export default function IncrementingNumber({ end, duration = 1000 }) {
    const [currentNumber, setCurrentNumber] = useState(0);

    useEffect(() => {
        let start = 0;
        const increment = end / (duration / 10); // Increment step
        const interval = setInterval(() => {
            start += increment;
            if (start >= end) {
                clearInterval(interval);
                setCurrentNumber(end);
            } else {
                setCurrentNumber(Math.round(start));
            }
        }, 10);

        return () => clearInterval(interval);
    }, [end, duration]);

    return <>{currentNumber}</>
};
