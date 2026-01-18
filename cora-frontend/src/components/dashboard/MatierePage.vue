<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-orange-50 p-6">
    <div class="max-w-7xl mx-auto">
      <BackButton @click="$router.back()" />

      <MatiereHeader :matiere="matiere" />
      
      <MatiereStats :matiere="matiere" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div class="lg:col-span-2">
          <ChapitresList 
            :chapitres="matiereDetails.chapitres"
            :matiere-color="matiere.color"
          />
          
          <VideosList :videos="matiereDetails.videos" />
        </div>

        <div class="space-y-6">
          <ProchainCoursCard :matiere="matiere" />
          <DevoirsEvaluationsCard :devoirs="matiereDetails.devoirs" />
          <PerformancesCard :matiere="matiere" />
          <ForumCard />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import BackButton from './BackButton.vue';
import MatiereHeader from './MatiereHeader.vue';
import MatiereStats from './MatiereStats.vue';
import ChapitresList from './ChapitresList.vue';
import VideosList from './VideosList.vue';
import ProchainCoursCard from './ProchainCoursCard.vue';
import DevoirsEvaluationsCard from './DevoirsEvaluationsCard.vue';
import PerformancesCard from './PerformancesCard.vue';
import ForumCard from './ForumCard.vue';
import { getMatiereDetails } from '@/data/matiereData';

const router = useRouter();
const route = useRoute();

// Récupérer la matière depuis le state du router ou depuis l'API
const matiere = computed(() => route.state?.matiere || {});

const matiereDetails = computed(() => getMatiereDetails(matiere.value.name));
</script>