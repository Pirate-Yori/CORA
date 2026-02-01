<!-- src/components/Breadcrumb.vue -->
<script setup lang="ts">
import { useMatiereStore } from '@/stores/matiere.store';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const matieresStore = useMatiereStore();

const breadcrumbs = computed(() => {
  const crumbs = [];
  
  // Toujours commencer par le dashboard
  crumbs.push({
    label: 'Tableau de bord',
    path: '/dashboard'
  });

  // Si on est dans les matières
  if (route.path.includes('/matieres')) {
    crumbs.push({
      label: 'Mes matières',
      path: '/matieres'
    });
    
    // Si on a un ID de matière
    if (route.params.matiereId) {
      const matiereName = matieresStore.matiereActive?.nom || 'Matière';
      crumbs.push({
        label: matiereName,
        path: `/matieres/${route.params.matiereId}`
      });
      
      // Si on a un cours
      if (route.params.coursId) {
        const coursName = matieresStore.coursActif?.nom || 'Cours';
        crumbs.push({
          label: coursName,
          path: `/matieres/${route.params.matiereId}/cours/${route.params.coursId}`
        });
        
        // Si on a une leçon
        if (route.params.leconId) {
          const leconName = matieresStore.leconActive?.titre || 'Leçon';
          crumbs.push({
            label: leconName,
            path: route.path // Dernier élément = page actuelle
          });
        }
      }
    }
  }
  
  // Si on est dans devoirs
  else if (route.path.includes('/devoirs')) {
    crumbs.push({
      label: 'Mes devoirs',
      path: '/devoirs'
    });
  }
  
  // Si on est dans progression
  else if (route.path.includes('/progression')) {
    crumbs.push({
      label: 'Ma progression',
      path: '/progression'
    });
  }
  
  // Si on est dans calendrier
  else if (route.path.includes('/calendrier')) {
    crumbs.push({
      label: 'Mon calendrier',
      path: '/calendrier'
    });
  }
  
  // Si on est dans messages
  else if (route.path.includes('/messages')) {
    crumbs.push({
      label: 'Messages',
      path: '/messages'
    });
  }
  
  // Si on est dans profil
  else if (route.path.includes('/profil')) {
    crumbs.push({
      label: 'Mon profil',
      path: '/profil'
    });
  }
  
  // Si on est dans paramètres
  else if (route.path.includes('/parametres')) {
    crumbs.push({
      label: 'Paramètres',
      path: '/parametres'
    });
  }
  
  return crumbs;
});
</script>

<template>
  <nav v-if="breadcrumbs.length > 1" class="flex items-center gap-2 text-sm">
    <template v-for="(crumb, index) in breadcrumbs" :key="index">
      <router-link
        v-if="index < breadcrumbs.length - 1"
        :to="crumb.path"
        class="text-gray-500 hover:text-blue-600 transition-colors truncate max-w-[150px]"
      >
        {{ crumb.label }}
      </router-link>
      <span
        v-else
        class="text-gray-800 font-medium truncate max-w-[200px]"
      >
        {{ crumb.label }}
      </span>
      
      <svg
        v-if="index < breadcrumbs.length - 1"
        class="w-4 h-4 text-gray-400 flex-shrink-0"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </template>
  </nav>
</template>