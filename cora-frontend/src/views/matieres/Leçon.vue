<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header sticky -->
    <header class="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm flex-1 min-w-0">
            <router-link to="/dashboard" class="text-gray-500 hover:text-blue-600 transition-colors whitespace-nowrap">
              Tableau de bord
            </router-link>
            <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <router-link :to="`/matieres/${matiereId}`" class="text-gray-500 hover:text-blue-600 transition-colors whitespace-nowrap">
              {{ matiere.nom }}
            </router-link>
            <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <router-link :to="`/matieres/${matiereId}/cours/${coursId}`" class="text-gray-500 hover:text-blue-600 transition-colors whitespace-nowrap truncate max-w-[150px]">
              {{ cours.nom }}
            </router-link>
            <svg class="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
            <span class="text-gray-800 font-medium truncate">{{ lecon.titre }}</span>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-2 ml-4">
            <button class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Notes">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </button>
            <button class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Signets">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar Navigation (Desktop) -->
      <aside class="hidden lg:block w-80 bg-white border-r border-gray-200 h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto">
        <div class="p-6">
          <h3 class="text-lg font-bold text-gray-800 mb-4">Plan du cours</h3>
          
          <div class="space-y-2">
            <div
              v-for="(chapitre, chapIndex) in chapitres"
              :key="chapitre.id"
              class="rounded-xl overflow-hidden"
            >
              <!-- Chapitre header -->
              <button
                @click="toggleChapitre(chapitre.id)"
                class="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 transition-colors text-left"
              >
                <div class="flex items-center gap-3 flex-1">
                  <span class="text-xs font-bold text-gray-500">{{ chapIndex + 1 }}</span>
                  <span class="font-semibold text-sm text-gray-800">{{ chapitre.nom }}</span>
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
              <div v-if="chapitresOuverts.includes(chapitre.id)" class="py-2">
                <button
                  v-for="(lesson, lessonIndex) in chapitre.lecons"
                  :key="lesson.id"
                  @click="naviguerVersLecon(lesson.id)"
                  :class="[
                    'w-full flex items-center gap-3 px-6 py-3 text-left transition-colors',
                    lesson.id === leconId
                      ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                      : 'hover:bg-gray-50 text-gray-600 border-l-4 border-transparent'
                  ]"
                >
                  <!-- Icône de statut -->
                  <div class="flex-shrink-0">
                    <svg v-if="lesson.completed" class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div v-else-if="lesson.id === leconId" class="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                      <div class="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <div v-else class="w-5 h-5 border-2 border-gray-300 rounded-full"></div>
                  </div>

                  <!-- Titre -->
                  <span class="flex-1 text-sm font-medium">{{ lesson.titre }}</span>

                  <!-- Durée -->
                  <span class="text-xs text-gray-400">{{ lesson.duree }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      <!-- Contenu principal -->
      <main class="flex-1">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <!-- En-tête de la leçon -->
          <div class="mb-8">
            <div class="flex items-center gap-3 text-sm text-gray-500 mb-4">
              <span class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                Leçon {{ lecon.numero }}
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {{ lecon.duree }}
              </span>
              <span class="flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                {{ lecon.difficulte }}
              </span>
            </div>

            <h1 class="text-4xl font-bold text-gray-800 mb-4">{{ lecon.titre }}</h1>
            <p class="text-xl text-gray-600">{{ lecon.description }}</p>
          </div>

          <!-- Vidéo (si disponible) -->
          <div v-if="lecon.video" class="mb-8">
            <div class="bg-gray-900 rounded-2xl overflow-hidden shadow-xl aspect-video flex items-center justify-center">
              <button class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all group">
                <svg class="w-10 h-10 text-white ml-1 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </button>
            </div>
          </div>

          <!-- Contenu de la leçon -->
          <div class="prose prose-lg max-w-none">
            <!-- Section Objectifs -->
            <div class="bg-blue-50 rounded-2xl p-6 mb-8">
              <h2 class="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Objectifs de la leçon
              </h2>
              <ul class="space-y-2">
                <li v-for="(objectif, index) in lecon.objectifs" :key="index" class="flex items-start gap-3">
                  <svg class="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span class="text-gray-700">{{ objectif }}</span>
                </li>
              </ul>
            </div>

            <!-- Contenu principal -->
            <div class="space-y-8" v-html="lecon.contenu"></div>

            <!-- Points clés -->
            <div class="bg-yellow-50 border-l-4 border-yellow-500 rounded-xl p-6 my-8">
              <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg class="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Points clés à retenir
              </h3>
              <ul class="space-y-2">
                <li v-for="(point, index) in lecon.pointsCles" :key="index" class="flex items-start gap-3">
                  <span class="text-yellow-600 font-bold flex-shrink-0">•</span>
                  <span class="text-gray-700">{{ point }}</span>
                </li>
              </ul>
            </div>

            <!-- Exemple pratique -->
            <div v-if="lecon.exemple" class="bg-green-50 rounded-2xl p-6 my-8">
              <h3 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Exemple pratique
              </h3>
              <div class="text-gray-700" v-html="lecon.exemple"></div>
            </div>
          </div>

          <!-- Quiz de compréhension -->
          <div v-if="lecon.quiz" class="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div class="flex items-center justify-between mb-6">
              <h2 class="text-2xl font-bold text-gray-800">Quiz de compréhension</h2>
              <span class="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold">
                {{ lecon.quiz.length }} questions
              </span>
            </div>

            <div class="space-y-6">
              <div
                v-for="(question, index) in lecon.quiz"
                :key="index"
                class="p-6 bg-gray-50 rounded-xl"
              >
                <div class="font-semibold text-gray-800 mb-4">
                  {{ index + 1 }}. {{ question.question }}
                </div>
                <div class="space-y-2">
                  <button
                    v-for="(option, optIndex) in question.options"
                    :key="optIndex"
                    @click="selectionnerReponse(index, optIndex)"
                    :class="[
                      'w-full text-left px-4 py-3 rounded-lg transition-all border-2',
                      reponses[index] === optIndex
                        ? question.correcte === optIndex
                          ? 'bg-green-50 border-green-500 text-green-700'
                          : 'bg-red-50 border-red-500 text-red-700'
                        : 'bg-white border-gray-200 hover:border-blue-500 text-gray-700'
                    ]"
                  >
                    {{ option }}
                  </button>
                </div>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-between">
              <div v-if="quizTermine" class="flex items-center gap-2">
                <span class="text-lg font-semibold text-gray-800">
                  Score: {{ scoreQuiz }}/{{ lecon.quiz.length }}
                </span>
                <span v-if="scoreQuiz === lecon.quiz.length" class="text-green-600">🎉 Parfait !</span>
                <span v-else-if="scoreQuiz >= lecon.quiz.length / 2" class="text-orange-600">👍 Bien !</span>
                <span v-else class="text-red-600">💪 Continue !</span>
              </div>
              <button
                v-if="!quizTermine"
                @click="validerQuiz"
                class="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all"
              >
                Valider mes réponses
              </button>
            </div>
          </div>

          <!-- Navigation entre leçons -->
          <div class="mt-12 flex items-center justify-between gap-4">
            <button
              v-if="leconPrecedente"
              @click="naviguerVersLecon(leconPrecedente.id)"
              class="flex items-center gap-2 px-6 py-3 bg-white border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 font-semibold rounded-xl transition-all"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
              Leçon précédente
            </button>
            <div v-else></div>

            <button
              v-if="!lecon.completed"
              @click="marquerCommeTermine"
              class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Marquer comme terminé
            </button>

            <button
              v-if="leconSuivante"
              @click="naviguerVersLecon(leconSuivante.id)"
              class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Leçon suivante
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div v-else></div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

