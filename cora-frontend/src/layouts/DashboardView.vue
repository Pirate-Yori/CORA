<!-- <script lang="ts" setup>
import { BookOpen,Award,Clock,TrendingUp } from 'lucide-vue-next';

// Matières selon les séries ivoiriennes
const matieresBySerie = {
  A: [
    {
      name: "Français",
      coef: 5,
      progress: 75,
      nextCours: "Le commentaire composé",
      color: "bg-blue-500",
      moyenne: 14.5,
      chapitres: 12,
      videos: 45,
      exercices: 78,
    },
    {
      name: "Philosophie",
      coef: 4,
      progress: 60,
      nextCours: "La conscience",
      color: "bg-purple-500",
      moyenne: 13.0,
      chapitres: 10,
      videos: 38,
      exercices: 52,
    },
    {
      name: "Histoire-Géo",
      coef: 4,
      progress: 80,
      nextCours: "La Guerre Froide",
      color: "bg-green-500",
      moyenne: 15.5,
      chapitres: 15,
      videos: 60,
      exercices: 90,
    },
    {
      name: "Anglais",
      coef: 3,
      progress: 70,
      nextCours: "Conditional sentences",
      color: "bg-yellow-500",
      moyenne: 14.0,
      chapitres: 8,
      videos: 32,
      exercices: 65,
    },
    {
      name: "Mathématiques",
      coef: 2,
      progress: 55,
      nextCours: "Les suites numériques",
      color: "bg-red-500",
      moyenne: 11.5,
      chapitres: 10,
      videos: 40,
      exercices: 120,
    },
    {
      name: "Espagnol",
      coef: 2,
      progress: 65,
      nextCours: "El subjuntivo",
      color: "bg-orange-500",
      moyenne: 13.5,
      chapitres: 8,
      videos: 30,
      exercices: 55,
    },
  ],
  C: [
    {
      name: "Mathématiques",
      coef: 5,
      progress: 82,
      nextCours: "Intégrales et primitives",
      color: "bg-blue-500",
      moyenne: 15.5,
      chapitres: 14,
      videos: 68,
      exercices: 156,
    },
    {
      name: "Physique-Chimie",
      coef: 5,
      progress: 78,
      nextCours: "Oscillations mécaniques",
      color: "bg-purple-500",
      moyenne: 14.8,
      chapitres: 12,
      videos: 55,
      exercices: 98,
    },
    {
      name: "SVT",
      coef: 4,
      progress: 85,
      nextCours: "Génétique humaine",
      color: "bg-green-500",
      moyenne: 16.0,
      chapitres: 11,
      videos: 48,
      exercices: 82,
    },
    {
      name: "Français",
      coef: 3,
      progress: 70,
      nextCours: "La dissertation",
      color: "bg-yellow-500",
      moyenne: 13.5,
      chapitres: 10,
      videos: 42,
      exercices: 65,
    },
    {
      name: "Philosophie",
      coef: 2,
      progress: 65,
      nextCours: "La raison et le réel",
      color: "bg-red-500",
      moyenne: 12.8,
      chapitres: 9,
      videos: 35,
      exercices: 48,
    },
    {
      name: "Anglais",
      coef: 2,
      progress: 75,
      nextCours: "Essay writing",
      color: "bg-orange-500",
      moyenne: 14.2,
      chapitres: 8,
      videos: 30,
      exercices: 58,
    },
  ],
  D: [
    {
      name: "Mathématiques",
      coef: 4,
      progress: 80,
      nextCours: "Fonctions exponentielles",
      color: "bg-blue-500",
      moyenne: 15.0,
      chapitres: 13,
      videos: 62,
      exercices: 145,
    },
    {
      name: "SVT",
      coef: 5,
      progress: 88,
      nextCours: "Immunologie",
      color: "bg-green-500",
      moyenne: 16.5,
      chapitres: 13,
      videos: 58,
      exercices: 95,
    },
    {
      name: "Physique-Chimie",
      coef: 4,
      progress: 76,
      nextCours: "Cinétique chimique",
      color: "bg-purple-500",
      moyenne: 14.5,
      chapitres: 12,
      videos: 52,
      exercices: 92,
    },
    {
      name: "Français",
      coef: 3,
      progress: 72,
      nextCours: "Le texte argumentatif",
      color: "bg-yellow-500",
      moyenne: 13.8,
      chapitres: 10,
      videos: 40,
      exercices: 62,
    },
    {
      name: "Philosophie",
      coef: 2,
      progress: 68,
      nextCours: "La science et la vérité",
      color: "bg-red-500",
      moyenne: 13.0,
      chapitres: 9,
      videos: 34,
      exercices: 46,
    },
    {
      name: "Anglais",
      coef: 2,
      progress: 74,
      nextCours: "Scientific English",
      color: "bg-orange-500",
      moyenne: 14.0,
      chapitres: 8,
      videos: 28,
      exercices: 54,
    },
  ],
};

