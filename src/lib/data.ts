import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");

function readJson<T>(filename: string): T {
  const filePath = path.join(DATA_DIR, filename);
  const content = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(content) as T;
}

export interface Config {
  title: string;
  startDate: string;
  dailyQuote: string;
  music: { title: string; artist: string };
}

export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "love" | "travel" | "anniversary" | "daily";
  photo: string | null;
}

export interface GalleryPhoto {
  id: string;
  date: string;
  title: string;
  description: string;
  src: string;
  year: number;
}

export interface Quote {
  id: string;
  text: string;
  author: string;
  date: string;
}

export interface WishlistItem {
  id: string;
  title: string;
  completed: boolean;
  completedDate: string | null;
}

export interface Letter {
  id: string;
  title: string;
  date: string;
  content: string;
}

export interface FootprintCity {
  id: string;
  name: string;
  date: string;
  x: number;
  y: number;
  color: string;
}

export interface FootprintsData {
  cities: FootprintCity[];
  totalKm: number;
  nextDestination: string;
}

export function getConfig(): Config {
  return readJson<Config>("config.json");
}

export function getTimeline(): TimelineItem[] {
  return readJson<TimelineItem[]>("timeline.json");
}

export function getGallery(): GalleryPhoto[] {
  return readJson<GalleryPhoto[]>("gallery.json");
}

export function getQuotes(): Quote[] {
  return readJson<Quote[]>("quotes.json");
}

export function getWishlist(): WishlistItem[] {
  return readJson<WishlistItem[]>("wishlist.json");
}

export function getLetters(): Letter[] {
  return readJson<Letter[]>("letters.json");
}

export function getFootprints(): FootprintsData {
  return readJson<FootprintsData>("footprints.json");
}
