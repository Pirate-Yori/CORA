<script setup lang="ts">
import type { Cours } from "@/types";
import { computed } from "vue";
import CourCard from "./CourCard.vue";
import { Calendar } from "lucide-vue-next";

const props = defineProps<{
  cours: Cours[];
  titre: string;
  loading: boolean;
}>();
const hasCours = computed(() => props.cours && props.cours.length > 0);
</script>
<template>
  <div class="bg-white rounded-xl shadow-md p-6">
    <h2 class="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
      <Calendar class="text-orange-500" />
      {{titre}}
    </h2>
    <div v-if="loading">
        <span></span>
    </div>
    <div v-else-if="!hasCours">
        <p>Aucun cours pour l'instant</p>
    </div>
    <div class="space-y-3" v-else>
      <CourCard v-for="(item, index) in cours" :key="index" :cours="item" />
    </div>
  </div>
</template>
