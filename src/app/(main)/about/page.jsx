import AboutMe from "@/components/sections/about.about";
import { getLanguage } from "@/lib/get-language";

export default async function About() {

  const language = await getLanguage({})

  return (
    <>
      <AboutMe language={language} />
    </>
  );
}
