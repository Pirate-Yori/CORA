<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
      <FileText class="text-orange-500" />
      Devoirs à rendre
    </h2>
    <div class="space-y-3">
      <DevoirItem
        v-for="(devoir, index) in devoirs"
        :key="index"
        :devoir="devoir"
      />
    </div>
  </div>
</template>

<script setup>
import { FileText } from 'lucide-vue-next';
import DevoirItem from './DevoirItem.vue';

defineProps({
  devoirs: {
    type: Array,
    required: true
  }
});
</script>