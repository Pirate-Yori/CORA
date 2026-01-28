<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <!-- Header -->
    <header class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo et titre -->
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h1 class="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Cora</h1>
              <p class="text-xs text-gray-500">Tableau de bord</p>
            </div>
          </div>

          <!-- Profil utilisateur -->
          <div class="flex items-center gap-4">
            <button class="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div class="flex items-center gap-3">
              <div class="text-right hidden sm:block">
                <p class="text-sm font-semibold text-gray-800">{{ user.prenom }} {{ user.nom }}</p>
                <p class="text-xs text-gray-500">{{ user.classe }}</p>
              </div>
              <div class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                {{ user.initiales }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Contenu principal -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Message de bienvenue -->
      <div class="mb-8">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">
          Bonjour, {{ user.prenom }} ! 👋
        </h2>
        <p class="text-gray-600">Voici un aperçu de vos activités aujourd'hui</p>
      </div>

      <!-- Statistiques rapides -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Cours suivis -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-1">{{ stats.coursActifs }}</h3>
          <p class="text-sm text-gray-500">Cours actifs</p>
        </div>

        <!-- Devoirs à venir -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-1">{{ stats.devoirsAVenir }}</h3>
          <p class="text-sm text-gray-500">Devoirs à rendre</p>
        </div>

        <!-- Progression -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-1">{{ stats.progression }}%</h3>
          <p class="text-sm text-gray-500">Progression moyenne</p>
        </div>

        <!-- Heures d'étude -->
        <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div class="flex items-center justify-between mb-4">
            <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-1">{{ stats.heuresEtude }}h</h3>
          <p class="text-sm text-gray-500">Cette semaine</p>
        </div>
      </div>

      <!-- Grille principale -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Colonne de gauche (2/3) -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Matières -->
          <section>
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-800">Mes matières</h3>
              <button class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                Voir tout
              </button>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                v-for="matiere in matieres" 
                :key="matiere.id"
                class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all cursor-pointer group"
              >
                <div class="flex items-start justify-between mb-4">
                  <div :class="['w-12 h-12 rounded-xl flex items-center justify-center', matiere.colorBg]">
                    <span class="text-2xl">{{ matiere.icon }}</span>
                  </div>
                  <span :class="['px-3 py-1 rounded-full text-xs font-medium', matiere.statusColor]">
                    {{ matiere.status }}
                  </span>
                </div>
                
                <h4 class="text-lg font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {{ matiere.nom }}
                </h4>
                <p class="text-sm text-gray-500 mb-4">{{ matiere.professeur }}</p>
                
                <!-- Barre de progression -->
                <div class="mb-3">
                  <div class="flex items-center justify-between mb-2">
                    <span class="text-xs text-gray-500">Progression</span>
                    <span class="text-xs font-semibold text-gray-700">{{ matiere.progression }}%</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      :class="['h-2 rounded-full transition-all', matiere.progressColor]"
                      :style="{ width: matiere.progression + '%' }"
                    ></div>
                  </div>
                </div>
                
                <div class="flex items-center gap-4 text-xs text-gray-500">
                  <span class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ matiere.prochainCours }}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <!-- Devoirs à venir -->
          <section>
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold text-gray-800">Devoirs à venir</h3>
              <button class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
                Voir tout
              </button>
            </div>
            
            <div class="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100">
              <div 
                v-for="devoir in devoirs" 
                :key="devoir.id"
                class="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div class="flex items-start gap-4">
                  <div :class="['w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', devoir.colorBg]">
                    <span class="text-xl">{{ devoir.icon }}</span>
                  </div>
                  
                  <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between mb-2">
                      <div>
                        <h4 class="text-base font-semibold text-gray-800 mb-1">{{ devoir.titre }}</h4>
                        <p class="text-sm text-gray-500">{{ devoir.matiere }}</p>
                      </div>
                      <span :class="['px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap', devoir.priorityColor]">
                        {{ devoir.priorite }}
                      </span>
                    </div>
                    
                    <div class="flex items-center gap-4 text-sm text-gray-500 mt-3">
                      <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {{ devoir.dateRemise }}
                      </span>
                      <span class="flex items-center gap-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {{ devoir.tempsEstime }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <!-- Colonne de droite (1/3) -->
        <div class="space-y-8">
          <!-- Annonces -->
          <section>
            <h3 class="text-2xl font-bold text-gray-800 mb-6">Annonces</h3>
            
            <div class="space-y-4">
              <div 
                v-for="annonce in annonces" 
                :key="annonce.id"
                class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div class="flex items-start gap-3 mb-3">
                  <div :class="['w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', annonce.colorBg]">
                    <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold text-gray-800 text-sm mb-1">{{ annonce.titre }}</h4>
                    <p class="text-xs text-gray-500">{{ annonce.date }}</p>
                  </div>
                </div>
                <p class="text-sm text-gray-600">{{ annonce.contenu }}</p>
              </div>
            </div>
          </section>

          <!-- Calendrier rapide -->
          <section>
            <h3 class="text-2xl font-bold text-gray-800 mb-6">Emploi du temps</h3>
            
            <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div class="space-y-4">
                <div 
                  v-for="cours in emploiDuTemps" 
                  :key="cours.id"
                  class="flex items-center gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <div class="text-center flex-shrink-0">
                    <div class="text-sm font-semibold text-gray-800">{{ cours.heure }}</div>
                    <div class="text-xs text-gray-500">{{ cours.duree }}</div>
                  </div>
                  
                  <div :class="['w-1 h-12 rounded-full', cours.color]"></div>
                  
                  <div class="flex-1">
                    <h4 class="font-semibold text-sm text-gray-800">{{ cours.matiere }}</h4>
                    <p class="text-xs text-gray-500">{{ cours.salle }}</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Données utilisateur
