"use client"

import { Icons } from "@/config/icons";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Slider({ children }) {

    const ref = useRef(null)
    const [index, setIndex] = useState(0)
    let elements = children.props.children.length

    // const [isMouseDown, setIsMouseDown] = useState(false);
    // const mouseCoords = useRef({
    //     startX: 0,
    //     startY: 0,
    //     scrollLeft: 0,
    //     scrollTop: 0
    // });
    // // const draggableElements = useRef([
    // //     children.props.children.map((child, index) => {
    // //         draggableElements.current.push(child)
    // //     })]);
    // const handleDragStart = (e) => {
    //     if (!ref.current) return
    //     const slider = ref.current.children[0];
    //     const startX = e.pageX - slider.offsetLeft;
    //     const startY = e.pageY - slider.offsetTop;
    //     const scrollLeft = slider.scrollLeft
    //     mouseCoords.current = { startX, startY, scrollLeft }
    //     setIsMouseDown(true)
    //     document.body.style.cursor = "grabbing"
    // }
    // const handleDragEnd = () => {
    //     setIsMouseDown(false)
    //     if (!ref.current) return
    //     document.body.style.cursor = "default"
    // }
    // const handleDrag = (e) => {
    //     // if (!isMouseDown || !ref.current) return;
    //     e.preventDefault();
    //     const slider = ref.current.children[0];
    //     const x = e.pageX - slider.offsetLeft;
    //     const deltaX = x - mouseCoords.current.startX;
    //     const walkX = (x - mouseCoords.current.startX) * 1.5;
    //     slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;

    //     // Calculate swipe threshold (adjust as needed)
    //     const swipeThreshold = slider.offsetWidth / 3; // Consider 1/3 of element width

    //     // Handle swiping to the right (1 to 2)
    //     if (deltaX > swipeThreshold) {
    //         setIndex(Math.min(index + 1, ref.current.children[0].children.length - 1)) // Prevent out-of-bounds index
    //         // Update scroll position to show the next element
    //         slider.scrollLeft = ref.current.children[0].children[index].offsetLeft;
    //     }

    //     mouseCoords.current.startX = x;
    //     console.log(x, mouseCoords, deltaX, slider);
    // }


    const getVisibleElementIndex = () => {
        // Improved visibility check (consider both horizontal and vertical scrolling)
        // if (!ref.current || !ref.current.children.length) return null;

        const scrollContainerRect = ref.current.children[0].getBoundingClientRect();
        for (let i = 0; i < ref.current.children[0].children.length; i++) {
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

        // No visible element found
        return null;
    };


    useEffect(() => {
        ref.current.children[0].addEventListener("scroll", () => {
            console.log('aaaaaaaaaaaa');
            getVisibleElementIndex()
        })
    })


    const swipeToElement = (targetIndex) => {
        const slider = ref.current.children[0];
        // Function to swipe to a specific element (optional)
        if (targetIndex < 0 || targetIndex >= children.props.children.length) {
            return;
        }
        setIndex(targetIndex)
        slider.scrollLeft = ref.current.children[0].children[targetIndex].offsetLeft;
    };

    // setTimeout(() => {
    //     swipeToElement(1)
    // }, 1000);

    return (
        <div className="slider">
            <div ref={ref} className={"slider__slider"}>
                {children}
            </div>
            <div className="slider__dots">
                {
                    children.props.children.length !== 1 ?
                        [...Array(elements)].map((e, key) => (
                            <div onClick={() => swipeToElement(key)} className={key === index ? "slider__dot active" : "slider__dot"} key={key}></div>
                        ))
                        :
                        null
                }
            </div>
            <div className="slider__arrows">
                {
                    index !== 0 ?
                        <div onClick={() => swipeToElement(index - 1)} className="slider__arrow-left">
                            <Icons.arrow />
                        </div>
                        :
                        null
                }
                {
                    index !== children.props.children.length - 1 ?

                        <div onClick={() => swipeToElement(index + 1)} className="slider__arrow-right">
                            <Icons.arrow />
                        </div>
                        :
                        null
                }
            </div>
        </div>
    )
}