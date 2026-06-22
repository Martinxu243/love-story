import { getQuotes } from "@/lib/data";
import QuotesClient from "./QuotesClient";

export const dynamic = "force-dynamic";

export default function QuotesPage() {
  return <QuotesClient quotes={getQuotes()} />;
}
