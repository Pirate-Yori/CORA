<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header sticky -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div class="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Navigation gauche -->
          <div class="flex items-center gap-4">
            <button @click="toggleSidebar" class="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden">
              <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <nav class="hidden sm:flex items-center gap-2 text-sm">
              <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors">Mathématiques</a>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <a href="#" class="text-gray-500 hover:text-blue-600 transition-colors">Algèbre</a>
              <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span class="text-gray-800 font-medium truncate max-w-[200px]">{{ leconActive.titre }}</span>
            </nav>
          </div>

          <!-- Actions droite -->
          <div class="flex items-center gap-3">
            <button class="hidden sm:flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Aide</span>
            </button>
            <button class="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="flex h-[calc(100vh-64px)]">
      <!-- Sidebar - Plan du cours -->
      <aside 
        :class="[
          'w-80 bg-white border-r border-gray-200 flex-shrink-0 overflow-y-auto transition-transform duration-300',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
          'fixed lg:static inset-y-16 lg:inset-y-0 z-40'
        ]"
      >
        <div class="p-6 border-b border-gray-200">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <span class="text-2xl">📐</span>
            </div>
            <div class="flex-1 min-w-0">
              <h2 class="font-bold text-gray-800 text-base truncate">{{ cours.titre }}</h2>
              <p class="text-xs text-gray-500">{{ cours.chapitres.length }} chapitres</p>
            </div>
          </div>
          
          <!-- Barre de progression globale -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-medium text-gray-600">Progression</span>
              <span class="text-xs font-bold text-gray-800">{{ progressionGlobale }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div 
                class="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500"
                :style="{ width: progressionGlobale + '%' }"
              ></div>
            </div>
          </div>
        </div>

        <!-- Liste des chapitres et leçons -->
        <nav class="p-4">
          <div v-for="chapitre in cours.chapitres" :key="chapitre.id" class="mb-6">
            <button
              @click="toggleChapitre(chapitre.id)"
              class="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
            >
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center text-sm font-semibold text-gray-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                  {{ chapitre.numero }}
                </div>
                <span class="font-semibold text-gray-800 text-sm text-left">{{ chapitre.titre }}</span>
              </div>
              <svg 
                :class="['w-5 h-5 text-gray-400 transition-transform', chapitresOuverts.includes(chapitre.id) ? 'rotate-180' : '']"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Leçons du chapitre -->
            <div 
              v-show="chapitresOuverts.includes(chapitre.id)"
              class="ml-4 mt-2 space-y-1 border-l-2 border-gray-200"
            >
              <button
                v-for="lecon in chapitre.lecons"
                :key="lecon.id"
                @click="changerLecon(lecon)"
                :class="[
                  'w-full flex items-start gap-3 p-3 pl-4 rounded-lg transition-all text-left group relative',
                  leconActive.id === lecon.id 
                    ? 'bg-blue-50 border-l-2 border-blue-600 -ml-[2px]' 
                    : 'hover:bg-gray-50 ml-0'
                ]"
              >
                <!-- Indicateur de statut -->
                <div class="flex-shrink-0 mt-1">
                  <div v-if="lecon.completed" class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div v-else-if="lecon.enCours" class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <div class="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div v-else class="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                </div>

                <div class="flex-1 min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-medium text-gray-500">{{ lecon.type }}</span>
                    <span v-if="lecon.duree" class="text-xs text-gray-400">• {{ lecon.duree }}</span>
                  </div>
                  <h4 :class="[
                    'text-sm font-medium',
                    leconActive.id === lecon.id ? 'text-blue-700' : 'text-gray-700 group-hover:text-gray-900'
                  ]">
                    {{ lecon.titre }}
                  </h4>
                </div>
              </button>
            </div>
          </div>
        </nav>
      </aside>

      <!-- Overlay mobile -->
      <div 
        v-if="sidebarOpen" 
        @click="toggleSidebar"
        class="fixed inset-0 bg-black/50 z-30 lg:hidden"
      ></div>

      <!-- Contenu principal -->
      <main class="flex-1 overflow-y-auto">
        <div class="max-w-4xl mx-auto p-6 lg:p-8">
          <!-- En-tête de la leçon -->
          <div class="mb-8">
            <div class="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                {{ leconActive.type }}
              </span>
              <span>•</span>
              <span>{{ leconActive.duree }}</span>
              <span v-if="leconActive.points">•</span>
              <span v-if="leconActive.points" class="flex items-center gap-1">
                <svg class="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {{ leconActive.points }} points
              </span>
            </div>

            <h1 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {{ leconActive.titre }}
            </h1>
            <p class="text-lg text-gray-600">
              {{ leconActive.description }}
            </p>
          </div>

          <!-- Zone de contenu vidéo/interactive -->
          <div class="bg-white rounded-2xl shadow-lg border border-gray-200 mb-8 overflow-hidden">
            <div class="aspect-video bg-gradient-to-br from-blue-500 to-indigo-600 relative">
              <div class="absolute inset-0 flex items-center justify-center">
                <button class="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                  <svg class="w-10 h-10 text-blue-600 ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </button>
              </div>
              <!-- Contrôles vidéo (simulés) -->
              <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <div class="flex items-center gap-3">
                  <button class="text-white hover:scale-110 transition-transform">
                    <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </button>
                  <div class="flex-1 h-1 bg-white/30 rounded-full">
                    <div class="h-1 bg-white rounded-full w-1/3"></div>
                  </div>
                  <span class="text-white text-sm font-medium">4:32 / 12:45</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Contenu de la leçon -->
          <div class="prose prose-lg max-w-none mb-8">
            <div class="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl mb-8">
              <div class="flex gap-3">
                <svg class="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 class="text-lg font-semibold text-blue-900 mb-2">Points clés à retenir</h3>
                  <ul class="text-blue-800 space-y-1 text-sm">
                    <li>Une équation est une égalité avec une ou plusieurs inconnues</li>
                    <li>Résoudre une équation, c'est trouver la valeur de l'inconnue</li>
                    <li>On peut ajouter, soustraire, multiplier ou diviser les deux membres</li>
                  </ul>
                </div>
              </div>
            </div>

            <h2 class="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
            <p class="text-gray-700 mb-6">
              Les équations du premier degré sont des équations où l'inconnue apparaît à la puissance 1. 
              Elles sont de la forme <code class="bg-gray-100 px-2 py-1 rounded text-blue-600">ax + b = 0</code>, 
              où <code class="bg-gray-100 px-2 py-1 rounded text-blue-600">a</code> et 
              <code class="bg-gray-100 px-2 py-1 rounded text-blue-600">b</code> sont des nombres réels et 
              <code class="bg-gray-100 px-2 py-1 rounded text-blue-600">x</code> est l'inconnue.
            </p>

            <h2 class="text-2xl font-bold text-gray-900 mb-4">Exemple résolu</h2>
            <div class="bg-white border border-gray-200 rounded-xl p-6 mb-6">
              <p class="font-semibold text-gray-800 mb-4">Résoudre : 2x + 5 = 13</p>
              <div class="space-y-3 text-gray-700">
                <div class="flex gap-3">
                  <span class="font-mono font-semibold text-blue-600">1.</span>
                  <div>
                    <p>On soustrait 5 des deux côtés :</p>
                    <p class="font-mono bg-gray-50 p-2 rounded mt-1">2x + 5 - 5 = 13 - 5</p>
                    <p class="font-mono bg-gray-50 p-2 rounded mt-1">2x = 8</p>
                  </div>
                </div>
                <div class="flex gap-3">
                  <span class="font-mono font-semibold text-blue-600">2.</span>
                  <div>
                    <p>On divise par 2 :</p>
                    <p class="font-mono bg-gray-50 p-2 rounded mt-1">2x ÷ 2 = 8 ÷ 2</p>
                    <p class="font-mono bg-gray-50 p-2 rounded mt-1">x = 4</p>
                  </div>
                </div>
              </div>
              <div class="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <p class="text-green-800 font-semibold">✓ Solution : x = 4</p>
              </div>
            </div>
          </div>

          <!-- Section exercices pratiques -->
          <div class="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-8 border border-purple-200 mb-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
                <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 class="text-2xl font-bold text-gray-900">Exercices pratiques</h3>
                <p class="text-gray-600">Testez vos connaissances avec 8 exercices</p>
              </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                v-for="exercice in exercicesPratiques" 
                :key="exercice.id"
                class="bg-white rounded-xl p-4 border border-purple-200 hover:shadow-md transition-all cursor-pointer group"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-semibold text-gray-700">Exercice {{ exercice.numero }}</span>
                  <span v-if="exercice.completed" class="text-green-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </span>
                </div>
                <p class="text-sm text-gray-600 mb-3">{{ exercice.question }}</p>
                <div class="flex items-center justify-between">
                  <span class="text-xs text-gray-500">{{ exercice.points }} points</span>
                  <button class="text-purple-600 text-sm font-medium group-hover:text-purple-700">
                    {{ exercice.completed ? 'Revoir' : 'Commencer' }} →
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Navigation entre leçons -->
          <div class="flex items-center justify-between border-t border-gray-200 pt-8">
            <button 
              v-if="leconPrecedente"
              class="flex items-center gap-2 px-6 py-3 bg-white border border-gray-300 hover:border-gray-400 rounded-xl transition-colors text-gray-700 font-medium"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Leçon précédente
            </button>
            <div v-else></div>

            <button 
              class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all font-semibold"
            >
              {{ leconActive.completed ? 'Leçon suivante' : 'Marquer comme terminé' }}
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const sidebarOpen = ref(false);
const chapitresOuverts = ref([1, 2]); // Chapitres ouverts par défaut

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

