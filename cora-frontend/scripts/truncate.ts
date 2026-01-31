import Database from "better-sqlite3";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.resolve(__dirname, '../../src/db.sqlite3');
const db = new Database(dbPath, { verbose: console.log });
db.pragma("foreign_keys = OFF");

const tables = [
  "tentative_quiz",
  "quiz",
  "progression_eleve",
  "ressource",
  "chapitre",
  "cours",
  "matiere_classes_matieres",
  "matiere",
  "classe",
];

tables.forEach((table) => {
  db.prepare(`DELETE FROM ${table}`).run();
});

db.prepare(`DELETE FROM sqlite_sequence`).run();
db.pragma("foreign_keys = ON");

console.log("🧹 Base vidée avec succès");
