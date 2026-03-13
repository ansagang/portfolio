"use client"

import { useState, useTransition } from "react"
import Input from "../ui/input"
import Button from "../ui/button"
import { postContact } from "@/actions/api"
import { Icons } from "@/config/icons"
import { contactValidation } from "@/lib/validation"
import { toast } from "sonner"

export default function ContactForm({ language }) {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [errors, setErrors] = useState({})

    const [isPending, startTransition] = useTransition()

    async function post({ name, phone, email, message }) {
        try {
            startTransition(async () => {
                const errors = contactValidation({ name, email, phone, message, language })
                if (Object.keys(errors).length == 0) {
                    setErrors({})
                    const res = await postContact({ name, email, phone, message, lang: language.lang })
                    if (res) {
                        if (res.success) {
                            toast(res.message, {
                                icon: <Icons.success />
                            })
                            setName('')
                            setEmail('')
                            setMessage('')
                            setPhone('')
                        } else {
                            toast(res.message, {
                                icon: <Icons.error />
                            })
                        }
                    }
                } else {
                    setErrors(errors)
                    Object.keys(errors).forEach((error) => {
                        toast(errors[error], {
                            icon: <Icons.error />
                        })
                    })
                }
            });
        } catch (err) {
            toast(err.message, {
                icon: <Icons.error />
            })
        }
    }

    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            post({ name, phone, email, message })
        }} className="contact__form">
            <div className="contact__form-inputs">
                <div className="contact__form-input">
                    <label>{language.app.labels.name}{errors.name && <Icons.validation />}</label>
                    <Input onChange={(e) => setName(e.target.value)} value={name} placeholder={language.app.labels.namePlaceholder} type={'text'} />
                </div>
                <div className="contact__form-input">
                    <label>{language.app.labels.phone}{errors.phone && <Icons.validation />}</label>
                    <Input onChange={(e) => setPhone(e.target.value)} value={phone} placeholder={language.app.labels.phonePlaceholder} type={'text'} />
                </div>
            </div>
            <div className={errors.email ? "contact__form-input error" : "contact__form-input"}>
                <label>{language.app.labels.email}{errors.email && <Icons.validation />}</label>
                <Input onChange={(e) => setEmail(e.target.value)} value={email} placeholder={language.app.labels.emailPlaceholder} type={'text'} />
            </div>
            <div className="contact__form-input">
                <label>{language.app.labels.message}{errors.message && <Icons.validation />}</label>
                <textarea onChange={(e) => setMessage(e.target.value)} placeholder={language.app.labels.messagePlaceholder} value={message} />
            </div>
            <Button disabled={isPending} form={true} className={'contact__form-button'} type={'primary'}>{language.app.buttons.send}</Button>
        </form>
    )
}