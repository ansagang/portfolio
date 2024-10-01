"use client"

import { Icons } from "@/config/icons"
import Button from "./button"

export default function Modal({ children, ...props }) {

    return (
        <dialog className="dialog" {...props}>
            <div className="dialog__close">
                <Icons.close />
            </div>
           {children}
        </dialog>
    )
}