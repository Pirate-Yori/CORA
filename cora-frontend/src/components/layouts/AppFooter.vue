<script setup lang="ts">
import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-vue-next';

    const year = new Date().getFullYear();
</script>
<template>
  <footer class="bg-[#1a202c] text-white px-6 py-16 md:py-20">
    <div
      class="max-w-6xl mx-auto grid gap-10 md:gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4"
    >
      <!-- {/* --- À propos --- */} -->
      <div>
        <h2 class="text-2xl font-bold mb-3">Cora</h2>
        <p class="text-gray-400 leading-relaxed mb-4">
          La plateforme d'apprentissage en ligne qui vous propulse vers la
          maîtrise des compétences informatiques.
        </p>

        <!-- {/* Réseaux sociaux */} -->
        <div class="flex gap-3 mt-4">
          <router-link
            to="#"
            class="bg-white/10 hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            <Facebook class="w-5 h-5" />
          </router-link>
          <router-link
            to="#"
            class="bg-white/10 hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            <Twitter class="w-5 h-5" />
          </router-link>
          <router-link
            to="#"
            class="bg-white/10 hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            <Linkedin class="w-5 h-5" />
          </router-link>
          <router-link
            to="#"
            class="bg-white/10 hover:bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center transition"
          >
            <Youtube class="w-5 h-5" />
          </router-link>
        </div>
      </div>

      <!-- {/* --- Navigation --- */} -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Navigation</h3>
        <ul class="space-y-2">
          <li>
            <router-link
              to="/"
              class="text-gray-400 hover:text-white transition"
            >
              Accueil
            </router-link>
          </li>
          <li>
            <router-link
              to="/courses"
              class="text-gray-400 hover:text-white transition"
            >
              Cours
            </router-link>
          </li>
          <li>
            <router-link
              to="/about"
              class="text-gray-400 hover:text-white transition"
            >
              À propos
            </router-link>
          </li>
          <li>
            <router-link
              to="/login"
              class="text-gray-400 hover:text-white transition"
            >
              Connexion
            </router-link>
          </li>
        </ul>
      </div>

      <!-- {/* --- Ressources --- */} -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Ressources</h3>
        <ul class="space-y-2">
          <li>
            <router-link
              to="#"
              class="text-gray-400 hover:text-white transition"
            >
              Documentation
            </router-link>
          </li>
          <li>
            <router-link
              to="#"
              class="text-gray-400 hover:text-white transition"
            >
              FAQ
            </router-link>
          </li>
          <li>
            <router-link
              to="#"
              class="text-gray-400 hover:text-white transition"
            >
              Blog
            </router-link>
          </li>
          <li>
            <router-link
              to="#"
              class="text-gray-400 hover:text-white transition"
            >
              Support
            </router-link>
          </li>
        </ul>
      </div>

      <!-- {/* --- Légal --- */} -->
      <div>
        <h3 class="text-lg font-semibold mb-4">Légal</h3>
        <ul class="space-y-2">
          <li>
            <router-link
              to="#"
              class="text-gray-400 hover:text-white transition"
            >
              Conditions d'utilisation
            </router-link>
          </li>
          <li>
            <router-link
              to="#"
              class="text-gray-400 hover:text-white transition"
            >
              Politique de confidentialité
            </router-link>
          </li>
          <li>
            <router-link
              to="#"
              class="text-gray-400 hover:text-white transition"
            >
              Cookies
            </router-link>
          </li>
          <li>
            <router-link
              to="#"
              class="text-gray-400 hover:text-white transition"
            >
              Mentions légales
            </router-link>
          </li>
        </ul>
      </div>
    </div>

    <!-- {/* --- Bas du footer --- */} -->
    <div
      class="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 text-center text-gray-400 text-sm"
    >
      &copy; {{year}} Cora. Tous droits réservés.
    </div>
  </footer>
</template>
