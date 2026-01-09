<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section class="relative bg-teal-400 min-h-screen overflow-hidden">     
      <!-- Hero Content -->
      <div class="container mx-auto max-w-6xl px-4 lg:px-8 py-12 lg:py-20">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <!-- Left Content -->
          <div class="space-y-8">
            <h2 class="text-4xl lg:text-5xl font-bold leading-tight">
              <span class="text-amber-500">Étudier</span>
              <span class="text-white"> en ligne est maintenant bien plus facile</span>
            </h2>
            
            <p class="text-white text-lg lg:text-2xl leading-relaxed">
              CORA est une plateforme intéressante qui vous apprendra de manière plus interactive et efficace.
            </p>

            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <button class="px-8 py-4 bg-white/30 rounded-full text-white text-xl font-semibold hover:bg-white/40 transition">
                Rejoindre maintenant
              </button>
              
              <div class="flex items-center gap-4">
                <div class="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-105 transition">
                  <svg class="w-6 h-6 text-teal-400 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <span class="text-slate-800 text-xl">Comment ça marche</span>
              </div>
            </div>
          </div>

          <!-- Right Content - Image with Cards -->
          <div class="relative hidden lg:block">
            <img src="https://placehold.co/544x892" alt="Student" class="rounded-lg shadow-2xl" />
            
            <!-- Floating Cards -->
            <div class="absolute top-20 -left-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 bg-cyan-400 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                </div>
                <div>
                  <p class="text-zinc-600 text-2xl font-bold">250k</p>
                  <p class="text-gray-600 text-lg">Étudiants</p>
                </div>
              </div>
            </div>

            <div class="absolute bottom-32 -left-12 bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl max-w-sm">
              <div class="flex items-center gap-4 mb-4">
                <img src="https://placehold.co/56x56" alt="User" class="w-14 h-14 rounded-full" />
                <div>
                  <p class="text-zinc-600 text-xl font-bold">User Experience Class</p>
                  <p class="text-gray-600">Today at 12.00 PM</p>
                </div>
              </div>
              <button class="w-full py-3 bg-pink-500 rounded-full text-white text-lg font-bold hover:bg-pink-600 transition">
                Join Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Success Stats -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-4xl lg:text-5xl font-bold text-slate-950 mb-4">Our Success</h2>
          <p class="text-lg text-slate-950/80 max-w-3xl mx-auto">
            Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin at nec nam et pharetra gravida.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          <div v-for="stat in stats" :key="stat.value" class="text-center">
            <p class="text-4xl lg:text-6xl font-light text-sky-700 mb-2">{{ stat.value }}</p>
            <p class="text-lg lg:text-2xl text-slate-950/80">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- All-In-One Section -->
    <section class="py-16 lg:py-24 bg-gray-50">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold mb-4">
            <span class="text-indigo-900">All-In-One </span>
            <span class="text-teal-500">Cloud Software.</span>
          </h2>
          <p class="text-xl lg:text-2xl text-gray-500 max-w-4xl mx-auto">
            TOTC is one powerful online software suite that combines all the tools needed to run a successful school or office.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="feature in features" :key="feature.title" class="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">
            <div :class="['w-20 h-20 rounded-full flex items-center justify-center mb-6', feature.bgColor]">
              <svg class="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path :d="feature.icon"/>
              </svg>
            </div>
            <h3 class="text-2xl lg:text-3xl font-medium text-indigo-900 mb-4">{{ feature.title }}</h3>
            <p class="text-lg lg:text-xl text-gray-500 leading-relaxed">{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- What is TOTC Section -->
    <section class="py-16 lg:py-24 bg-white">
      <div class="container mx-auto px-4 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-5xl font-semibold mb-6">
            <span class="text-indigo-900">What is </span>
            <span class="text-teal-500">TOTC?</span>
          </h2>
          <p class="text-xl lg:text-2xl text-gray-500 max-w-5xl mx-auto leading-relaxed">
            TOTC is a platform that allows educators to create online classes whereby they can store the course materials online; manage assignments, quizzes and exams; monitor due dates; grade results and provide students with feedback all in one place.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <div class="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img src="https://placehold.co/600x400" alt="Instructors" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-indigo-950/60 flex flex-col items-center justify-center gap-6 p-8">
              <h3 class="text-2xl lg:text-3xl font-semibold text-white">FOR INSTRUCTORS</h3>
              <button class="px-12 py-4 rounded-full border-2 border-white text-white text-xl font-medium hover:bg-white hover:text-indigo-900 transition">
                Start a class today
              </button>
            </div>
          </div>

          <div class="relative rounded-2xl overflow-hidden group cursor-pointer">
            <img src="https://placehold.co/600x400" alt="Students" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-indigo-950/40 flex flex-col items-center justify-center gap-6 p-8">
              <h3 class="text-2xl lg:text-3xl font-semibold text-white">FOR STUDENTS</h3>
              <button class="px-12 py-4 rounded-full bg-cyan-400/90 text-white text-xl font-medium hover:bg-cyan-500 transition">
                Enter access code
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import AppFooter from '@/components/layouts/AppFooter.vue';

export default {
  name: 'TOTCLandingPage',
  data() {
    return {
      mobileMenuOpen: false,
      stats: [
        { value: '15K+', label: 'Students' },
        { value: '75%', label: 'Total success' },
        { value: '35', label: 'Main questions' },
        { value: '26', label: 'Chief experts' },
        { value: '16', label: 'Years of experience' }
      ],
      features: [
        {
          title: 'Online Billing, Invoicing, & Contracts',
          description: 'Simple and secure control of your organization\'s financial and legal transactions. Send customized invoices and contracts',
          bgColor: 'bg-indigo-500',
          icon: 'M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z'
        },
        {
          title: 'Easy Scheduling & Attendance Tracking',
          description: 'Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance',
          bgColor: 'bg-teal-500',
          icon: 'M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z'
        },
        {
          title: 'Customer Tracking',
          description: 'Automate and track emails to individuals or groups. Skilline\'s built-in system helps organize your organization',
          bgColor: 'bg-sky-400',
          icon: 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z'
        }
      ]
    }
  }
}
</script>

<style scoped>
/* Animations personnalisées si nécessaire */
</style>