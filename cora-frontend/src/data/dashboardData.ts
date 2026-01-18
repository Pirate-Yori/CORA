import {
    BookOpen,
    Award,
    Clock,
    TrendingUp
} from 'lucide-vue-next';

export const matieresBySerie = {
    'A': [
        { name: 'Français', coef: 5, progress: 75, nextCours: 'Le commentaire composé', color: 'bg-blue-500', moyenne: 14.5, chapitres: 12, videos: 45, exercices: 78 },
        { name: 'Philosophie', coef: 4, progress: 60, nextCours: 'La conscience', color: 'bg-purple-500', moyenne: 13.0, chapitres: 10, videos: 38, exercices: 52 },
        { name: 'Histoire-Géo', coef: 4, progress: 80, nextCours: 'La Guerre Froide', color: 'bg-green-500', moyenne: 15.5, chapitres: 15, videos: 60, exercices: 90 },
        { name: 'Anglais', coef: 3, progress: 70, nextCours: 'Conditional sentences', color: 'bg-yellow-500', moyenne: 14.0, chapitres: 8, videos: 32, exercices: 65 },
        { name: 'Mathématiques', coef: 2, progress: 55, nextCours: 'Les suites numériques', color: 'bg-red-500', moyenne: 11.5, chapitres: 10, videos: 40, exercices: 120 },
        { name: 'Espagnol', coef: 2, progress: 65, nextCours: 'El subjuntivo', color: 'bg-orange-500', moyenne: 13.5, chapitres: 8, videos: 30, exercices: 55 }
    ],
    'C': [
        { name: 'Mathématiques', coef: 5, progress: 82, nextCours: 'Intégrales et primitives', color: 'bg-blue-500', moyenne: 15.5, chapitres: 14, videos: 68, exercices: 156 },
        { name: 'Physique-Chimie', coef: 5, progress: 78, nextCours: 'Oscillations mécaniques', color: 'bg-purple-500', moyenne: 14.8, chapitres: 12, videos: 55, exercices: 98 },
        { name: 'SVT', coef: 4, progress: 85, nextCours: 'Génétique humaine', color: 'bg-green-500', moyenne: 16.0, chapitres: 11, videos: 48, exercices: 82 },
        { name: 'Français', coef: 3, progress: 70, nextCours: 'La dissertation', color: 'bg-yellow-500', moyenne: 13.5, chapitres: 10, videos: 42, exercices: 65 },
        { name: 'Philosophie', coef: 2, progress: 65, nextCours: 'La raison et le réel', color: 'bg-red-500', moyenne: 12.8, chapitres: 9, videos: 35, exercices: 48 },
        { name: 'Anglais', coef: 2, progress: 75, nextCours: 'Essay writing', color: 'bg-orange-500', moyenne: 14.2, chapitres: 8, videos: 30, exercices: 58 }
    ],
    'D': [
        { name: 'Mathématiques', coef: 4, progress: 80, nextCours: 'Fonctions exponentielles', color: 'bg-blue-500', moyenne: 15.0, chapitres: 13, videos: 62, exercices: 145 },
        { name: 'SVT', coef: 5, progress: 88, nextCours: 'Immunologie', color: 'bg-green-500', moyenne: 16.5, chapitres: 13, videos: 58, exercices: 95 },
        { name: 'Physique-Chimie', coef: 4, progress: 76, nextCours: 'Cinétique chimique', color: 'bg-purple-500', moyenne: 14.5, chapitres: 12, videos: 52, exercices: 92 },
        { name: 'Français', coef: 3, progress: 72, nextCours: 'Le texte argumentatif', color: 'bg-yellow-500', moyenne: 13.8, chapitres: 10, videos: 40, exercices: 62 },
        { name: 'Philosophie', coef: 2, progress: 68, nextCours: 'La science et la vérité', color: 'bg-red-500', moyenne: 13.0, chapitres: 9, videos: 34, exercices: 46 },
        { name: 'Anglais', coef: 2, progress: 74, nextCours: 'Scientific English', color: 'bg-orange-500', moyenne: 14.0, chapitres: 8, videos: 28, exercices: 54 }
    ]
};

export const stats = [
    { label: 'Cours suivis', value: '45/60', icon: BookOpen, color: 'text-blue-500' },
    { label: 'Moyenne générale', value: '14.5/20', icon: Award, color: 'text-green-500' },
    { label: 'Heures de cours', value: '127h', icon: Clock, color: 'text-purple-500' },
    { label: 'Progression', value: '75%', icon: TrendingUp, color: 'text-orange-500' }
];

export const prochainsCours = [
    { matiere: 'Mathématiques', titre: 'Étude de fonctions', date: '15 Jan', heure: '10:00', type: 'live' },
    { matiere: 'Physique-Chimie', titre: 'TP Ondes sonores', date: '15 Jan', heure: '14:30', type: 'live' },
    { matiere: 'SVT', titre: 'Quiz: Génétique', date: '16 Jan', heure: '09:00', type: 'evaluation' },
    { matiere: 'Français', titre: 'Correction devoir', date: '17 Jan', heure: '15:00', type: 'video' }
];

export const devoirs = [
    { matiere: 'Mathématiques', titre: 'Exercices intégrales', deadline: '2 jours', status: 'pending' },
    { matiere: 'Philosophie', titre: 'Dissertation liberté', deadline: '5 jours', status: 'pending' },
    { matiere: 'Anglais', titre: 'Essay technology', deadline: 'Rendu', status: 'completed' }
];