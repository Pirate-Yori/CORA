<!-- src/layouts/AuthLayout.vue -->
<!-- <script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute()
const pageTitle = computed(()=>{
  return route.meta.title as string || "Authentification"
})
</script> -->

<!-- <template>
  <div
    class="main-h-screen bg-linear-to-br from primary-50 to-secondary-100 flex items-center justifiy-center p-4"
  >
    <div class="w-full max-w-m">
      <!-- Logo/Branding --
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-primary-600 mb-2">Cora</h1>
        <p class="text-secondary-600">Apprenez des competences où vous voulez et quand vous voulez</p>
      </div>

      <!-- Card principale --
      <div class="bg-white rounded-2xl shadow-xl p-">
        <h2 class="text-2xl font-semibold text-center mb-6 text-secondary-900">
          {{ pageTitle }}
        </h2>

        <!-- COntenu de la page --
        <RouterView />
      </div>
        <RouterLink to="home" class="m-3 flex justify-center text-center ">
          Home
        </RouterLink>
    </div>
  </div>
</template>
<style> --
/* Animations personnalisées */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>-->
<!-- src/layouts/AuthLayout.vue -->
<script setup lang="ts">
import { computed } from 'vue';
import { RouterLink, useRoute } from 'vue-router';

const route = useRoute();
const pageTitle = computed(() => {
  return (route.meta.title as string) || 'Authentification';
});
</script>

<template>
  <div class=" bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
    <div class="w-full max-w-5xl">
      <!-- Logo/Branding -->
      <!-- <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h1 class="text-4xl font-bold bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
          Cora
        </h1>
        <p class="text-gray-600 text-sm max-w-md mx-auto">
          Apprenez des compétences où vous voulez et quand vous voulez
        </p>
      </div> -->

      <!-- Card principale -->
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div class="md:p-10">
          <!-- <h2 class="text-2xl md:text-3xl font-bold text-center mb-4 text-gray-800">
            {{ pageTitle }}
          </h2> -->

          <!-- Contenu de la page -->
          <div class="max-w-2xl mx-auto">
            <RouterView />
          </div>
        </div>

        <!-- Footer avec bouton Home -->
        <div class="bg-gray-50 px-8 py-3 border-t border-gray-100">
          <RouterLink
            to="/home"
            class="flex items-center justify-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 text-sm font-medium group"
          >
            <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Retour à l'accueil
          </RouterLink>
        </div>
      </div>

      <!-- Copyright -->
      <!-- <p class="text-center text-gray-500 text-xs mt-8">
        © 2025 Cora. Tous droits réservés.
      </p> -->
    </div>
  </div>
</template>

<style scoped>
/* Animations personnalisées */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>