<script setup lang="ts">
import type { Matiere } from "@/types";
import MatiereCard from "./MatiereCard.vue";
import { computed } from "vue";
const props = defineProps<{
  matieres: Matiere[];
  titre: string;
  loading: boolean;
}>();

defineEmits(["open-matiere","voir-tout"]);

//computed
const hasMatierers = computed(
  () => props.matieres && props.matieres.length > 0,
);
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-2xl font-bold text-gray-800">{{ titre }}</h3>
    <button
    @click="$emit('voir-tout')"
      class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors cursor-pointer"
    >
      Voir tout
    </button>
  </div>
  <div v-if="loading">
    <div class="animate-pulse space-y-4">
      <div
        class="bg-gray-200 rounded-2xl p-6 shadow-sm border border-gray-100 h-40"
      ></div>
    </div>
  </div>
  <p v-else-if="!hasMatierers" class="text-gray-500">
    Aucune matière disponible.
  </p>
  <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <MatiereCard
      v-for="(matiere,index) in matieres"
      :key="index"
      :matiere="matiere"
      @click="$emit('open-matiere', matiere.id)"
    />
  </div>
</template>
