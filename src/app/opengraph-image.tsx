import { hero, person } from "@/content/site";
import { ogImage, ogSize } from "@/lib/og";

export const alt = `${person.displayName}, ${person.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    eyebrow: "Portfólio",
    title: person.displayName,
    subtitle: person.role,
    footer: hero.eyebrow,
  });
}
