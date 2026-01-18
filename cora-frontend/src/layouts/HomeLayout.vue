<script setup lang="ts">
import AppFooter from "@/components/layouts/AppFooter.vue";
import AppHeader from "@/components/layouts/AppHeader.vue";
import AppNavBar from "@/components/layouts/AppNavBar.vue";
import { useAuthStore } from "@/stores";
import { onMounted } from "vue";

onMounted(() => {
  console.log("MainLayout mounted");
});
const authStore = useAuthStore()
const user = authStore.user
const isAuthenticated = authStore.isAuthenticated
const  refreshToken = authStore.refreshToken
const logout= async () =>{
await authStore.logout(String(refreshToken))
}
</script>
<template class="min-h-screen bg-gray-50">
  <!-- Header -->
  <!-- <AppHeader /> -->
  <AppNavBar :user="user" :isAuthenticated="isAuthenticated" @logout="logout"/>
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
