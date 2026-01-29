"use client"

import { useState, useTransition } from "react"
import Input from "../ui/input"
import Button from "../ui/button"
import { socials } from "@/config/socials"
import Link from "next/link"
import Image from "next/image"
import responseHandler from "@/lib/response-handler"
import { postContact } from "@/actions/api"
import { useRouter } from "next/navigation"

export default function Contact({ language }) {

    const [first_name, setFirstname] = useState('')
    const [last_name, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const [isPending, startTransition] = useTransition()

    const notification = responseHandler()

    async function post({ first_name, last_name, email, message }) {
        try {
            startTransition(async () => {
                const res = await postContact({ first_name, last_name, email, message, lang: language.lang})
                console.log(res);
                
                if (res) {
                    notification({ message: res.message, type: res.success ? "success" : "error", language: language })
                    if (res.success) {
                        setFirstname('')
                        setLastname('')
                        setEmail('')
                        setMessage('')
                        // router.refresh()
                    } 
                }
            });
        } catch (err) {
            notification({ message: err.message, type: 'error' })
        }
    }

    return (
        <section className="contact">
            <div className="container">
                <div className="contact__inner inner__big">
                    <div className="contact__content">
                        <div className="contact__title title">
                            <h2>{language.app.pages.contact.sections.contact.title}</h2>
                        </div>
                        <div className="contact__info info">
                            <p>{language.app.pages.contact.sections.contact.info}</p>
                        </div>
                    </div>
                    <div className="contact__container">
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            post({first_name, last_name, email, message})
                        }} className="contact__form">
                            <div className="contact__form-inputs">
                                <div className="contact__form-input">
                                    <label>{language.app.labels.firstName}</label>
                                    <Input onChange={(e) => setFirstname(e.target.value)} value={first_name} placeholder={language.app.labels.firstNamePlaceholder} type={'text'} />
                                </div>
                                <div className="contact__form-input">
                                    <label>{language.app.labels.lastName}</label>
                                    <Input onChange={(e) => setLastname(e.target.value)} value={last_name} placeholder={language.app.labels.lastNamePlaceholder} type={'text'} />
                                </div>
                            </div>
                            <div className="contact__form-input">
                                <label>{language.app.labels.email}</label>
                                <Input onChange={(e) => setEmail(e.target.value)} value={email} placeholder={language.app.labels.emailPlaceholder} type={'text'} />
                            </div>
                            <div className="contact__form-input">
                                <label>{language.app.labels.message}</label>
                                <textarea onChange={(e) => setMessage(e.target.value)} placeholder={language.app.labels.messagePlaceholder} value={message} />
                            </div>
                            <Button disabled={isPending} form={true} className={'contact__form-button'} type={'primary'}>{language.app.buttons.send}</Button>
                        </form>
                        <div className="contact__social">
                            <div className="contact__social-links">
                                {
                                    socials ?
                                        socials.length !== 0 ?
                                            socials.map((social, k) => (
                                                social.link.startsWith('http') ?
                                                    (

                                                        <Link key={k} title={social.title} className="contact__social-link" href={social.link}>
                                                            <Image alt={social.title} width={1} height={1} unoptimized src={social.logo} />
                                                        </Link>
                                                    )
                                                    :
                                                    (

                                                        <div key={k} onClick={() => {
                                                            navigator.clipboard.writeText(social.link)
                                                            notification({message: language.res.linkCopied, language: language})
                                                        }} title={social.title} className="contact__social-link">
                                                            <Image alt={social.title} width={1} height={1} unoptimized src={social.logo} />
                                                        </div>
                                                    )
                                            ))
                                            :
                                            null
                                        :
                                        null
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}