const matieres = matieresBySerie[selectedSerie];

// Données détaillées pour une matière
  const getDetailedMatiereData = (matiere) => {
    const chapitresData = {
      'Mathématiques': [
        { num: 1, titre: 'Fonctions numériques', progress: 100, locked: false },
        { num: 2, titre: 'Limites et continuité', progress: 100, locked: false },
        { num: 3, titre: 'Dérivabilité', progress: 100, locked: false },
        { num: 4, titre: 'Étude de fonctions', progress: 90, locked: false },
        { num: 5, titre: 'Fonction exponentielle', progress: 85, locked: false },
        { num: 6, titre: 'Fonction logarithme', progress: 80, locked: false },
        { num: 7, titre: 'Primitives et intégrales', progress: 70, locked: false },
        { num: 8, titre: 'Équations différentielles', progress: 50, locked: false },
        { num: 9, titre: 'Nombres complexes', progress: 30, locked: false },
        { num: 10, titre: 'Géométrie dans l\'espace', progress: 0, locked: true }
      ],
      'Physique-Chimie': [
        { num: 1, titre: 'Mécanique - Cinématique', progress: 100, locked: false },
        { num: 2, titre: 'Dynamique newtonienne', progress: 100, locked: false },
        { num: 3, titre: 'Travail et énergie', progress: 90, locked: false },
        { num: 4, titre: 'Oscillations mécaniques', progress: 75, locked: false },
        { num: 5, titre: 'Ondes mécaniques', progress: 60, locked: false },
        { num: 6, titre: 'Électricité - Circuit RLC', progress: 50, locked: false },
        { num: 7, titre: 'Chimie - Réactions acido-basiques', progress: 80, locked: false },
        { num: 8, titre: 'Cinétique chimique', progress: 40, locked: false }
      ],
      'SVT': [
        { num: 1, titre: 'La cellule et son environnement', progress: 100, locked: false },
        { num: 2, titre: 'Métabolisme cellulaire', progress: 100, locked: false },
        { num: 3, titre: 'Génétique moléculaire', progress: 95, locked: false },
        { num: 4, titre: 'Génétique humaine', progress: 85, locked: false },
        { num: 5, titre: 'Immunologie', progress: 70, locked: false },
        { num: 6, titre: 'Système nerveux', progress: 60, locked: false }
      ]
    };

    const coursVideos = [
      { id: 1, titre: matiere.nextCours, duree: '45:32', vues: 1234, date: '10 Jan 2026', type: 'cours' },
      { id: 2, titre: 'Exercices corrigés', duree: '32:18', vues: 987, date: '08 Jan 2026', type: 'exercice' },
      { id: 3, titre: 'Annales BAC 2024', duree: '58:42', vues: 2145, date: '05 Jan 2026', type: 'annale' },
      { id: 4, titre: 'Méthodologie', duree: '28:15', vues: 856, date: '03 Jan 2026', type: 'methode' }
    ];

    const devoirs = [
      { titre: 'Devoir surveillé n°3', date: '18 Jan', note: '15/20', type: 'DS' },
      { titre: 'Devoir maison n°5', date: '20 Jan', note: '-', type: 'DM' },
      { titre: 'Quiz chapitre 7', date: '12 Jan', note: '17/20', type: 'Quiz' }
    ];

    return {
      chapitres: chapitresData[matiere.name] || chapitresData['Mathématiques'].slice(0, 6),
      videos: coursVideos,
      devoirs: devoirs
    };
  };

  const prochainsCours = [
    { matiere: 'Mathématiques', titre: 'Étude de fonctions', date: '15 Jan', heure: '10:00', type: 'live' },
    { matiere: 'Physique-Chimie', titre: 'TP Ondes sonores', date: '15 Jan', heure: '14:30', type: 'live' },
    { matiere: 'SVT', titre: 'Quiz: Génétique', date: '16 Jan', heure: '09:00', type: 'evaluation' },
    { matiere: 'Français', titre: 'Correction devoir', date: '17 Jan', heure: '15:00', type: 'video' }
  ];

  const devoirs = [
    { matiere: 'Mathématiques', titre: 'Exercices intégrales', deadline: '2 jours', status: 'pending' },
    { matiere: 'Philosophie', titre: 'Dissertation liberté', deadline: '5 jours', status: 'pending' },
    { matiere: 'Anglais', titre: 'Essay technology', deadline: 'Rendu', status: 'completed' }
  ];

  const stats = [
    { label: 'Cours suivis', value: '45/60', icon: BookOpen, color: 'text-blue-500' },
    { label: 'Moyenne générale', value: '14.5/20', icon: Award, color: 'text-green-500' },
    { label: 'Heures de cours', value: '127h', icon: Clock, color: 'text-purple-500' },
    { label: 'Progression', value: '75%', icon: TrendingUp, color: 'text-orange-500' }
  ];

</script> -->
