"use client"

import Input from "@/components/ui/input"
import Button from "./button"

export default function InputFile({ value, ...props }) {

    return (
        <div className="input">
            <div className="input__file">
                <Input value={value} type="file" id="file" {...props} />
                <label htmlFor="file" className="input__file-label">Change avatar</label>
            </div>
        </div>
    )
}