<template>
  <nav class="flex items-center gap-2 text-sm">
    <router-link
      v-for="(crumb, index) in breadcrumbs"
      :key="index"
      :to="crumb.path"
      :class="[
        'transition-colors',
        index === breadcrumbs.length - 1
          ? 'text-gray-800 font-medium pointer-events-none'
          : 'text-gray-500 hover:text-blue-600'
      ]"
    >
      {{ crumb.label }}
      <svg
        v-if="index < breadcrumbs.length - 1"
        class="w-4 h-4 text-gray-400 inline-block mx-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

// Fonction pour générer les breadcrumbs automatiquement
const breadcrumbs = computed(() => {
  const crumbs = [];
  
  // Toujours commencer par le dashboard
  crumbs.push({
    label: 'Tableau de bord',
    path: '/dashboard'
  });

  // Analyser le path actuel
  const pathArray = route.path.split('/').filter(p => p);
  
  // Si on est dans les matières
  if (pathArray.includes('matieres')) {
    crumbs.push({
      label: 'Mes matières',
      path: '/matieres'
    });
    
    // Si on a un ID de matière
    if (route.params.matiereId) {
      // Récupérer le nom de la matière depuis le store ou l'API
      const matiereName = route.meta.matiereName || 'Mathématiques';
      crumbs.push({
        label: matiereName,
        path: `/matieres/${route.params.matiereId}`
      });
      
      // Si on a un cours
      if (route.params.coursId) {
        const coursName = route.meta.coursName || 'Algèbre et équations';
        crumbs.push({
          label: coursName,
          path: `/matieres/${route.params.matiereId}/cours/${route.params.coursId}`
        });
        
        // Si on a un chapitre et une leçon
        if (route.params.chapitreId && route.params.lessonId) {
          const leconName = route.meta.leconName || 'Leçon';
          crumbs.push({
            label: leconName,
            path: route.path
          });
        }
      }
    }
  }
  
  return crumbs;
});
</script>