const toggleChapitre = (id: number) => {
  const index = chapitresOuverts.value.indexOf(id);
  if (index > -1) {
    chapitresOuverts.value.splice(index, 1);
  } else {
    chapitresOuverts.value.push(id);
  }
};

// Structure du cours
const cours = ref({
  titre: 'Équations du premier degré',
  chapitres: [
    {
      id: 1,
      numero: 1,
      titre: 'Introduction aux équations',
      lecons: [
        {
          id: 1,
          titre: 'Qu\'est-ce qu\'une équation ?',
          type: 'Vidéo',
          duree: '12 min',
          description: 'Découvrez les bases des équations et leur importance en mathématiques.',
          completed: true,
          enCours: false,
          points: 100
        },
        {
          id: 2,
          titre: 'Vocabulaire et notation',
          type: 'Article',
          duree: '8 min',
          description: 'Apprenez le vocabulaire essentiel pour travailler avec les équations.',
          completed: true,
          enCours: false,
          points: 50
        },
        {
          id: 3,
          titre: 'Quiz : Vocabulaire',
          type: 'Quiz',
          duree: '5 min',
          description: 'Testez vos connaissances sur le vocabulaire des équations.',
          completed: false,
          enCours: true,
          points: 150
        }
      ]
    },
    {
      id: 2,
      numero: 2,
      titre: 'Résolution d\'équations simples',
      lecons: [
        {
          id: 4,
          titre: 'Méthode de résolution pas à pas',
          type: 'Vidéo',
          duree: '15 min',
          description: 'Maîtrisez la méthode systématique pour résoudre des équations.',
          completed: false,
          enCours: false,
          points: 100
        },
        {
          id: 5,
          titre: 'Exemples résolus',
          type: 'Article',
          duree: '10 min',
          description: 'Étudiez des exemples détaillés de résolution d\'équations.',
          completed: false,
          enCours: false,
          points: 50
        },
        {
          id: 6,
          titre: 'Exercices pratiques',
          type: 'Exercice',
          duree: '20 min',
          description: 'Pratiquez avec une série d\'exercices progressifs.',
          completed: false,
          enCours: false,
          points: 200
        }
      ]
    },
    {
      id: 3,
      numero: 3,
      titre: 'Équations avec fractions',
      lecons: [
        {
          id: 7,
          titre: 'Introduction aux fractions',
          type: 'Vidéo',
          duree: '18 min',
          description: 'Apprenez à résoudre des équations contenant des fractions.',
          completed: false,
          enCours: false,
          points: 100
        },
        {
          id: 8,
          titre: 'Simplification des équations',
          type: 'Article',
          duree: '12 min',
          description: 'Techniques pour simplifier les équations complexes.',
          completed: false,
          enCours: false,
          points: 50
        }
      ]
    }
  ]
});

