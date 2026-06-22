import { NextRequest, NextResponse } from "next/server";
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

// GET: read all data or a specific file
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const file = searchParams.get("file");

  try {
    if (file && dataFiles[file]) {
      const content = fs.readFileSync(
        path.join(DATA_DIR, dataFiles[file]),
        "utf-8"
      );
      return NextResponse.json({ [file]: JSON.parse(content) });
    }

    // Return all data
    const allData: Record<string, unknown> = {};
    for (const [key, filename] of Object.entries(dataFiles)) {
      const content = fs.readFileSync(path.join(DATA_DIR, filename), "utf-8");
      allData[key] = JSON.parse(content);
    }
    return NextResponse.json(allData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to read data", detail: String(error) },
      { status: 500 }
    );
  }
}

// POST: update a specific data file
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { file, data } = body;

    if (!file || !dataFiles[file]) {
      return NextResponse.json(
        { error: "Invalid file key. Use: " + Object.keys(dataFiles).join(", ") },
        { status: 400 }
      );
    }

    if (!data) {
      return NextResponse.json({ error: "Missing data field" }, { status: 400 });
    }

    const filePath = path.join(DATA_DIR, dataFiles[file]);

    // Backup existing file
    const backupPath = filePath + ".backup";
    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, backupPath);
    }

    // Write new data with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + "\n", "utf-8");

    return NextResponse.json({
      success: true,
      file: dataFiles[file],
      message: `✓ ${dataFiles[file]} 已更新`,
      backedUp: backupPath,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to write data", detail: String(error) },
      { status: 500 }
    );
  }
}
