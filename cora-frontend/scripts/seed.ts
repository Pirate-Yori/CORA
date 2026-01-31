import Database from "better-sqlite3";
import { faker } from "@faker-js/faker";
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

faker.locale = "fr";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbPath = path.resolve(__dirname, '../../src/db.sqlite3');
const db = new Database(dbPath, { verbose: console.log });
db.pragma("foreign_keys = ON");

/* ==============================
  UTILS
============================== */
const now = new Date().toISOString();

const insert = (q: string, p: any[]) =>
    db.prepare(q).run(p).lastInsertRowid as number;

const randomColor = () =>
    faker.helpers.arrayElement([
        "blue", "green", "red", "yellow", "purple", "indigo"
    ]);

/* ==============================
  CLASSES
============================== */
const classes = [
    { niveau: "troisieme", serie: "general" },
    { niveau: "terminale", serie: "A" },
    { niveau: "terminale", serie: "C" },
    { niveau: "terminale", serie: "D" },
];

const classeIds: Record<string, number> = {};

for (const c of classes) {
    const id = insert(
        `INSERT  INTO classe (niveau, serie, nb_eleves, annee_scolaire)
     VALUES (?, ?, ?, ?)`,
        [
            c.niveau,
            c.serie,
            faker.number.int({ min: 25, max: 60 }),
            "2024-2025",
        ]
    );
    classeIds[`${c.niveau}_${c.serie}`] = id;
}

/* ==============================
  MATIERES (COMPLETES)
============================== */
const matieres = [
    "MATH", "PHYS", "FR", "HIST", "SVT", "PHILO", "ANG"
];

const matiereIds: Record<string, number> = {};

for (const nom of matieres) {
    const color = randomColor();

    const id = insert(
        `INSERT  INTO matiere
     (nom_matiere, icon, image, statusColor, status, colorBg,
      progression, progressColor, prochainCours)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            nom,
            `matiere_icon/${nom}.png`,
            `matiere_img/${nom}.jpg`,
            color,
            "active",
            `bg-${color}-500`,
            faker.number.float({ min: 0, max: 30 }),
            color,
            faker.lorem.words(3),
        ]
    );

    matiereIds[nom] = id;

    // Liaison avec toutes les classes
    Object.values(classeIds).forEach((classeId) => {
        db.prepare(
            `INSERT  INTO matiere_classes_matieres (matiere_id, classe_id)
       VALUES (?, ?)`
        ).run(id, classeId);
    });
}

/* ==============================
  PROGRAMMES PEDAGOGIQUES
============================== */
const programme = {
    MATH: [
        "Algèbre",
        "Analyse",
        "Probabilités",
        "Géométrie",
    ],
    PHYS: [
        "Mécanique",
        "Électricité",
        "Optique",
        "Chimie générale",
    ],
    FR: [
        "Grammaire",
        "Expression écrite",
        "Analyse de texte",
        "Méthodologie",
    ],
    HIST: [
        "Histoire de la Côte d'Ivoire",
        "Histoire africaine",
        "Géographie économique",
    ],
    SVT: [
        "Génétique",
        "Écologie",
        "Anatomie humaine",
    ],
    PHILO: [
        "La conscience",
        "La liberté",
        "L'État",
        "La justice",
    ],
    ANG: [
        "Grammar",
        "Comprehension",
        "Essay writing",
    ],
};

/* ==============================
  COURS + CHAPITRES + RESSOURCES
============================== */
Object.entries(programme).forEach(([matiereCode, coursList]) => {
    Object.entries(classeIds).forEach(([classeKey, classeId]) => {
        coursList.forEach((coursTitre, index) => {
            const coursId = insert(
                `INSERT  INTO cours
         (numero, titre, description, objectif_pedagogique,
          duree_totale, est_verrouille, est_publie,
          matiere_id, classe_id,date_creation, date_modification)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)`,
                [
                    index + 1,
                    coursTitre,
                    faker.lorem.paragraph(),
                    faker.lorem.sentences(2),
                    faker.number.int({ min: 60, max: 180 }),
                    0,
                    1,
                    matiereIds[matiereCode],
                    classeId,
                    now,
                    now
                ]
            );

            // Chapitres
            faker.helpers.arrayElements(
                [
                    "Introduction",
                    "Notions clés",
                    "Applications",
                    "Exercices corrigés",
                ],
                3
            ).forEach((chapitreTitre, i) => {
                const chapitreId = insert(
                    `INSERT  INTO chapitre
           (titre, description, numero, cours_id,date_creation,date_modification)
           VALUES (?, ?, ?, ?,?,?)`,
                    [
                        chapitreTitre,
                        faker.lorem.sentences(2),
                        i + 1,
                        coursId,now,now
                    ]
                );

                // Ressource
                insert(
                    `INSERT INTO ressource (type_ressource, url_video, fichier, duree,created_at, updated_at, chapitre_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [
                        "video",
                        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                        null,
                        faker.number.int({ min: 5, max: 20 }),
                        now,
                        now,
                        chapitreId,
                    ]
                );

            });
        });
    });
});

console.log("🇨🇮 Seed ivoirien COMPLET exécuté avec succès !");
