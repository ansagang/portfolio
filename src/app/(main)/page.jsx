import { getProjects, getBlogs } from "@/actions/api";
import AboutMe from "@/components/sections/about-me.home";
import Blog from "@/components/sections/blog.home";
import Contact from "@/components/sections/contact.home";
import Landing from "@/components/sections/landing.home";
import Projects from "@/components/sections/projects.home";
import Game from "@/components/three/game";
import { getLanguage } from "@/lib/get-language";

export default async function Home() {

  const language = await getLanguage({})
  // const {data: projects} = await getProjects({lang: language.lang, limit: 4})
  // const {data: blogs} = await getBlogs({lang: language.lang, limit: 3})
  

  return (
    <>
      <Landing language={language} />
      <AboutMe language={language} />
      <Projects language={language} />
      {/* <Blog language={language} blogs={blogs} /> */}
      <Contact language={language} />
    </>
  );
}
