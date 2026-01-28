<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header de navigation -->
    <header
      class="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Breadcrumb -->
          <nav class="flex items-center gap-2 text-sm">
            <a
              href="#"
              class="text-gray-500 hover:text-blue-600 transition-colors"
              >Tableau de bord</a
            >
            <svg
              class="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <a
              href="#"
              class="text-gray-500 hover:text-blue-600 transition-colors"
              >Matières</a
            >
            <svg
              class="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span class="text-gray-800 font-medium">{{ matiere.nom }}</span>
          </nav>

          <!-- Actions -->
          <div class="flex items-center gap-3">
            <button
              class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
            <button
              class="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <div
      class="bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div
          class="flex flex-col lg:flex-row items-start lg:items-center gap-8"
        >
          <!-- Icône et infos -->
          <div class="flex-1">
            <div class="flex items-center gap-4 mb-6">
              <div
                class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl"
              >
                {{ matiere.icon }}
              </div>
              <div>
                <h1 class="text-4xl font-bold mb-2">{{ matiere.nom }}</h1>
                <p class="text-blue-100 flex items-center gap-2">
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  {{ matiere.professeur }}
                </p>
              </div>
            </div>
            <p class="text-lg text-blue-50 mb-6 max-w-2xl">
              {{ matiere.description }}
            </p>

            <!-- Stats rapides -->
            <div class="flex flex-wrap gap-6">
              <div class="flex items-center gap-2">
                <div
                  class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                    />
                  </svg>
                </div>
                <div>
                  <div class="text-xl font-bold">{{ matiere.totalCours }}</div>
                  <div class="text-xs text-blue-200">Cours</div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div
                  class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="text-xl font-bold">{{ matiere.dureeTotal }}</div>
                  <div class="text-xs text-blue-200">Heures</div>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <div
                  class="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div>
                  <div class="text-xl font-bold">
                    {{ matiere.coursTermines }}/{{ matiere.totalCours }}
                  </div>
                  <div class="text-xs text-blue-200">Complétés</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Progression circulaire -->
          <div class="flex-shrink-0">
            <div class="relative w-40 h-40">
              <svg class="transform -rotate-90 w-40 h-40">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  stroke-width="8"
                  fill="transparent"
                  class="text-white/20"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="currentColor"
                  stroke-width="8"
                  fill="transparent"
                  :stroke-dasharray="circumference"
                  :stroke-dashoffset="
                    circumference - (progression / 100) * circumference
                  "
                  class="text-white transition-all duration-1000"
                  stroke-linecap="round"
                />
              </svg>
              <div
                class="absolute inset-0 flex flex-col items-center justify-center"
              >
                <span class="text-4xl font-bold">{{ progression }}%</span>
                <span class="text-xs text-blue-200">Progression</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="flex flex-col lg:flex-row gap-8">
        <!-- Sidebar - Menu des chapitres -->
        <aside class="lg:w-80 flex-shrink-0">
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-24"
          >
            <h3 class="text-lg font-bold text-gray-800 mb-4">Chapitres</h3>
            <nav class="space-y-2">
              <button
                v-for="chapitre in chapitres"
                :key="chapitre.id"
                @click="chapitreActif = chapitre.id"
                :class="[
                  'w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group',
                  chapitreActif === chapitre.id
                    ? 'bg-blue-50 text-blue-700 font-semibold'
                    : 'text-gray-600 hover:bg-gray-50',
                ]"
              >
                <span class="flex items-center gap-3">
                  <span class="text-lg">{{ chapitre.icon }}</span>
                  <span class="text-sm">{{ chapitre.nom }}</span>
                </span>
                <span
                  class="text-xs px-2 py-1 rounded-full"
                  :class="
                    chapitre.completed === chapitre.total
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  "
                >
                  {{ chapitre.completed }}/{{ chapitre.total }}
                </span>
              </button>
            </nav>
          </div>
        </aside>

        <!-- Liste des cours -->
        <main class="flex-1">
          <!-- Header section -->
          <div class="mb-6">
            <h2 class="text-2xl font-bold text-gray-800 mb-2">
              {{ chapitreSelectionne?.nom }}
            </h2>
            <p class="text-gray-600">{{ chapitreSelectionne?.description }}</p>
          </div>

          <!-- Cours -->
          <div class="space-y-4">
            <div
              v-for="cours in coursFiltered"
              :key="cours.id"
              class="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer overflow-hidden group"
            >
              <div class="flex flex-col sm:flex-row">
                <!-- Thumbnail -->
                <div
                  class="relative sm:w-64 h-48 sm:h-auto bg-gradient-to-br from-blue-500 to-indigo-600 flex-shrink-0"
                >
                  <div
                    class="absolute inset-0 flex items-center justify-center"
                  >
                    <div
                      class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform"
                    >
                      <svg
                        v-if="!cours.completed"
                        class="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <svg
                        v-else
                        class="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                  </div>
                  <!-- Badge statut -->
                  <div class="absolute top-4 left-4">
                    <span
                      v-if="cours.completed"
                      class="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full"
                    >
                      ✓ Terminé
                    </span>
                    <span
                      v-else-if="cours.enCours"
                      class="px-3 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full"
                    >
                      ⏳ En cours
                    </span>
                    <span
                      v-else
                      class="px-3 py-1 bg-gray-500 text-white text-xs font-semibold rounded-full"
                    >
                      🔒 Non commencé
                    </span>
                  </div>
                </div>

                <!-- Contenu -->
                <div class="flex-1 p-6">
                  <div class="flex items-start justify-between mb-3">
                    <div class="flex-1">
                      <h3
                        class="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors"
                      >
                        {{ cours.titre }}
                      </h3>
                      <p class="text-gray-600 text-sm line-clamp-2">
                        {{ cours.description }}
                      </p>
                    </div>
                  </div>

                  <!-- Métadonnées -->
                  <div
                    class="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4"
                  >
                    <span class="flex items-center gap-1">
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {{ cours.duree }}
                    </span>
                    <span class="flex items-center gap-1">
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                        />
                      </svg>
                      {{ cours.exercices }} exercices
                    </span>
                    <span class="flex items-center gap-1">
                      <svg
                        class="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      {{ cours.niveau }}
                    </span>
                  </div>

                  <!-- Barre de progression -->
                  <div v-if="cours.progression > 0" class="mb-4">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-xs text-gray-500">Progression</span>
                      <span class="text-xs font-semibold text-gray-700"
                        >{{ cours.progression }}%</span
                      >
                    </div>
                    <div class="w-full bg-gray-200 rounded-full h-2">
                      <div
                        class="h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all"
                        :style="{ width: cours.progression + '%' }"
                      ></div>
                    </div>
                  </div>

                  <!-- Actions -->
                  <div class="flex items-center gap-3">
                    <button
                      @click="naviguerVersLeçon(cours.chapitreId, cours.id)"
                      class="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                    >
                      <svg
                        v-if="!cours.completed"
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                        />
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <svg
                        v-else
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      {{
                        cours.completed
                          ? "Revoir"
                          : cours.enCours
                            ? "Continuer"
                            : "Commencer"
                      }}
                    </button>
                    <button
                      class="p-2.5 border border-gray-300 hover:border-blue-500 hover:bg-blue-50 rounded-xl transition-colors"
                    >
                      <svg
                        class="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

