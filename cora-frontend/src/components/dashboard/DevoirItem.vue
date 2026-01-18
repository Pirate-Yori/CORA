<template>
  <div class="p-4 bg-gray-50 rounded-lg">
    <div class="flex items-start justify-between mb-2">
      <h3 class="font-semibold text-gray-800 text-sm">{{ devoir.titre }}</h3>
      <CheckCircle v-if="devoir.status === 'completed'" class="w-5 h-5 text-green-500" />
      <AlertCircle v-else class="w-5 h-5 text-orange-500" />
    </div>
    <p class="text-xs text-gray-600 mb-2">{{ devoir.matiere }}</p>
    <span
      :class="[
        'text-xs px-2 py-1 rounded-full',
        devoir.status === 'completed'
          ? 'bg-green-100 text-green-700'
          : 'bg-orange-100 text-orange-700'
      ]"
    >
      {{ devoir.deadline }}
    </span>
  </div>
</template>

<script setup>
import { CheckCircle, AlertCircle } from 'lucide-vue-next';

defineProps({
  devoir: {
    type: Object,
    required: true
  }
});
</script>