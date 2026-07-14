import { Navbar } from "@/components/ui";
import { ArcadeContent } from "@/components/pages/arcade/ArcadeContent";
import { ArcadeUnderConstruction } from "@/components/pages/arcade/ArcadeUnderConstruction";
import { ARCADE_ENABLED } from "@/libs/arcade-ui";
import { fetchChannelVideos } from "@/libs/youtube";

export default async function LocaleArcadePage() {
  if (!ARCADE_ENABLED) {
    return (
      <>
        <Navbar />
        <ArcadeUnderConstruction />
      </>
    );
  }

  const videos = await fetchChannelVideos(9);

  return (
    <>
      <Navbar />
      <ArcadeContent videos={videos} />
    </>
  );
}
