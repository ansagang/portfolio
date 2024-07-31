"use client"

import { useEffect, useRef, useState } from "react";

export default function useInView(repeat) {

    const [inView, setInView] = useState()
    const [repeated, setRepeated] = useState(false)

    const ref = useRef(null)

    useEffect(() => {
        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (repeat) {
                    if (entry.isIntersecting) {
                        setInView(true)
                    } else {
                        setInView(false)
                    }
                } else {
                    if (entry.isIntersecting) {
                        if (repeated) {
                            setInView(false)
                            setRepeated(false)
                        } else {
                            setInView(true)
                            setRepeated(true)
                        }
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback);
        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    // useEffect(() => {
    //     const observer = new IntersectionObserver((entries) => {
    //         const entry = entries[0]
    //         if (repeat) {
    //             if (entry.isIntersecting) {
    //                 setVisible(true)
    //             } else {
    //                 setVisible(false)
    //             }
    //         } else {
    //             if (entry.intersectionRatio > 0) {
    //                 if (entry.isIntersecting) {
    //                     setVisible(true)
    //                 } else {
    //                     setVisible(false)
    //                 }
    //             }
    //         }
    //     })
    //     if (element) {
    //         observer.observe(element)
    //     }

    //     return () => {
    //         observer.disconnect();
    //     };

    // }, [element, repeat])


    return [ref, inView]
}