import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

app.use(cors());

// Get the current directory path in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Bilder aus JSON laden
const imagesFile = path.join(__dirname, "images.json");
const catImages = JSON.parse(fs.readFileSync(imagesFile, "utf8"));

// Liste mit  Katzen-Sprüchen
const catQuotes = [
  "Ich bin nicht fett, ich bin nur flauschig!",
  "Karton ist besser als jedes teure Bett.",
  "Wenn du mich weckst, wirst du es bereuen.",
  "Ich bin der König der Couch!",
  "Schnurren ist mein Lieblingssport.",
  "Katzen sind wie Kartoffeln, sie rollen sich überall hin.",
  "Nur Katzen verstehen die wahre Bedeutung von Entspannung.",
  "Jeder Tag ist ein guter Tag, um zu faulenzen.",
  "Ich habe die Welt erobert... aus meinem Lieblingssessel.",
  "Ich bin nicht gelangweilt, ich meditiere!",
 "Ich bin nicht fett, ich bin nur flauschig!",
  "Karton ist besser als jedes teure Bett. 😼",
  "Wenn du mich weckst, wirst du es bereuen. 😾",
  "Ich schlafe nicht – ich plane meine Weltherrschaft.",
  "Ich liebe dich... solange du Essen hast.",
  "Ja okay, du darfst mich jetzt anbeten. 😻",
  "Schau mich nicht so an, ich will schlafen nicht modeln.",
  "Meins ist meins, was deins ist… ist auch meins.",
  "Du solltest bald gehen, die nächste Fetisch Party sollte bald starten.",
  "Ich freu mich schon wenn du wieder kommst und mich fütterst", 
  "Lass mich rein. Nein, lass mich raus. Nein, lass mich rein!😾",  
  "Heute ist ein guter Tag zum Dösen!",
  "Ich beobachte dich... immer! 🐱",
  "Fütter mich, Mensch!",
  "Wenn ich schlafe, dann nicht stören! 🐱",
  "Warum ist meine Schüssel halb leer?! 😾",
  "Mein Leben = Schlafen, Fressen, Streicheln, Wiederholen.",
  "Ich bin nicht dick, ich bin flauschig!",
  "Der Mensch denkt, die Katze lenkt, so ist es nunmal!🐱",
  "Karton > Luxus-Kratzbaum. 😻",
  "Ich bin die Königin des Hauses, ... nein der Welt! Muhaha, oh lecker dreamies",
  "Wenn es raschelt, gehört es mir!",
  "Ich liebe dich... solange du mir Futter gibst!",
  "Ich bin der Tiger, der das Sofa beherrscht.",
  "Nur wer Katzen liebt, versteht das Leben wirklich.",
  "Die beste Therapie? Ein Schnurren auf dem Schoß."
];

// Funktion für zufällige Auswahl
const getRandomIndex = (arrayLength) => {
  return Math.floor(Math.random() * arrayLength);
};

app.get("/daily-cat", (req, res) => {
  if (catImages.length === 0) {
    return res.status(500).json({ error: "Keine Bilder gefunden." });
  }

  const randomImageIndex = getRandomIndex(catImages.length);
  const imageUrl = catImages[randomImageIndex];
  const randomQuote = catQuotes[getRandomIndex(catQuotes.length)];

  res.json({ url: imageUrl, quote: randomQuote });
});

app.listen(port, () => {
  console.log(`🚀 Server läuft auf http://localhost:${port}`);
});