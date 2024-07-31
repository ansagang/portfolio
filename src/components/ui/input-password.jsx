"use client"

import { useState } from "react"
import { Icons } from "@/config/icons"
import Input from "@/components/ui/input"

export default function InputPassword({ value, ...props }) {

    const [visible, setVisible] = useState(false)

    return (
        <div className='input'>
            <div className="input__password">
                <Input value={value} type={visible ? "text" : "password"} {...props} />
                <button disabled={value ? false : true} type="button" onClick={() => setVisible(!visible)}>
                    {
                        visible ?
                            <Icons.eyesClosed className={value ? 'active' : null} />
                            :
                            <Icons.eyes className={value ? 'active' : null} />
                    }
                </button>
            </div>
        </div>
    )
}