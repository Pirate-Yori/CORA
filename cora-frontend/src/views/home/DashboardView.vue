<template>
  <div class="min-h-screen bg-linear-to-br from-orange-50 via-white to-green-50">
    <!-- Navigation -->
   

    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-4">
      <div class="max-w-7xl mx-auto text-center">
        <div class="inline-flex items-center space-x-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full mb-6">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          <span class="text-sm font-medium">Conforme au système éducatif ivoirien</span>
        </div>
        
        <h1 class="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
          Réussissez votre
          <span class="bg-linear-to-r from-orange-600 to-green-600 bg-clip-text text-transparent"> BEPC </span>
          et votre
          <span class="bg-linear-to-r from-orange-600 to-green-600 bg-clip-text text-transparent"> BAC</span>
        </h1>
        
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          La plateforme d'e-learning n°1 en Côte d'Ivoire pour les élèves de 3ème et Terminale. 
          Cours en ligne, exercices corrigés et suivi personnalisé.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button class="px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl font-semibold text-lg hover:shadow-2xl transition transform hover:scale-105 flex items-center justify-center space-x-2">
            <span>Commencer gratuitement</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
            </svg>
          </button>
          <button class="px-8 py-4 bg-white text-orange-600 border-2 border-orange-600 rounded-xl font-semibold text-lg hover:bg-orange-50 transition">
            Voir une démo
          </button>
        </div>

        <div class="flex flex-wrap justify-center gap-8 text-sm text-gray-600">
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>Sans engagement</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>7 jours gratuits</span>
          </div>
          <div class="flex items-center space-x-2">
            <svg class="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <span>Accessible sur mobile</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-12 bg-gradient-to-r from-orange-600 to-green-600">
      <div class="max-w-7xl mx-auto px-4">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="stat in stats" :key="stat.label" class="text-center text-white">
            <div class="text-4xl md:text-5xl font-bold mb-2">{{ stat.number }}</div>
            <div class="text-orange-100">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pourquoi choisir CORA ?</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">Une plateforme pensée pour la réussite des élèves ivoiriens</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="feature in features" :key="feature.title" class="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2">
            <div class="w-12 h-12 bg-gradient-to-r from-orange-600 to-orange-500 rounded-xl flex items-center justify-center text-white mb-4">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.icon"/>
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ feature.title }}</h3>
            <p class="text-gray-600">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Classes Section -->
    <section id="classes" class="py-20 px-4 bg-gray-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Nos programmes</h2>
          <p class="text-xl text-gray-600">Choisissez votre classe</p>
        </div>

        <div class="flex justify-center gap-4 mb-12">
          <button @click="selectedClass = '3e'" :class="['px-8 py-3 rounded-xl font-semibold transition', selectedClass === '3e' ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100']">
            Classe de 3ème (BEPC)
          </button>
          <button @click="selectedClass = 'tle'" :class="['px-8 py-3 rounded-xl font-semibold transition', selectedClass === 'tle' ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white shadow-lg' : 'bg-white text-gray-700 hover:bg-gray-100']">
            Terminale (BAC)
          </button>
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8">
          <h3 class="text-2xl font-bold text-gray-900 mb-6">Matières disponibles pour {{ selectedClass === '3e' ? 'la 3ème' : 'la Terminale' }}</h3>
          <div class="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            <div v-for="subject in currentSubjects" :key="subject" class="flex items-center space-x-2 p-3 bg-gradient-to-r from-orange-50 to-green-50 rounded-lg">
              <svg class="w-5 h-5 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
              </svg>
              <span class="text-gray-800 font-medium">{{ subject }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-20 px-4">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Tarifs adaptés à tous</h2>
          <p class="text-xl text-gray-600">Choisissez la formule qui vous convient</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="plan in pricing" :key="plan.name" :class="['bg-white rounded-2xl shadow-xl p-8', plan.popular ? 'ring-4 ring-orange-600 transform scale-105' : '']">
            <div v-if="plan.popular" class="bg-gradient-to-r from-orange-600 to-orange-500 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
              Le plus populaire
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ plan.name }}</h3>
            <div class="mb-6">
              <span class="text-5xl font-bold text-gray-900">{{ plan.price }}</span>
              <span class="text-gray-600"> FCFA{{ plan.period }}</span>
            </div>
            <ul class="space-y-4 mb-8">
              <li v-for="feature in plan.features" :key="feature" class="flex items-start space-x-3">
                <svg class="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
                </svg>
                <span class="text-gray-700">{{ feature }}</span>
              </li>
            </ul>
            <button :class="['w-full py-3 rounded-xl font-semibold transition', plan.popular ? 'bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:shadow-lg transform hover:scale-105' : 'bg-gray-100 text-gray-900 hover:bg-gray-200']">
              Choisir ce plan
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section id="testimonials" class="py-20 px-4 bg-gradient-to-br from-orange-50 to-green-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Ils ont réussi avec CORA</h2>
          <p class="text-xl text-gray-600">Témoignages de nos élèves</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div v-for="testimonial in testimonials" :key="testimonial.name" class="bg-white p-6 rounded-2xl shadow-lg">
            <div class="flex items-center space-x-1 mb-4">
              <svg v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>
            <p class="text-gray-700 mb-4 italic">"{{ testimonial.text }}"</p>
            <div class="border-t pt-4">
              <div class="font-semibold text-gray-900">{{ testimonial.name }}</div>
              <div class="text-sm text-gray-600">{{ testimonial.class }}</div>
              <div class="text-sm text-orange-600 font-medium mt-1">{{ testimonial.grade }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 px-4 bg-linear-to-r from-orange-600 to-green-600">
      <div class="max-w-4xl mx-auto text-center text-white">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">Prêt à réussir vos examens ?</h2>
        <p class="text-xl mb-8 text-orange-100">Rejoignez les milliers d'élèves qui ont déjà choisi CORA pour leur réussite</p>
        <button class="px-8 py-4 bg-white text-orange-600 rounded-xl font-semibold text-lg hover:shadow-2xl transition transform hover:scale-105">
          Commencer maintenant - 7 jours gratuits
        </button>
        <p class="mt-4 text-orange-100 text-sm">Sans carte bancaire • Sans engagement • Annulation à tout moment</p>
      </div>
    </section>

    <!-- Footer -->
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const mobileMenuOpen = ref(false)
const selectedClass = ref<'3e' | 'tle'>('3e')

const stats = [
  { number: "5000+", label: "Élèves inscrits" },
  { number: "92%", label: "Taux de réussite" },
  { number: "50+", label: "Enseignants qualifiés" },
  { number: "24/7", label: "Accès aux cours" }
]

const features = [
  {
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    title: "Cours conformes au programme ivoirien",
    description: "Contenus alignés avec le curriculum officiel du MENETFP"
  },
  {
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
    title: "Accompagnement personnalisé",
    description: "Suivi individuel avec des enseignants qualifiés"
  },
  {
    icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z",
    title: "Préparation aux examens",
    description: "BEPC et BAC avec exercices types et corrections détaillées"
  },
  {
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    title: "Progression suivie",
    description: "Tableaux de bord pour suivre vos performances"
  }
]

const subjects3e = [
  "Mathématiques", "Français", "Anglais", "Physique-Chimie", 
  "SVT", "Histoire-Géographie", "Éducation Civique"
]

const subjectsTle = [
  "Mathématiques", "Français", "Philosophie", "Anglais",
  "Physique-Chimie", "SVT", "Histoire-Géographie", "Allemand/Espagnol"
]

const currentSubjects = computed(() => {
  return selectedClass.value === '3e' ? subjects3e : subjectsTle
})

const pricing = [
  {
    name: "Mensuel",
    price: "15 000",
    period: "/mois",
    popular: false,
    features: [
      "Accès à tous les cours",
      "Exercices corrigés",
      "Évaluations mensuelles",
      "Forum d'entraide"
    ]
  },
  {
    name: "Trimestriel",
    price: "40 000",
    period: "/3 mois",
    popular: true,
    features: [
      "Tous les avantages Mensuel",
      "Économie de 5 000 FCFA",
      "Séances de révision en direct",
      "Support prioritaire"
    ]
  },
  {
    name: "Annuel",
    price: "120 000",
    period: "/an",
    popular: false,
    features: [
      "Tous les avantages Trimestriel",
      "Économie de 60 000 FCFA",
      "Cours particuliers (2h/mois)",
      "Accès à vie aux archives"
    ]
  }
]

const testimonials = [
  {
    name: "Aminata K.",
    class: "Terminale D, Abidjan",
    text: "Grâce à CORA, j'ai obtenu mon BAC avec mention Bien. Les cours sont clairs et les exercices m'ont vraiment préparé.",
    grade: "BAC 2024 - Mention Bien"
  },
  {
    name: "Kouassi M.",
    class: "3ème, Bouaké",
    text: "J'ai progressé en maths et en physique. Les professeurs répondent rapidement à mes questions sur le forum.",
    grade: "BEPC 2024 - Admis"
  },
  {
    name: "Fatoumata S.",
    class: "Terminale A, Yamoussoukro",
    text: "La plateforme est accessible même avec ma petite connexion. Je peux réviser partout, c'est vraiment pratique !",
    grade: "En cours de préparation"
  }
]
</script>

<style scoped>
/* Styles additionnels si nécessaire */
</style>