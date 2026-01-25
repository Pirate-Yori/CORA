<script setup lang="ts">
import type { Matiere } from "@/types";

const props = defineProps<{ matiere: Matiere }>();
</script>

<template>
  <div
    class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
  >
    <div class="flex items-start justify-between mb-4">
      <div
        :class="[
          'w-12 h-12 rounded-xl flex items-center justify-center',
          matiere.colorBg,
        ]"
      >
        <span class="text-2xl">{{ matiere.icon }}</span>
      </div>
      <span
        :class="[
          'px-3 py-1 rounded-full text-xs font-medium',
          matiere.statusColor,
        ]"
      >
        {{ matiere.status }}
      </span>
    </div>

    <h4
      class="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors"
    >
      {{ matiere.nom }}
    </h4>
    <p class="text-sm text-gray-500 mb-4">{{ matiere.professeur }}</p>

    <!-- Barre de progression -->
    <div class="mb-3">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs text-gray-500">Progression</span>
        <span class="text-xs font-semibold text-gray-700"
          >{{ matiere.progression }}%</span
        >
      </div>
      <div class="w-full bg-gray-200 rounded-full h-2">
        <div
          :class="['h-2 rounded-full transition-all', matiere.progressColor]"
          :style="{ width: matiere.progression + '%' }"
        ></div>
      </div>
    </div>

    <div class="flex items-center gap-4 text-xs text-gray-500">
      <span class="flex items-center gap-1">
        <svg
          class="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        {{ matiere.prochainCours }}
      </span>
    </div>
  </div>
</template>
