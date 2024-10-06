"use client";

import { findCommonElement } from "@/lib/utils";
import React, { useState, useEffect } from "react";

const Cursor = ({ colors, pointers, cards }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const [isColor, setIsColor] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [isClicked, setIsClicked] = useState(false)
  const [isCard, setIsCard] = useState(false)

  const handleMouseDown = () => {
    setIsClicked(true);
  };

  const handleMouseUp = () => {
    setIsClicked(false);
  };

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
    // classes.forEach((clas) => {
    //     setIsPointer(target.className.split(' ').includes(clas))
    // })
    // target.className.split(' ').forEach((targetClassname) => {
    //     setIsPointer(classes.includes(targetClassname))
    // })
    const target = e.target

    const closestColor = target.closest(`.${colors.join(", .")}`);
    const closestPointer = target.closest(pointers.join(", "));
    const closestCard = target.closest(`.${cards.join(", .")}`);

    // If a parent (or the target) with the class exists, set the cursor as pointer
    setIsColor(!!closestColor);
    setIsPointer(!!closestPointer)
    setIsCard(!!closestCard)
    // setIsPointer(
    //     window.getComputedStyle(e.target).getPropertyValue("cursor") === "pointer"
    //     window.get
    //   );
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    }



  }, [position]);

  const flareSize = isPointer ? 0 : 30;

  const cursorStyle = isPointer ? { left: "-100px", top: "-100px" } : {};

  return (
    <div
      className={`cursor ${isColor ? "color" : ""} ${isPointer ? "pointer" : ""} ${isClicked ? "clicked" : ''} ${isCard ? 'card' : ''}`}
      style={{
        ...cursorStyle,
        left: `${position.x}px`,
        top: `${position.y}px`
      }}
    ></div>
  );
};

export default Cursor;