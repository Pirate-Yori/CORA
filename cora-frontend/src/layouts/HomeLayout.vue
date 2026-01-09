<script setup lang="ts">
import AppFooter from "@/components/layouts/AppFooter.vue";
import AppHeader from "@/components/layouts/AppHeader.vue";
import AppNavBar from "@/components/layouts/AppNavBar.vue";
import type { User } from "@/types";
import { onMounted } from "vue";

onMounted(() => {
  console.log("MainLayout mounted");
});
const user: User = {
  id: 1,
  nom: "Traore",
  prenom: "Drissa",
  full_name: "Traore Drissa",
  email: "drissa@gmail.com",
  classe:"Tle S",
  created_at: "07/01/2026",
  updated_at: "07/01/2026",
};
</script>
<template class="min-h-screen bg-gray-50">
  <!-- Header -->
  <!-- <AppHeader /> -->
  <AppNavBar :user="user"/>
  <main class="flex transition-all duration-300">
    <div class="p-6">
      <div class="animate-fade-in min-h-screen">
        <RouterView />
      </div>
    </div>
  </main>
  <AppFooter />
</template>
<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
</style>
