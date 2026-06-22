import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "src", "data");

const dataFiles: Record<string, string> = {
  config: "config.json",
  timeline: "timeline.json",
  gallery: "gallery.json",
  quotes: "quotes.json",
  wishlist: "wishlist.json",
  letters: "letters.json",
  footprints: "footprints.json",
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const file = req.query.file as string | undefined;
    try {
      if (file && dataFiles[file]) {
        const content = fs.readFileSync(path.join(DATA_DIR, dataFiles[file]), "utf-8");
        return res.json({ [file]: JSON.parse(content) });
      }
      const allData: Record<string, unknown> = {};
      for (const [key, filename] of Object.entries(dataFiles)) {
        allData[key] = JSON.parse(fs.readFileSync(path.join(DATA_DIR, filename), "utf-8"));
      }
      return res.json(allData);
    } catch (error) {
      return res.status(500).json({ error: "Failed to read data", detail: String(error) });
    }
  }

  if (req.method === "POST") {
    try {
      const { file, data } = req.body;
      if (!file || !dataFiles[file]) {
        return res.status(400).json({ error: "Invalid file key" });
      }
      const filePath = path.join(DATA_DIR, dataFiles[file]);
      if (fs.existsSync(filePath)) {
        fs.copyFileSync(filePath, filePath + ".backup");
      }
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");
      return res.json({ success: true, message: `✓ ${dataFiles[file]} 已更新` });
    } catch (error) {
      return res.status(500).json({ error: "Failed to write data", detail: String(error) });
    }
  }

  res.status(405).json({ error: "Method not allowed" });
}
