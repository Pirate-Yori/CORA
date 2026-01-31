# 📘 Architecture pédagogique – Contrat API Front ↔ Back

## 🎯 Objectif

Clarifier la structure des données **matière → cours → chapitres → ressources** afin de :

- réduire la duplication
- améliorer les performances
- simplifier la consommation côté frontend
- établir un contrat API clair pour le travail en équipe

---

## 🧠 Modèle pédagogique (logique métier)
```
Matière
└── Cours
└── Chapitres
└── Ressources (leçons)
```
---

## 🔴 Réponse API actuelle (problématique)

### Problèmes constatés

- Duplication excessive des données
- Structures récursives (cours → chapitre → cours → matière → classe…)
- Payload très lourd
- Complexité inutile côté frontend

### Exemple (simplifié)

```json
{
  "chapitres": [
    {
      "cours": {
        "matiere": {
          "classes_matieres": [ ... ]
        }
      },
      "ressources": [
        {
          "chapitre": {
            "cours": {
              "matiere": {
                "classes_matieres": [ ... ]
              }
            }
          }
        }
      ]
    }
  ]
}
```

### Conséquences

- Risque de boucles infinies

- Parsing complexe

- Mauvaises performances réseau

- Couplage fort Front ↔ Back

- Difficulté à maintenir et faire évoluer l’API

## 🟢 Réponse API recommandée

```json
{
  "id": 7,
  "numero": 3,
  "titre": "Probabilités",
  "description": "...",
  "objectif_pedagogique": "...",
  "duree_totale": 66,
  "est_verrouille": false,
  "est_publie": true,
  "date_creation": "2026-01-31T05:24:22Z",
  "date_modification": "2026-01-31T05:24:22Z",

  "matiere": {
    "id": 1,
    "nom_matiere": "MATH",
    "icon": "https://...",
    "image": "https://..."
  },

  "classe": {
    "id": 2,
    "niveau": "terminale",
    "serie": "A",
    "annee_scolaire": "2024-2025"
  },

  "chapitres": [
    {
      "id": 19,
      "numero": 1,
      "titre": "Applications",
      "description": "...",

      "ressources": [
        {
          "id": 19,
          "type_ressource": "video",
          "url_video": "https://youtube.com/...",
          "fichier": null,
          "duree": 18
        }
      ]
    }
  ]
}
```

### 📏 Règles de structuration API

***✅ À faire***

- Le cours est la racine de la réponse

- La matière et la classe sont incluses une seule fois

- Les chapitres contiennent uniquement leurs ressources

- Les relations se font par imbrication logique, pas par répétition

***❌ À éviter***

- Répéter cours, matiere, classe dans chaque chapitre

- Répéter chapitre dans chaque ressource

- Structures récursives ou trop profondes

- Données inutiles pour l’affichage frontend
