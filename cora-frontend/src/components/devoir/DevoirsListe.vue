<script setup lang="ts">
import type { Devoir } from "@/types";
import { computed } from "vue";
import DevoirCard from "./DevoirCard.vue";

const props = defineProps<{
  devoirs: Devoir[];
  titre: string;
  loading: boolean;
}>();

const hasDevoires = computed(() => props.devoirs && props.devoirs.length > 0);
defineEmits(["open-devoir"]);
</script>
<template>
  <div class="flex items-center justify-between mb-6">
    <h3 class="text-2xl font-bold text-gray-800">{{ titre }}</h3>
    <button
      class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
    >
      Voir tout
    </button>
  </div>
  <div v-if="loading">
    <span class=""></span>
  </div>
  <div v-else-if="!hasDevoires">
    <p>Aucun devoir disponible pour l'instant</p>
  </div>
  <div v-else class="gap-6">
    <DevoirCard
      v-for="(item, index) in devoirs"
      :devoir="item"
      :key="index"
    />
  </div>
</template>
