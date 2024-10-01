import HeroContact from "@/components/sections/hero.contact";
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
    <HeroContact language={language} />
  );
}
