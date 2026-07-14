import { Navbar } from "@/components/ui";
import { ArcadeUnderConstruction } from "@/components/pages/arcade/ArcadeUnderConstruction";
import { PixelArtCollectionContent } from "@/components/pages/arcade/PixelArtCollectionContent";
import { ARCADE_ENABLED } from "@/libs/arcade-ui";

export default function LocalePixelArtPage() {
  if (!ARCADE_ENABLED) {
    return (
      <>
        <Navbar />
        <ArcadeUnderConstruction />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <PixelArtCollectionContent />
    </>
  );
}
