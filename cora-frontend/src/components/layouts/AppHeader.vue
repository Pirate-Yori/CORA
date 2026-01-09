<script setup lang="ts">
import { useAuth } from "@/composables";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import AppButton from "../common/AppButton.vue";

interface NavBarItem {
  title: string;
  path: string;
  permission?: string;
  children?: NavBarItem[];
}

const NavBarItems = computed<NavBarItem[]>(() => [
  {
    title: "Accueil",
    path: "/home",
  },
  {
    title: "Cours",
    path: "/courses",
  },
  {
    title: "Apropos",
    path: "/about",
  },
]);
const route = useRoute();
const router = useRouter();
const isActive = (path: string) => {
  return route.path.startsWith(path);
};

const goToRegister = ()=>{
    router.push({name:'Register'});
}
const goToLogin = ()=>{
    router.push({name:'Login'});
}

const menuOpen = ref(false);
const showUserMenu = ref(false);
const {user,logout, userFullName,isAuthenticated} = useAuth();
</script>

<template>
  <header class="sticky top-0 z-50 bg-white shadow-md">
    <div class="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
      <!-- Logo -->
      <router-link
        to="/"
        class="flex items-center text-2xl font-bold text-primary"
      >
        <i class="icon-logo mr-2"></i>
        EduPlatform
      </router-link>

      <!-- buton mobile -->
      <button
        @click="menuOpen = !menuOpen"
        class="md:hidden text-gray-700 focus:outline-none"
      >
        <i v-if="!menuOpen" class="icon-menu text-3xl"></i>
        <i v-else class="icon-close text-3xl"></i>
      </button>

      <!-- Navigation  -->
      <nav
        class="opacity-0 md:opacity-100 md:translate-y-0 fixed md:static top-17.5 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none transition-transform duration-300 ease-in-out"
      >
        <ul
          class="flex flex-col md:flex-row items-start md:items-center md:gap-8 gap-4 p-4 md:p-0"
        >
          <li v-for="item in NavBarItems" :key="item.path" class="mt-4 md:mt-0">
            <router-link
              :to="item.path"
              :class="[
                'flex items-center gap-2 text-gray-700 font-medium hover:text-primary transition ',
                isActive(item.path)
                  ? 'bg-primary-800 text-white rounded-lg px-3 py-2 '
                  : 'text-gray-700 hover:bg-gray-200',
              ]"
            >
              {{ item.title }}
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- Action utilisateur -->
      <div class="hidden md:flex items-center gap-4">
        <AppButton variant="primary" @click="goToLogin">Se connecter</AppButton>
        <AppButton variant="secondary" @click="goToRegister">S'inscrire</AppButton>
      </div>

      <!-- Rigth Side -->
      <div class="flex items-center gap-4" v-if="isAuthenticated">
        <!-- Notification -->
        <button
          type="button"
          class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>

        <!-- User Menu -->
        <div class="relative">
          <button
            type="button"
            class="flex items-center gap-3 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors"
            @click="showUserMenu = !showUserMenu"
          >
            <div
              class="w-8 h-8 rounded-full bg-primary-600 flex items-center justify-center text-white font-semibold"
            >
              {{
                userFullName
                  .split(' ')
                  .map(n => n[0])
                  .join('')
                  .substring(0, 2)
              }}
            </div>
            <div class="text-left hidden md:block">
              <p class="tex-sm font-medium text-gray-900">{{ userFullName }}</p>
              <p class="text-xs text-gray-500">{{ user?.email }}</p>
            </div>
            <svg class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              />
            </svg>
          </button>

          <!-- Dropdown -->
          <Transition name="dropdown">
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
            >
              <RouterLink
                to="/profile"
                class="flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                @click="showUserMenu = false"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Mon profil
              </RouterLink>
              <RouterLink
                to="/settings"
                class="flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                @click="showUserMenu = false"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Paramètres
              </RouterLink>

              <hr class="my-2 border-gray-200" />

              <button type="button" class="flex items-center gap-3 px-4 py-2 text-sm  hover:bg-gray-100 transition-colors text-danger-600 w-full" @click="logout">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Déconnexion
              </button>
            </div>
          </Transition>
          
        </div>
      </div>
    </div>
  </header>
</template>
