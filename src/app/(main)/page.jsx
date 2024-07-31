import Landing from "@/components/sections/landing";
import { getLanguage } from "@/lib/get-language";

export default async function Home() {

  const language = await getLanguage({})

  return (
    <>
      <Landing language={language} />
    </>
  );
}
