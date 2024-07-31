"use client"

import Button from "./button"

export default function Modal({ refer, title, description, cancelButton, button, children, ...props }) {

    return (
        <dialog ref={refer} {...props} className="dialog">
            <div className="dialog__head">
                <div className="dialog__title title">
                    <h3>{title}</h3>
                </div>
                {
                    description ?
                        (
                            <div className="dialog__info info">
                                <p>{description}</p>
                            </div>
                        )
                        :
                        null
                }
            </div>
            <div className="dialog__body">
                {children}
            </div>
            <div className="dialog__buttons">
                {cancelButton}
                {button}
            </div>
        </dialog>
    )
}