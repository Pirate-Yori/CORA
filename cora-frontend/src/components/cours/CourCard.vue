<template>
  <div class="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
    <div
      :class="[
        'w-12 h-12 rounded-lg flex items-center justify-center',
        cours.type === 'live' ? 'bg-red-100' :
        cours.type === 'evaluation' ? 'bg-yellow-100' : 'bg-blue-100'
      ]"
    >
      <Video v-if="cours.type === 'live'" class="text-red-600" />
      <FileText v-else-if="cours.type === 'evaluation'" class="text-yellow-600" />
      <Video v-else class="text-blue-600" />
    </div>
    <div class="flex-1">
      <h3 class="font-semibold text-gray-800">{{ cours.titre }}</h3>
      <p class="text-sm text-gray-600">{{ cours.matiere }}</p>
    </div>
    <div class="text-right">
      <p class="text-sm font-semibold text-gray-800">{{ cours.date }}</p>
      <p class="text-sm text-gray-600">{{ cours.heure }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Video, FileText } from 'lucide-vue-next';

defineProps({
  cours: {
    type: Object,
    required: true
  }
});
</script>