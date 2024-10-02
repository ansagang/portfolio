import Contact from "@/components/sections/contact.contact";
import { getLanguage } from "@/lib/get-language";

export async function generateMetadata() {

  const language = await getLanguage({})

  return {
    title: language.app.pages.contact.meta.title
  }
}

export default async function ContactPage() {

  const language = await getLanguage({})

  return (
    <Contact language={language} />
  );
}
