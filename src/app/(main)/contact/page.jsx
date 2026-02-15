import ContactForm from "@/components/contact/contact-form";
import { getLanguage } from "@/lib/get-language";

export async function generateMetadata() {

  const language = await getLanguage({})

  return {
    title: language.app.pages.contact.meta.title
  }
}

export default async function Contact() {

  const language = await getLanguage({})

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
            <ContactForm language={language} />
          </div>
        </div>
      </div>
    </section>
  )
}