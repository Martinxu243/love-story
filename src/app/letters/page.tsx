import { getLetters } from "@/lib/data";
import LettersClient from "./LettersClient";

export const dynamic = "force-dynamic";

export default function LettersPage() {
  return <LettersClient letters={getLetters()} />;
}