const leconActive = ref(cours.value.chapitres[0].lecons[2]);
const leconPrecedente = ref(true);

const changerLecon = (lecon: any) => {
  leconActive.value = lecon;
  sidebarOpen.value = false; // Fermer sidebar sur mobile
};

const progressionGlobale = computed(() => {
  const totalLecons = cours.value.chapitres.reduce((acc, chap) => acc + chap.lecons.length, 0);
  const leconsCompleted = cours.value.chapitres.reduce(
    (acc, chap) => acc + chap.lecons.filter(l => l.completed).length, 
    0
  );
  return Math.round((leconsCompleted / totalLecons) * 100);
});

const exercicesPratiques = ref([
  { id: 1, numero: 1, question: 'Résoudre : x + 5 = 12', points: 10, completed: false },
  { id: 2, numero: 2, question: 'Résoudre : 2x = 18', points: 10, completed: false },
  { id: 3, numero: 3, question: 'Résoudre : 3x - 7 = 11', points: 15, completed: false },
  { id: 4, numero: 4, question: 'Résoudre : 5x + 3 = 23', points: 15, completed: false },
  { id: 5, numero: 5, question: 'Résoudre : -2x + 8 = 0', points: 20, completed: false },
  { id: 6, numero: 6, question: 'Résoudre : 4(x - 2) = 16', points: 20, completed: false },
  { id: 7, numero: 7, question: 'Résoudre : 6x - 9 = 3x + 3', points: 25, completed: false },
  { id: 8, numero: 8, question: 'Résoudre : 2(3x + 1) = 5x - 4', points: 30, completed: false }
]);
</script>

<style scoped>
.prose {
  @apply text-gray-700;
}

.prose code {
  @apply bg-gray-100 px-2 py-1 rounded text-sm;
}
</style>