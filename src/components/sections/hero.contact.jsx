"use client"

import { useState } from "react"
import Input from "../ui/input"
import Button from "../ui/button"
import { getIcon } from "@/lib/utils"
import { socials } from "@/config/socials"
import Link from "next/link"
import Image from "next/image"
import responseHandler from "@/lib/response-handler"

export default function HeroContact({ language }) {

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const notification = responseHandler()

    return (
        <section className="contact">
            <div className="container">
                <div className="contact__inner inner">
                    <div className="contact__content">
                        <div className="contact__title title">
                            <h2>{language.app.pages.contact.meta.title}</h2>
                        </div>
                        <div className="contact__info info">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora maiores hic maxime magnam saepe ipsum temporibus, ipsam deleniti suscipit accusamus neque. Officiis recusandae ullam optio porro at debitis voluptate aperiam.</p>
                        </div>
                    </div>
                    <div className="contact__container">
                        <form action="" className="contact__form">
                            <div className="contact__form-inputs">
                                <div className="contact__form-input">
                                    <label>First name</label>
                                    <Input value={firstname} placeholder="Angsar" type={'text'} />
                                </div>
                                <div className="contact__form-input">
                                    <label>Last name</label>
                                    <Input value={lastname} placeholder="Aben" type={'text'} />
                                </div>
                            </div>
                            <div className="contact__form-input">
                                <label>Email</label>
                                <Input value={email} placeholder="angsar.aben@gmail.com" type={'email'} />
                            </div>
                            <div className="contact__form-input">
                                <label>Message</label>
                                <textarea placeholder="Hello!" value={message} />
                                {/* <Input value={message} placeholder="Hello!" type={'text'} /> */}
                            </div>
                            <Button form={true} className={'contact__form-button'} type={'primary'}>Send</Button>
                        </form>
                        <div className="contact__social">
                            <div className="contact__social-links">
                                {
                                    socials ?
                                        socials.length !== 0 ?
                                            socials.map((social) => (
                                                social.link.startsWith('http') ?
                                                    (

                                                        <Link title={social.title} className="contact__social-link" href={social.link}>
                                                            <Image width={1} height={1} unoptimized src={social.logo} />
                                                        </Link>
                                                    )
                                                    :
                                                    (

                                                        <div onClick={() => {
                                                            navigator.clipboard.writeText(social.link)
                                                            notification({message: 'You have coppied the link', type: 'success', language: language})
                                                        }} title={social.title} className="contact__social-link">
                                                            <Image width={1} height={1} unoptimized src={social.logo} />
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