// Params de la route
const matiereId = ref(route.params.matiereId);
const coursId = ref(route.params.coursId);
const chapitreId = ref(route.params.chapitreId);
const leconId = ref(Number(route.params.leconId));

// Données (à remplacer par des appels API)
const matiere = ref({ nom: 'Mathématiques' });
const cours = ref({ nom: 'Algèbre et équations' });

const chapitresOuverts = ref([1, 2]); // Chapitres ouverts par défaut

const chapitres = ref([
  {
    id: 1,
    nom: 'Introduction à l\'algèbre',
    lecons: [
      { id: 1, titre: 'Les bases de l\'algèbre', duree: '15 min', completed: true },
      { id: 2, titre: 'Variables et expressions', duree: '20 min', completed: true },
      { id: 3, titre: 'Équations simples', duree: '25 min', completed: false }
    ]
  },
  {
    id: 2,
    nom: 'Équations du premier degré',
    lecons: [
      { id: 4, titre: 'Résolution d\'équations', duree: '30 min', completed: false },
      { id: 5, titre: 'Problèmes pratiques', duree: '35 min', completed: false }
    ]
  }
]);

// Leçon actuelle
const lecon = ref({
  numero: 1,
  titre: 'Les bases de l\'algèbre',
  description: 'Découvrez les concepts fondamentaux de l\'algèbre et apprenez à manipuler les expressions algébriques.',
  duree: '15 min',
  difficulte: 'Débutant',
  video: true,
  completed: false,
  objectifs: [
    'Comprendre ce qu\'est une variable',
    'Identifier les différents types d\'expressions algébriques',
    'Apprendre à simplifier des expressions simples',
    'Reconnaître les termes et les coefficients'
  ],
  contenu: `
    <h2>Qu'est-ce que l'algèbre ?</h2>
    <p>L'algèbre est une branche des mathématiques qui utilise des lettres et des symboles pour représenter des nombres et des quantités dans des formules et des équations.</p>
    
    <h2>Les variables</h2>
    <p>Une variable est un symbole (généralement une lettre) qui représente un nombre inconnu ou qui peut varier. Par exemple, dans l'expression <strong>x + 5</strong>, x est une variable.</p>
    
    <h2>Les expressions algébriques</h2>
    <p>Une expression algébrique est une combinaison de variables, de nombres et d'opérations mathématiques. Par exemple :</p>
    <ul>
      <li>3x + 2</li>
      <li>2y - 5</li>
      <li>4a + 3b - 7</li>
    </ul>
  `,
  pointsCles: [
    'Une variable représente un nombre inconnu ou variable',
    'Les coefficients sont les nombres devant les variables',
    'On peut additionner et soustraire les termes semblables',
    'L\'ordre des opérations est important en algèbre'
  ],
  exemple: `
    <p><strong>Exemple :</strong> Simplifions l'expression 2x + 3x + 5</p>
    <p>Étape 1 : Identifier les termes semblables (2x et 3x)</p>
    <p>Étape 2 : Additionner les coefficients (2 + 3 = 5)</p>
    <p>Étape 3 : Résultat final : <strong>5x + 5</strong></p>
  `,
  quiz: [
    {
      question: 'Qu\'est-ce qu\'une variable en algèbre ?',
      options: [
        'Un nombre fixe',
        'Une lettre qui représente un nombre inconnu',
        'Une opération mathématique',
        'Un résultat final'
      ],
      correcte: 1
    },
    {
      question: 'Dans l\'expression 5x + 3, quel est le coefficient de x ?',
      options: ['3', '5', '8', 'x'],
      correcte: 1
    },
    {
      question: 'Que vaut 4a + 2a ?',
      options: ['6a', '8a', '6a²', '2a'],
      correcte: 0
    }
  ]
});

