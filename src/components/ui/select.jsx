import { useEffect, useState } from "react"
import { useRef } from "react"
import { Icons } from "@/config/icons"

export default function Select({ setActiveOption, activeOption, options, text, ...props }) {

    const [active, setActive] = useState(false)

    const ref = useRef()

    function checkClick(e) {
        if (ref?.current?.contains(e.target)) {

        } else {
            setActive(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', (e) => {
            checkClick(e)
        })

        return () => document.removeEventListener('click', checkClick)
    })

    return (
        <div ref={ref} className="select" {...props}>
            <button onClick={() => {
                if (options && options.length !== 0) {
                    setActive(!active)
                }
            }} className="select__button">{activeOption ? activeOption.title ? activeOption.title : text : text}<Icons.downArrow className={active ? 'active' : ''} /></button>
            <div className={active ? "select__options active" : "select__options"}>
                {
                    options ?
                        (
                            options.length > 0 ?
                                (
                                    options.map((option, k) => (
                                        <div key={k} onClick={() => {
                                            setActiveOption(option)
                                            setActive(false)
                                        }} className="select__option">
                                            <div className="select__option-title"><p>{option.title}</p></div>
                                        </div>
                                    ))
                                )
                                :
                                null
                        )
                        :
                        null
                }
            </div>
        </div>

    )
}