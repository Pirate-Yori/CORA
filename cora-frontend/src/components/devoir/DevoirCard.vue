<script setup lang="ts">
import type { Devoir } from "@/types";

const props = defineProps<{ devoir: Devoir }>();
</script>

<template>
  <div
    class=" mb-2 bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100"
  >
    <div class="p-6  hover:bg-gray-50 transition-colors cursor-pointer">
      <div class="flex items-start gap-4">
        <div
          :class="[
            'w-12 h-12 rounded-xl flex items-center justify-center shrink-0',
            devoir.colorBg,
          ]"
        >
          <span class="text-xl">{{ devoir.icon }}</span>
        </div>

        <div class="flex-1 min-w-0">
          <div class="flex items-start justify-between mb-2">
            <div>
              <h4 class="text-base font-semibold text-gray-800 mb-1">
                {{ devoir.titre }}
              </h4>
              <p class="text-sm text-gray-500">
                {{ devoir.matiere }}
              </p>
            </div>
            <span
              :class="[
                'px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap',
                devoir.priorityColor,
              ]"
            >
              {{ devoir.priorite }}
            </span>
          </div>

          <div class="flex items-center gap-4 text-sm text-gray-500 mt-3">
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {{ devoir.dateRemise }}
            </span>
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
              {{ devoir.tempsEstime }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
