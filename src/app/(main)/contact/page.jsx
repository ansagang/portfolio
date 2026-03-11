import { getStatus } from "@/actions/api";
import ContactForm from "@/components/contact/contact-form";
import ContactSocials from "@/components/contact/contact-socials";
import Chip from "@/components/ui/chip";
import { getLanguage } from "@/lib/get-language";

export async function generateMetadata() {

  const language = await getLanguage({})

  return {
    title: language.app.pages.contact.meta.title,
    description: language.app.pages.contact.meta.description
  }
}

export default async function Contact() {

  const language = await getLanguage({})
  const { data: status } = await getStatus({ lang: language.lang, revalidate: 3600 })

  return (
    <section className="contact">
      <div className="container">
        <div className="contact__inner inner">
          {
            status ?
              <Chip type="secondary" className={'contact__status'}><div className={status.available ? 'contact__status-dot green' : 'contact__status-dot red'}></div>{status.status}</Chip>
              :
              null
          }
          <div className="contact__content">
            <div className="contact__title title">
              <h2>{language.app.pages.contact.sections.contact.title}</h2>
            </div>
            <div className="contact__info info">
              <p>{language.app.pages.contact.sections.contact.info}</p>
            </div>
          </div>
          <div className="contact__container">
            <div className="contact__left">
              <ContactForm language={language} />
            </div>
            <div className="contact__right">
              <ContactSocials language={language} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}