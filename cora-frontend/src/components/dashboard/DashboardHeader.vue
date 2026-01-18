<template>
  <div class="mb-8">
    <div class="flex items-center justify-between mb-4">
      <div>
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Tableau de bord</h1>
        <p class="text-gray-600">
          Terminale - Série {{ selectedSerie }} • Année scolaire 2025-2026
        </p>
      </div>
      <div class="flex gap-2">
        <button
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
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  selectedSerie: {
    type: String,
    required: true,
  },
});

defineEmits(["update:selected-serie"]);
</script>
