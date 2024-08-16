import AboutMe from "@/components/sections/about-me.home";
import Blog from "@/components/sections/blog.home";
import Contact from "@/components/sections/contact.home";
import Landing from "@/components/sections/landing.home";
import Projects from "@/components/sections/projects.home";
import Game from "@/components/three/game";
import { getLanguage } from "@/lib/get-language";

export default async function Home() {

  const language = await getLanguage({})

  return (
    <>
      <Landing language={language} />
      <AboutMe language={language} />
      <Projects language={language} />
      <Blog language={language} />
      <Contact language={language} />
    </>
  );
}
