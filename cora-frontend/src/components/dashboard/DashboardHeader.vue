<template>
  <div class="mb-8">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Tableau de bord</h1>
        <p v-if="classe?.niveau === 'terminal'" class="text-gray-600">
          Terminale - Série {{ classe.niveau }} • Année scolaire
          {{ classe.annee_scolaire }}
        </p>
        <p v-else class="text-gray-600">
          classe de {{ classe.niveau }} • Année scolaire
          {{ classe.annee_scolaire }}
        </p>
      </div>
      <div class="flex gap-2">
        <!-- <button
          v-for="serie in ['A', 'C', 'D']"
          :key="serie"
          @click="$emit('update:selected-serie', serie)"
          :class="[
            'px-6 py-3 rounded-lg font-semibold transition-all',
            selectedSerie === serie
              ? 'bg-orange-500 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100',
          ]"
        > 
          Série {{ serie }}
        </button> -->
        <button
          v-if="classe?.niveau === 'terminal'"
          class="px-6 py-3 rounded-lg font-semibold transition-all bg-orange-500 text-white shadow-lg"
        >
          Série {{ classe.serie }}
        </button>
        <button
          v-else
          class="px-6 py-3 rounded-lg font-semibold transition-all bg-orange-500 text-white shadow-lg"
        >
          {{ classe?.serie }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Classe } from "@/types/models/User";

defineProps<{
  classe: Classe;
}>();
</script>