const matiereId = route.params.matiereId;
const coursId = route.params.coursId;
// Données de la matière
const matiere = ref({
  nom: "Mathématiques",
  icon: "📐",
  professeur: "M. Martin",
  description:
    "Maîtrisez les concepts fondamentaux des mathématiques à travers des leçons interactives, des exercices pratiques et des applications concrètes.",
  totalCours: 24,
  dureeTotal: "18h",
  coursTermines: 8,
});

const progression = computed(() =>
  Math.round((matiere.value.coursTermines / matiere.value.totalCours) * 100),
);

const circumference = 2 * Math.PI * 70;

// Chapitres
const chapitreActif = ref(1);
const chapitres = ref([
  {
    id: 1,
    nom: "Algèbre",
    icon: "🔢",
    total: 8,
    completed: 5,
    description: "Équations, inéquations et expressions algébriques",
  },
  {
    id: 2,
    nom: "Géométrie",
    icon: "📐",
    total: 6,
    completed: 2,
    description: "Figures planes et solides, théorèmes",
  },
  {
    id: 3,
    nom: "Fonctions",
    icon: "📊",
    total: 7,
    completed: 1,
    description: "Fonctions linéaires, affines et polynomiales",
  },
  {
    id: 4,
    nom: "Statistiques",
    icon: "📈",
    total: 3,
    completed: 0,
    description: "Données, graphiques et probabilités",
  },
]);

