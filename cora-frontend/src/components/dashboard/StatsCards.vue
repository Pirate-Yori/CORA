<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
    >
      <div class="flex items-center justify-between">
        <div>
          <p class="text-gray-600 text-sm mb-1">{{ stat.label }}</p>
          <p class="text-3xl font-bold text-gray-800">{{ stat.value }}</p>
        </div>
        <component :is="stat.icon" :class="`w-12 h-12 ${stat.color}`" />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  stats: {
    type: Array,
    required: true
  }
});
</script>