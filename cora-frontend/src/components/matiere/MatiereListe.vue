<script setup lang="ts">
import MatiereCard from './MatiereCard.vue';
defineProps({
    matieres: {
        type: Array,
        required:true
    }
})
</script>

<template>
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-2xl font-bold text-gray-800">Mes matières</h3>
    <button
      class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
    >
      Voir tout
    </button>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <MatiereCard v-for="matiere in matieres" :key="matiere?.id" :matiere="matiere" />
  </div>
</template>
