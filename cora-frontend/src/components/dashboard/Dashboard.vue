<script setup lang="">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import DashboardHeader from "./DashboardHeader.vue";
import StatsCards from "./StatsCards.vue";
import MatieresList from "./MatieresList.vue";
import ProchainsCoursCard from "./ProchainsCoursCard.vue";
import DevoirsCard from "./DevoirsCard.vue";
import BacInfoCard from "./BacInfoCard.vue";
import ConseilCard from "./ConseilCard.vue";
import {
  matieresBySerie,
  stats,
  prochainsCours,
  devoirs,
} from "@/data/dashboardData";
import { useAuthStore } from "@/stores";

const router = useRouter();
const selectedSerie = ref("C");
const authStore = useAuthStore();
const user = authStore.user
const classe = authStore.classe

const currentMatieres = computed(() => matieresBySerie[selectedSerie.value]);

const handleOpenMatiere = (matiere) => {
  router.push({
    name: "matiere-detail",
    params: {
      serie: selectedSerie.value,
      matiereId: matiere.name.toLowerCase().replace(/\s+/g, "-"),
    },
    state: { matiere },
  });
};
</script>

<template>
  <div
    class="min-h-screen bg-linear-to-br from-orange-50 via-green-50 to-orange-50 p-6"
  >
    <div class="max-w-7xl mx-auto">
      <DashboardHeader
        :classe="classe"
      />

      <StatsCards :stats="stats" />

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Section principale -->
        <div class="lg:col-span-2 space-y-6">
          <MatieresList
            :matieres="currentMatieres"
            @open-matiere="handleOpenMatiere"
          />

          <ProchainsCoursCard :cours="prochainsCours" />
        </div>

        <!-- Sidebar -->
        <div class="space-y-6">
          <DevoirsCard :devoirs="devoirs" />
          <BacInfoCard />
          <ConseilCard />
        </div>
      </div>
    </div>
  </div>
</template>
