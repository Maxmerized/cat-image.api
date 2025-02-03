import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";

const app = express();
const port = 3000;

app.use(cors());
app.use(express.static("public")); // Bereitstellung statischer Dateien aus "public"

// Verzeichnis mit den Katzenbildern
const imagesDir = path.join(process.cwd(), "public/cats");

// Lade die Liste der Bilder aus dem Verzeichnis
const getCatImages = () => {
  try {
    return fs.readdirSync(imagesDir).map(file => `/cats/${file}`);
  } catch (error) {
    console.error("Fehler beim Laden der Bilder:", error);
    return [];
  }
};

const catImages = getCatImages();

// Liste mit zufälligen Sprüchen
const catQuotes = [
  "Heute ist ein guter Tag zum Dösen!",
  "Ich beobachte dich... immer! 🐱",
  "Fütter mich, Mensch!",
  "Wenn ich schlafe, dann nicht stören!",
  "Warum ist meine Schüssel halb leer?! 😾",
  "Mein Leben = Schlafen, Fressen, Streicheln, Wiederholen.",
  "Ich bin nicht dick, ich bin flauschig!",
  "Der Mensch denkt, die Katze lenkt.",
  "Karton > Luxus-Kratzbaum.",
  "Ich bin die Königin des Hauses, akzeptiere es!",
  "Wenn es raschelt, gehört es mir!",
  "Ich liebe dich... solange du mir Futter gibst!"
];

app.get("/daily-cat", (req, res) => {
  if (catImages.length === 0) {
    return res.status(500).json({ error: "Keine Bilder gefunden." });
  }
  
  const randomIndex = Math.floor(Math.random() * catImages.length);
  const randomQuote = catQuotes[Math.floor(Math.random() * catQuotes.length)];
  
  res.json({ url: catImages[randomIndex], quote: randomQuote });
});

app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
