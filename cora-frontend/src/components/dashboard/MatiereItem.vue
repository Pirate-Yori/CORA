<template>
  <div
    class="border-b border-gray-100 last:border-0 pb-4 last:pb-0 cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors"
  >
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center gap-3">
        <div :class="`w-3 h-3 rounded-full ${matiere.color}`"></div>
        <h3 class="font-semibold text-gray-800">{{ matiere.name }}</h3>
        <span
          class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full"
        >
          Coef. {{ matiere.coef }}
        </span>
      </div>
      <span class="text-sm text-gray-600">{{ matiere.progress }}%</span>
    </div>
    <div class="mb-2">
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          :class="`${matiere.color} h-2 rounded-full transition-all`"
          :style="{ width: `${matiere.progress}%` }"
        ></div>
      </div>
    </div>
    <p class="text-sm text-gray-500">Prochain cours: {{ matiere.nextCours }}</p>
  </div>
</template>

<script setup>
defineProps({
  matiere: {
    type: Object,
    required: true,
  },
});
</script>
