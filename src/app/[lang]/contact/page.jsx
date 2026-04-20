import { getStatus } from "@/actions/api";
import ContactForm from "@/components/contact/contact-form";

import { getAlternates } from "@/lib/get-alternates";
import { BASE_URL } from "@/lib/base-url";
import ContactSocials from "@/components/contact/contact-socials";
import Chip from "@/components/ui/chip";
import { getLanguage } from "@/lib/get-language";

export async function generateMetadata({ params }) {

  const { lang } = await params
  const language = await getLanguage({ locale: lang })

  return {
    title: language.app.pages.contact.meta.title,
    description: language.app.pages.contact.meta.description,
    openGraph: {
      type: "website",
      ...getAlternates(lang).openGraph,
      title: language.app.pages.contact.meta.title,
      description: language.app.pages.contact.meta.description,
      siteName: language.app.meta.title,
      images: [`${BASE_URL}/images/banner-one.png`]
    },
    ...getAlternates(lang, '/contact'),
  }
}

export default async function Contact({ params }) {

  const { lang } = await params
  const language = await getLanguage({ locale: lang })
  const { data: status } = await getStatus({ lang, revalidate: 3600 })

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
