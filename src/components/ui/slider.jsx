"use client"

import { Icons } from "@/config/icons";
import { useEffect, useRef, useState } from "react";

export default function Slider({ children, show }) {

    const ref = useRef(null);
    const [index, setIndex] = useState(0);
    const elements = children ? children.props.children.length-1 : 0;

    useEffect(() => {
        console.log(index);
        
    })

    const getVisibleElementIndex = () => {
        if (!ref.current || !ref.current.children.length) return;

        const scrollContainerRect = ref.current.children[0].getBoundingClientRect();
        for (let i = 0; i < ref.current.children[0].children.length-1; i++) {
            const elementRect = ref.current.children[0].children[i].getBoundingClientRect();
            if (
                elementRect.top >= scrollContainerRect.top &&
                elementRect.left >= scrollContainerRect.left &&
                elementRect.bottom <= scrollContainerRect.bottom &&
                elementRect.right <= scrollContainerRect.right
            ) {
                setIndex(i)
            }
        }
    };

    useEffect(() => {
        const slider = ref.current.children[0];
        const handleScroll = () => getVisibleElementIndex();

        slider.addEventListener("scroll", handleScroll);

        return () => {
            slider.removeEventListener("scroll", handleScroll);
        };
    }, [ref, children]);

    const swipeToElement = (targetIndex) => {
        if (targetIndex < 0 || targetIndex >= elements) {
            return;
        }
        setIndex(targetIndex);
        const firstEl = ref.current.children[0].children[0].getBoundingClientRect();
        const lastEl = ref.current.children[0].children[ref.current.children[0].children.length-1].getBoundingClientRect();
        ref.current.children[0].children[targetIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'start'
        })
        if (firstEl.right == 0) {
            console.log('aa');
        }
        if (lastEl.left === 0) {
            console.log('bbb');
            
        }
        console.log(firstEl);
        console.log(lastEl);
        
    };

    return (
        <div className="slider">
            <div ref={ref} className="slider__slider">
                {children}
            </div>
            {/* <div className="slider__dots">
                {elements > 1 &&
                    [...Array(show)].map((e, key) => (
                        <div
                            onClick={() => swipeToElement(key)}
                            className={key === index ? "slider__dot active" : "slider__dot"}
                            key={key}
                        />
                    ))
                }
            </div> */}
            <div className="slider__arrows">
                {index !== 0 &&
                    <div onClick={() => swipeToElement(index - 1)} className="slider__arrow-left">
                        <Icons.arrow />
                    </div>
                }
                {index !== elements - 1 &&
                    <div onClick={() => swipeToElement(index + 1)} className="slider__arrow-right">
                        <Icons.arrow />
                    </div>
                }
            </div>
        </div>
    );
}