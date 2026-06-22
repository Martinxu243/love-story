import { getFootprints } from "@/lib/data";
import MapClient from "./MapClient";

export const dynamic = "force-dynamic";

export default function MapPage() {
  return <MapClient footprints={getFootprints()} />;
}