const user = ref({
  prenom: 'Jean',
  nom: 'Dupont',
  classe: '3ème A',
  initiales: 'JD'
});

// Statistiques
const stats = ref({
  coursActifs: 8,
  devoirsAVenir: 5,
  progression: 78,
  heuresEtude: 12
});

// Matières
const matieres = ref([
  {
    id: 1,
    nom: 'Mathématiques',
    professeur: 'M. Martin',
    icon: '📐',
    colorBg: 'bg-blue-100',
    progressColor: 'bg-blue-600',
    progression: 85,
    prochainCours: 'Demain, 9h00',
    status: 'En cours',
    statusColor: 'bg-green-100 text-green-700'
  },
  {
    id: 2,
    nom: 'Français',
    professeur: 'Mme Dubois',
    icon: '📚',
    colorBg: 'bg-purple-100',
    progressColor: 'bg-purple-600',
    progression: 72,
    prochainCours: 'Lun, 14h00',
    status: 'En cours',
    statusColor: 'bg-green-100 text-green-700'
  },
  {
    id: 3,
    nom: 'Anglais',
    professeur: 'Mr. Smith',
    icon: '🌍',
    colorBg: 'bg-orange-100',
    progressColor: 'bg-orange-600',
    progression: 90,
    prochainCours: 'Ven, 10h00',
    status: 'Avancé',
    statusColor: 'bg-blue-100 text-blue-700'
  },
  {
    id: 4,
    nom: 'Sciences',
    professeur: 'Mme Laurent',
    icon: '🔬',
    colorBg: 'bg-green-100',
    progressColor: 'bg-green-600',
    progression: 65,
    prochainCours: 'Mar, 15h00',
    status: 'En cours',
    statusColor: 'bg-green-100 text-green-700'
  }
]);

// Devoirs
const devoirs = ref([
  {
    id: 1,
    titre: 'Dissertation sur le romantisme',
    matiere: 'Français',
    icon: '📝',
    colorBg: 'bg-purple-100',
    dateRemise: 'Dans 2 jours',
    tempsEstime: '2h',
    priorite: 'Urgent',
    priorityColor: 'bg-red-100 text-red-700'
  },
  {
    id: 2,
    titre: 'Exercices de géométrie',
    matiere: 'Mathématiques',
    icon: '📐',
    colorBg: 'bg-blue-100',
    dateRemise: 'Dans 4 jours',
    tempsEstime: '1h30',
    priorite: 'Moyen',
    priorityColor: 'bg-orange-100 text-orange-700'
  },
  {
    id: 3,
    titre: 'Exposé sur les énergies renouvelables',
    matiere: 'Sciences',
    icon: '🔬',
    colorBg: 'bg-green-100',
    dateRemise: 'Dans 7 jours',
    tempsEstime: '3h',
    priorite: 'Normal',
    priorityColor: 'bg-gray-100 text-gray-700'
  }
]);

// Annonces
const annonces = ref([
  {
    id: 1,
    titre: 'Vacances scolaires',
    date: 'Il y a 2 heures',
    contenu: 'Les vacances de printemps commencent le 15 avril.',
    colorBg: 'bg-blue-600'
  },
  {
    id: 2,
    titre: 'Nouveau cours disponible',
    date: 'Il y a 5 heures',
    contenu: 'Le cours de révision pour le brevet est maintenant accessible.',
    colorBg: 'bg-green-600'
  },
  {
    id: 3,
    titre: 'Maintenance programmée',
    date: 'Hier',
    contenu: 'La plateforme sera en maintenance ce week-end de 2h à 4h.',
    colorBg: 'bg-orange-600'
  }
]);

// Emploi du temps
const emploiDuTemps = ref([
  {
    id: 1,
    heure: '09:00',
    duree: '1h',
    matiere: 'Mathématiques',
    salle: 'Salle 201',
    color: 'bg-blue-600'
  },
  {
    id: 2,
    heure: '10:30',
    duree: '1h',
    matiere: 'Français',
    salle: 'Salle 105',
    color: 'bg-purple-600'
  },
  {
    id: 3,
    heure: '14:00',
    duree: '2h',
    matiere: 'Sciences',
    salle: 'Labo 3',
    color: 'bg-green-600'
  },
  {
    id: 4,
    heure: '16:30',
    duree: '1h',
    matiere: 'Anglais',
    salle: 'Salle 302',
    color: 'bg-orange-600'
  }
]);
</script>