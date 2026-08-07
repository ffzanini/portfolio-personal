import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/libs/i18n";

export default function Home() {
  redirect(`/${DEFAULT_LOCALE}`);
}
