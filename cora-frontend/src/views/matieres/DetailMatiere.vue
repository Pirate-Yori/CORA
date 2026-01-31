<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header de navigation -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm">
            <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors">Tableau de bord</a>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors">Mes matières</a>
            <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-800 font-medium">{{ matiere.nom }}</span>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <button class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
            <button class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <div class="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 overflow-hidden">
      <!-- Pattern de fond -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, white 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>
      
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <!-- Infos principales -->
          <div class="text-white">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center text-6xl shadow-xl">
                {{ matiere.icon }}
              </div>
              <div>
                <h1 class="text-5xl font-bold mb-2">{{ matiere.nom }}</h1>
                <p class="text-blue-100 text-lg flex items-center gap-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {{ matiere.professeur }}
                </p>
              </div>
            </div>
            
            <p class="text-xl text-blue-50 mb-8 leading-relaxed max-w-xl">
              {{ matiere.description }}
            </p>

            <!-- Tags -->
            <div class="flex flex-wrap gap-2 mb-8">
              <span 
                v-for="tag in matiere.tags" 
                :key="tag"
                class="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Bouton principal -->
            <button class="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-3">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Commencer l'apprentissage
            </button>
          </div>

          <!-- Stats card -->
          <div class="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h3 class="text-white text-xl font-bold mb-6">Aperçu du cours</h3>
            
            <div class="grid grid-cols-2 gap-6 mb-8">
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div class="text-white/70 text-sm mb-1">Total cours</div>
                <div class="text-white text-3xl font-bold">{{ matiere.totalCours }}</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div class="text-white/70 text-sm mb-1">Durée totale</div>
                <div class="text-white text-3xl font-bold">{{ matiere.dureeTotal }}</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div class="text-white/70 text-sm mb-1">Exercices</div>
                <div class="text-white text-3xl font-bold">{{ matiere.totalExercices }}</div>
              </div>
              <div class="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div class="text-white/70 text-sm mb-1">Niveau</div>
                <div class="text-white text-2xl font-bold">{{ matiere.niveau }}</div>
              </div>
            </div>

            <!-- Progression -->
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-white font-semibold">Votre progression</span>
                <span class="text-white text-2xl font-bold">{{ progression }}%</span>
              </div>
              <div class="w-full bg-white/20 rounded-full h-3">
                <div 
                  class="h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-1000 shadow-lg"
                  :style="{ width: progression + '%' }"
                ></div>
              </div>
              <p class="text-white/70 text-sm mt-2">
                {{ matiere.coursTermines }} cours sur {{ matiere.totalCours }} complétés
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Tabs -->
      <div class="mb-8">
        <div class="border-b border-gray-200">
          <nav class="flex gap-8">
            <button
              @click="tabActif = 'cours'"
              :class="[
                'pb-4 px-2 border-b-2 font-semibold text-sm transition-colors',
                tabActif === 'cours'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              📚 Liste des cours
            </button>
            <button
              @click="tabActif = 'description'"
              :class="[
                'pb-4 px-2 border-b-2 font-semibold text-sm transition-colors',
                tabActif === 'description'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              📖 Description
            </button>
            <button
              @click="tabActif = 'objectifs'"
              :class="[
                'pb-4 px-2 border-b-2 font-semibold text-sm transition-colors',
                tabActif === 'objectifs'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              🎯 Objectifs
            </button>
            <button
              @click="tabActif = 'prerequis'"
              :class="[
                'pb-4 px-2 border-b-2 font-semibold text-sm transition-colors',
                tabActif === 'prerequis'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              ]"
            >
              ✅ Prérequis
            </button>
          </nav>
        </div>
      </div>

      <!-- Contenu des tabs -->
      <div v-if="tabActif === 'cours'">
        <div class="mb-8">
          <h2 class="text-3xl font-bold text-gray-800 mb-3">Parcours d'apprentissage</h2>
          <p class="text-gray-600">Cliquez sur un cours pour accéder à ses chapitres et leçons</p>
        </div>

        <!-- Liste des cours -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div
            v-for="(cours, index) in coursList"
            :key="cours.id"
            @click="naviguerVersCours(cours.id)"
            class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
          >
            <!-- Header avec numéro -->
            <div class="relative h-48 bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <div class="absolute top-4 left-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-xl border-2 border-white/30">
                {{ index + 1 }}
              </div>
              
              <!-- Badge de statut -->
              <div class="absolute top-4 right-4">
                <span v-if="cours.completed" class="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-full shadow-lg">
                  ✓ Terminé
                </span>
                <span v-else-if="cours.enCours" class="px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-full shadow-lg">
                  ⏳ En cours
                </span>
                <span v-else-if="cours.verrouille" class="px-4 py-2 bg-gray-500 text-white text-sm font-semibold rounded-full shadow-lg">
                  🔒 Verrouillé
                </span>
                <span v-else class="px-4 py-2 bg-blue-500 text-white text-sm font-semibold rounded-full shadow-lg">
                  ⭐ Disponible
                </span>
              </div>

              <!-- Icône centrale -->
              <div class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
                {{ cours.icon }}
              </div>
            </div>

            <!-- Contenu -->
            <div class="p-6">
              <h3 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                {{ cours.titre }}
              </h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">
                {{ cours.description }}
              </p>

              <!-- Métadonnées -->
              <div class="grid grid-cols-2 gap-4 mb-4">
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  {{ cours.chapitres }} chapitres
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ cours.duree }}
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  {{ cours.exercices }} exercices
                </div>
                <div class="flex items-center gap-2 text-sm text-gray-500">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  {{ cours.niveau }}
                </div>
              </div>

              <!-- Barre de progression -->
              <div v-if="cours.progression > 0" class="mb-4">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs text-gray-500">Progression</span>
                  <span class="text-xs font-semibold text-gray-700">{{ cours.progression }}%</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    class="h-2 rounded-full transition-all"
                    :class="cours.completed ? 'bg-green-500' : 'bg-blue-500'"
                    :style="{ width: cours.progression + '%' }"
                  ></div>
                </div>
              </div>

              <!-- Bouton action -->
              <button
                :disabled="cours.verrouille"
                :class="[
                  'w-full py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2',
                  cours.verrouille
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-sm hover:shadow-md'
                ]"
              >
                <svg v-if="cours.verrouille" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <svg v-else-if="cours.completed" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
                {{ cours.verrouille ? 'Terminer les cours précédents' : cours.completed ? 'Revoir le cours' : cours.enCours ? 'Continuer' : 'Accéder au cours' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Description -->
      <div v-else-if="tabActif === 'description'" class="max-w-4xl">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">À propos de ce cours</h2>
          <div class="prose prose-lg text-gray-600 leading-relaxed space-y-4">
            <p>{{ matiere.descriptionComplete }}</p>
            <p>Ce cours complet vous permettra de maîtriser tous les concepts fondamentaux et avancés de la matière. Chaque leçon est conçue pour être interactive et engageante, avec des exemples concrets et des exercices pratiques.</p>
            <p>Vous apprendrez à votre rythme, avec un suivi personnalisé de votre progression et des feedbacks détaillés sur vos performances.</p>
          </div>
        </div>
      </div>

      <!-- Tab Objectifs -->
      <div v-else-if="tabActif === 'objectifs'" class="max-w-4xl">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Objectifs d'apprentissage</h2>
          <div class="space-y-4">
            <div 
              v-for="(objectif, index) in matiere.objectifs" 
              :key="index"
              class="flex items-start gap-4 p-4 bg-blue-50 rounded-xl"
            >
              <div class="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                {{ index + 1 }}
              </div>
              <p class="text-gray-700 flex-1">{{ objectif }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Tab Prérequis -->
      <div v-else-if="tabActif === 'prerequis'" class="max-w-4xl">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 class="text-2xl font-bold text-gray-800 mb-6">Prérequis</h2>
          <div class="space-y-4">
            <div 
              v-for="(prerequis, index) in matiere.prerequis" 
              :key="index"
              class="flex items-start gap-4 p-4 bg-gray-50 rounded-xl"
            >
              <svg class="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-gray-700 flex-1">{{ prerequis }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMatiereStore } from '@/stores/matiere.store';
import { ref, computed,onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const tabActif = ref('cours');
const matiereStore = useMatiereStore();
// const matiere = matiereStore.matieres
const coursList = computed(()=>matiereStore.coursList)
const route = useRoute()

const matiereId = route.params.matiereId

onMounted(async()=>{
  try{
    matiereStore.fecthMatierCours(matiereId)
  } catch (error) {
    console.error('Erreur lors de la récupération des matières :', error);
  }
})
// Données de la matière
const matiere = ref({
  nom: 'Mathématiques',
  icon: '📐',
  professeur: 'M. Martin',
  description: 'Maîtrisez les concepts fondamentaux des mathématiques à travers des cours structurés, des exercices pratiques et des applications concrètes.',
  descriptionComplete: 'Ce cours de mathématiques complet vous guidera à travers tous les concepts essentiels du programme. Des bases de l\'algèbre aux fonctions avancées, en passant par la géométrie et les statistiques, vous développerez une compréhension solide et durable de la matière.',
  tags: ['Algèbre', 'Géométrie', 'Fonctions', 'Statistiques'],
  totalCours: 4,
  dureeTotal: '24h',
  totalExercices: 156,
  niveau: '3ème',
  coursTermines: 1,
  objectifs: [
    'Maîtriser les équations et inéquations du premier et second degré',
    'Comprendre et appliquer les théorèmes de géométrie plane',
    'Analyser et représenter différents types de fonctions',
    'Interpréter des données statistiques et calculer des probabilités',
    'Développer un raisonnement mathématique rigoureux'
  ],
  prerequis: [
    'Connaissances de base en arithmétique',
    'Compréhension des fractions et des nombres décimaux',
    'Bases de la géométrie plane (périmètre, aire)',
    'Motivation et régularité dans le travail'
  ]
});

const progression = computed(() => 
  Math.round((matiere.value.coursTermines / matiere.value.totalCours) * 100)
);
const router = useRouter()

// Liste des cours
// const coursList = ref([
//   {
//     id: 1,
//     titre: 'Algèbre et équations',
//     description: 'Découvrez les fondamentaux de l\'algèbre : équations, inéquations, systèmes et expressions algébriques. Développez votre capacité à résoudre des problèmes complexes.',
//     icon: '🔢',
//     chapitres: 8,
//     duree: '6h 30min',
//     exercices: 42,
//     niveau: 'Débutant',
//     completed: true,
//     enCours: false,
//     verrouille: false,
//     progression: 100
//   },
//   {
//     id: 2,
//     titre: 'Géométrie plane et dans l\'espace',
//     description: 'Explorez les figures géométriques, les théorèmes fondamentaux (Pythagore, Thalès) et les transformations. Apprenez à calculer aires, volumes et angles.',
//     icon: '📐',
//     chapitres: 6,
//     duree: '5h 45min',
//     exercices: 38,
//     niveau: 'Intermédiaire',
//     completed: false,
//     enCours: true,
//     verrouille: false,
//     progression: 45
//   },
//   {
//     id: 3,
//     titre: 'Fonctions et graphiques',
//     description: 'Maîtrisez les fonctions linéaires, affines et du second degré. Apprenez à les représenter graphiquement et à analyser leurs propriétés.',
//     icon: '📊',
//     chapitres: 7,
//     duree: '7h 15min',
//     exercices: 45,
//     niveau: 'Intermédiaire',
//     completed: false,
//     enCours: false,
//     verrouille: false,
//     progression: 0
//   },
//   {
//     id: 4,
//     titre: 'Statistiques et probabilités',
//     description: 'Apprenez à collecter, organiser et interpréter des données. Découvrez les concepts de base des probabilités et leurs applications pratiques.',
//     icon: '📈',
//     chapitres: 5,
//     duree: '4h 30min',
//     exercices: 31,
//     niveau: 'Débutant',
//     completed: false,
//     enCours: false,
//     verrouille: true,
//     progression: 0
//   }
// ]);

const naviguerVersCours = (coursId: number) => {
  const cours = coursList.value.find(c => c.id === coursId);
  if (cours && !cours.verrouille) {
    console.log('Navigation vers le cours:', coursId);
    // Ici, vous pouvez utiliser le router pour naviguer
    router.push({ name: 'CoursChapitres', params: { coursId } })
  }
};
</script>