// Quiz
const reponses = ref<{ [key: number]: number }>({});
const quizTermine = ref(false);
const scoreQuiz = computed(() => {
  let score = 0;
  lecon.value.quiz.forEach((q, index) => {
    if (reponses.value[index] === q.correcte) {
      score++;
    }
  });
  return score;
});

// Fonctions
const toggleChapitre = (chapitreId: number) => {
  const index = chapitresOuverts.value.indexOf(chapitreId);
  if (index > -1) {
    chapitresOuverts.value.splice(index, 1);
  } else {
    chapitresOuverts.value.push(chapitreId);
  }
};

const naviguerVersLecon = (nouvelleLeconId: number) => {
  leconId.value = nouvelleLeconId;
  // En réalité, vous feriez un router.push ici
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const selectionnerReponse = (questionIndex: number, optionIndex: number) => {
  if (!quizTermine.value) {
    reponses.value[questionIndex] = optionIndex;
  }
};

const validerQuiz = () => {
  quizTermine.value = true;
};

const marquerCommeTermine = () => {
  lecon.value.completed = true;
  // Enregistrer dans l'API
};

// Navigation
const toutesLesLecons = computed(() => {
  return chapitres.value.flatMap(c => c.lecons);
});

const leconIndex = computed(() => 
  toutesLesLecons.value.findIndex(l => l.id === leconId.value)
);

const leconPrecedente = computed(() => 
  leconIndex.value > 0 ? toutesLesLecons.value[leconIndex.value - 1] : null
);

const leconSuivante = computed(() => 
  leconIndex.value < toutesLesLecons.value.length - 1 ? toutesLesLecons.value[leconIndex.value + 1] : null
);
</script>

<style scoped>
.prose {
  color: #374151;
}

.prose h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #1f2937;
}

.prose p {
  margin-bottom: 1rem;
  line-height: 1.75;
}

.prose ul {
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.prose li {
  margin-bottom: 0.5rem;
}

.prose strong {
  font-weight: 600;
  color: #1f2937;
}
</style>