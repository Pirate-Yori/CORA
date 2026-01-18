<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <Calendar class="text-orange-500" />
      Prochains Cours
    </h2>
    <div class="space-y-3">
      <CoursItem
        v-for="(cours, index) in cours"
        :key="index"
        :cours="cours"
      />
    </div>
  </div>
</template>

<script setup>
import { Calendar } from 'lucide-vue-next';
import CoursItem from './CoursItem.vue';

defineProps({
  cours: {
    type: Array,
    required: true
  }
});
</script>