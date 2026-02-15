<script setup lang="ts">
import { useMatiereStore } from "@/stores/matiere.store";
import type { Matiere } from "@/types";
import { BookText } from "lucide-vue-next";
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const matiereStore = useMatiereStore();
const matieres = computed(() => matiereStore.matieres);

onMounted(async () => {
  try {
    // Charger les matières depuis le store ou une API
    matiereStore.fetchMatieres();
  } catch (error) {
    console.error("erreur ", error);
  }
});

// États
const searchQuery = ref("");
const filtreStatut = ref("tous");
const viewMode = ref<"grid" | "list">("grid");

// Stats
const stats = ref({
  total: 8,
  enCours: 6,
  terminees: 2,
  progressionMoyenne: 68,
});


// Matières filtrées
const matieresFiltered = computed(() => {
  let filtered = matieres.value;
  
  // Filtre par recherche
  if (searchQuery.value) {
    filtered = filtered.filter(
      (m:Matiere) =>
        m.nom_matiere.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  // Filtre par statut
  if (filtreStatut.value !== "tous") {
    filtered = filtered.filter((m:Matiere) => m.status === filtreStatut.value);
  }

  return filtered;
});

// Navigation
const naviguerVersMatiere =  (matiereId: number) => {
  try{

    console.log("matier",matiereId)
     router.push({
      name: "DetailMatiere",
      params: { matiereId },
    });
  }catch(error){
    console.error("erreur",error)
  }
};
</script>

<template>
  <div v-if="isLoading"class="min-h-screen h-full w-full flex justify-center items-center">
    <AppSpiner size="xl" text="chargement des données ..." />
  </div>
  <div v-else-if="error" class="min-h-screen h-full w-full flex justify-center items-center">
    <AppAlert variant="danger">{{ error }}</AppAlert>
  </div>
  <div v-else class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div
          class="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <!-- Titre et description -->
          <div>
            <h1 class="text-3xl font-bold text-gray-800 mb-2">Mes matières</h1>
            <p class="text-gray-600">
              Explorez vos cours et suivez votre progression
            </p>
          </div>

          <!-- Filtres et recherche -->
          <div class="flex flex-col sm:flex-row gap-3">
            <div class="relative">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="Rechercher une matière..."
                class="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              <svg
                class="absolute left-3 top-3 w-5 h-5 text-gray-400"
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
            </div>

            <select
              v-model="filtreStatut"
              class="px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white cursor-pointer transition-all"
            >
              <option value="tous">Toutes les matières</option>
              <option value="en-cours">En cours</option>
              <option value="termine">Terminées</option>
              <option value="non-commence">Non commencées</option>
            </select>
          </div>
        </div>

        <!-- Stats rapides -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div class="bg-blue-50 rounded-xl p-4">
            <div class="text-2xl font-bold text-blue-600 mb-1">
              {{ stats.total }}
            </div>
            <div class="text-sm text-blue-700">Total matières</div>
          </div>
          <div class="bg-green-50 rounded-xl p-4">
            <div class="text-2xl font-bold text-green-600 mb-1">
              {{ stats.enCours }}
            </div>
            <div class="text-sm text-green-700">En cours</div>
          </div>
          <div class="bg-purple-50 rounded-xl p-4">
            <div class="text-2xl font-bold text-purple-600 mb-1">
              {{ stats.terminees }}
            </div>
            <div class="text-sm text-purple-700">Terminées</div>
          </div>
          <div class="bg-orange-50 rounded-xl p-4">
            <div class="text-2xl font-bold text-orange-600 mb-1">
              {{ stats.progressionMoyenne }}%
            </div>
            <div class="text-sm text-orange-700">Progression</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Contenu principal -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Tabs -->
      <div class="mb-8">
        <div class="border-b border-gray-200">
          <nav class="flex gap-8">
            <button
              @click="viewMode = 'grid'"
              :class="[
                'pb-4 px-2 border-b-2 font-semibold text-sm transition-colors flex items-center gap-2',
                viewMode === 'grid'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700',
              ]"
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
              Vue grille
            </button>
            <button
              @click="viewMode = 'list'"
              :class="[
                'pb-4 px-2 border-b-2 font-semibold text-sm transition-colors flex items-center gap-2',
                viewMode === 'list'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700',
              ]"
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
                  d="M4 6h16M4 10h16M4 14h16M4 18h16"
                />
              </svg>
              Vue liste
            </button>
          </nav>
        </div>
      </div>

      <!-- Vue Grille -->
      <div
        v-if="viewMode === 'grid'"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="matiere in matieresFiltered"
          :key="matiere.id"
          @click="naviguerVersMatiere(matiere.id)"
          class="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
        >
          <!-- Header coloré -->
          <div :class="['relative h-32', matiere.colorBg]">
            <div class="absolute inset-0 opacity-10">
              <div
                class="absolute inset-0"
                style="
                  background-image: radial-gradient(
                    circle at 2px 2px,
                    white 1px,
                    transparent 0
                  );
                  background-size: 30px 30px;
                "
              >
                                    
            </div>
            </div>

            <!-- Badge statut -->
            <div class="absolute top-4 right-4">
              <span
                :class="[
                  'px-3 py-1 rounded-full text-xs font-semibold',
                  matiere.statusColorBadge,
                ]"
              >
                {{ matiere.statusLabel }}
              </span>
            </div>

            <!-- Icône -->
            <div class="absolute inset-0 flex items-center justify-center">
              <div v-if="matiere.icon"
                class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform"
              >
              <img :src="matiere.icon" alt="Icône de la matière" class="w-full h-full object-contain"/>
              </div>
              <div v-else
                class="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform"
              >
                <BookText class="w-10 h-10 text-white"/>
              </div>
              
            </div>
          </div>

          <!-- Contenu -->
          <div class="p-6">
            <h3
              class="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors"
            >
              {{ matiere.nom_matiere }}
            </h3>
            <!-- <p class="text-sm text-gray-600 mb-4 flex items-center gap-2">
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              {{ matiere.professeur }}
            </p> -->

            <!-- Stats -->
            <div class="grid grid-cols-3 gap-3 mb-4">
              <div class="text-center">
                <div class="text-lg font-bold text-gray-800">
                  {{ matiere.nb_cours }}
                </div>
                <div class="text-xs text-gray-500">Cours</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-bold text-gray-800">
                  {{ matiere.dureeTotal }}
                </div>
                <div class="text-xs text-gray-500">Heures</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-bold text-gray-800">
                  {{ matiere.exercices }}
                </div>
                <div class="text-xs text-gray-500">Exercices</div>
              </div>
            </div>

            <!-- Barre de progression -->
            <div>
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-gray-500">Progression</span>
                <span class="text-xs font-semibold text-gray-700"
                  >{{ matiere.progression }}%</span
                >
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  :class="[
                    'h-2 rounded-full transition-all',
                    `bg-${matiere.progressColor}-500`,
                  ]"
                  :style="{ width: matiere.progression + '%' }"
                ></div>
              </div>
            </div>

            <!-- Prochain cours -->
            <div
              v-if="matiere.prochainCours"
              class="mt-4 pt-4 border-t border-gray-100"
            >
              <div class="flex items-center gap-2 text-sm text-gray-600">
                <svg
                  class="w-4 h-4 text-blue-500"
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
                <span class="text-xs"
                  >Prochain cours :
                  <span class="font-medium">{{
                    matiere.prochainCours
                  }}</span></span
                >
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Vue Liste -->
      <div v-else class="space-y-4">
        <div
          v-for="matiere in matieresFiltered"
          :key="matiere.id"
          @click="naviguerVersMatiere(matiere.id)"
          class="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all cursor-pointer"
        >
          <div
            class="flex flex-col sm:flex-row items-start sm:items-center gap-6 p-6"
          >
            <!-- Icône et info -->
            <div class="flex items-center gap-4 flex-1">
              <div
                :class="[
                  'w-16 h-16 rounded-2xl flex items-center justify-center text-3xl',
                  matiere.colorBg,
                ]"
              >
                <img v-if="matiere.icon" :src="matiere.icon" alt="Icône de la matière" class="w-full h-full object-contain"/>
                <BookText v-else class="w-10 h-10 text-white"/>
              </div>

              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-3 mb-2">
                  <h3
                    class="text-xl font-bold text-gray-800 hover:text-blue-600 transition-colors"
                  >
                    {{ matiere.nom_matiere }}
                  </h3>
                  <span
                    :class="[
                      'px-3 py-1 rounded-full text-xs font-semibold',
                      matiere.statusColorBadge,
                    ]"
                  >
                    {{ matiere.statusLabel }}
                  </span>
                </div>
               
              </div>
            </div>

            <!-- Stats -->
            <div class="flex gap-6">
              <div class="text-center">
                <div class="text-lg font-bold text-gray-800">
                  {{ matiere.nb_cours }}
                </div>
                <div class="text-xs text-gray-500">Cours</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-bold text-gray-800">
                  {{ matiere.dureeTotal }}
                </div>
                <div class="text-xs text-gray-500">Heures</div>
              </div>
              <div class="text-center">
                <div class="text-lg font-bold text-gray-800">
                  {{ matiere.exercices }}
                </div>
                <div class="text-xs text-gray-500">Exercices</div>
              </div>
            </div>

            <!-- Progression -->
            <div class="w-full sm:w-48">
              <div class="flex items-center justify-between mb-2">
                <span class="text-xs text-gray-500">Progression</span>
                <span class="text-sm font-semibold text-gray-700"
                  >{{ matiere.progression }}%</span
                >
              </div>
              <div class="w-full bg-gray-200 rounded-full h-2">
                <div
                  :class="[
                    'h-2 rounded-full transition-all',
                    matiere.progressColor,
                  ]"
                  :style="{ width: matiere.progression + '%' }"
                ></div>
              </div>
            </div>

            <!-- Flèche -->
            <div>
              <svg
                class="w-6 h-6 text-gray-400 group-hover:text-blue-600 transition-colors"
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
            </div>
          </div>
        </div>
      </div>

      <!-- Message si aucun résultat -->
      <div v-if="matieresFiltered.length === 0" class="text-center py-16">
        <div
          class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <svg
            class="w-10 h-10 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-gray-800 mb-2">
          Aucune matière trouvée
        </h3>
        <p class="text-gray-600">
          Essayez de modifier vos critères de recherche
        </p>
      </div>
    </div>
  </div>
</template>