const chapitreSelectionne = computed(() =>
  chapitres.value.find((c) => c.id === chapitreActif.value),
);

// Cours
const cours = ref([
  {
    id: 1,
    chapitreId: 1,
    titre: "Introduction aux équations du premier degré",
    description:
      "Découvrez les bases des équations linéaires et apprenez à les résoudre pas à pas avec des méthodes simples et efficaces.",
    duree: "45 min",
    exercices: 12,
    niveau: "Débutant",
    completed: true,
    enCours: false,
    progression: 100,
  },
  {
    id: 2,
    chapitreId: 1,
    titre: "Résolution d'équations complexes",
    description:
      "Approfondissez vos connaissances avec des équations plus avancées incluant fractions et parenthèses.",
    duree: "1h 15min",
    exercices: 18,
    niveau: "Intermédiaire",
    completed: false,
    enCours: true,
    progression: 65,
  },
  {
    id: 3,
    chapitreId: 1,
    titre: "Systèmes d'équations",
    description:
      "Maîtrisez la résolution de systèmes d'équations à deux inconnues par substitution et addition.",
    duree: "1h 30min",
    exercices: 15,
    niveau: "Intermédiaire",
    completed: false,
    enCours: false,
    progression: 0,
  },
  {
    id: 4,
    chapitreId: 1,
    titre: "Inéquations et intervalles",
    description:
      "Apprenez à résoudre des inéquations et à représenter les solutions sur une droite graduée.",
    duree: "50 min",
    exercices: 10,
    niveau: "Intermédiaire",
    completed: false,
    enCours: false,
    progression: 0,
  },
  {
    id: 5,
    chapitreId: 2,
    titre: "Théorème de Pythagore",
    description:
      "Découvrez le célèbre théorème et ses applications dans les triangles rectangles.",
    duree: "1h",
    exercices: 14,
    niveau: "Débutant",
    completed: true,
    enCours: false,
    progression: 100,
  },
  {
    id: 6,
    chapitreId: 2,
    titre: "Triangles et trigonométrie",
    description:
      "Introduction aux rapports trigonométriques : sinus, cosinus et tangente.",
    duree: "1h 20min",
    exercices: 16,
    niveau: "Avancé",
    completed: false,
    enCours: false,
    progression: 0,
  },
]);

const coursFiltered = computed(() =>
  cours.value.filter((c) => c.chapitreId === chapitreActif.value),
);
const naviguerVersLeçon = (chapitreId: number, lessonId: number) => {
  console.log(
    "cliqué",
    chapitreId,
    "leçon",
    lessonId,
    "matiereid",
    matiereId,
    "cour",
    coursId,
  );

  router.push({
    name: "Leçon",
    params: {
      matiereId: matiereId,
      coursId: coursId,
      chapitreId: chapitreId,
      lessonId: lessonId,
    },
  });
};
</script>
