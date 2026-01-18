<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <BookOpen class="text-orange-500" />
      Mes Matières
    </h2>
    <div class="space-y-4">
      <MatiereItem
        v-for="(matiere, index) in matieres"
        :key="index"
        :matiere="matiere"
        @click="$emit('open-matiere', matiere)"
      />
    </div>
  </div>
</template>

<script setup>
import { BookOpen } from "lucide-vue-next";
import MatiereItem from "./MatiereItem.vue";

defineProps({
  matieres: {
    type: Array,
    required: true,
  },
});

defineEmits(["open-matiere"]);
</script>
