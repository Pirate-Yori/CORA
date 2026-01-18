<template>
  <div class="bg-gradient-to-br from-orange-500 to-green-600 rounded-xl shadow-md p-6 text-white">
    <h2 class="text-xl font-bold mb-3 flex items-center gap-2">
      <Award class="w-6 h-6" />
      BAC 2026
    </h2>
    <div class="space-y-2">
      <div class="flex justify-between">
        <span>Jours restants</span>
        <span class="font-bold">156 jours</span>
      </div>
      <div class="flex justify-between">
        <span>Date d'examen</span>
        <span class="font-bold">18 Juin 2026</span>
      </div>
      <div class="mt-4 pt-4 border-t border-white/30">
        <p class="text-sm opacity-90">
          Continue comme ça ! Tu es sur la bonne voie pour réussir ton BAC.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Award } from 'lucide-vue-next';
</script>