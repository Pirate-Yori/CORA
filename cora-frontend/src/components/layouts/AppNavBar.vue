<script setup lang="ts">
import type { User } from "@/types";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import AppButton from "../common/AppButton.vue";

interface HeaderProps {
  user?: User | null;
  transparent?: boolean;
}

const props = withDefaults(defineProps<HeaderProps>(), {
  user: null,
  transparent: false,
});

const emit = defineEmits<{
  logout: [];
}>();

const router = useRouter();
const mobileMenuOpen = ref(false);
const userMenuOpen = ref(false);
const notificationsOpen = ref(false);

const notifications = ref([
  {
    id: 1,
    title: "Nouveau cours disponible",
    message: "Mathématiques avancées - Chapitre 5",
    time: "2h",
    unread: true,
  },
  {
    id: 2,
    title: "Devoir à rendre",
    message: "Physique - TP n°3 pour demain",
    time: "5h",
    unread: true,
  },
  {
    id: 3,
    title: "Message du professeur",
    message: "Réponse à votre question",
    time: "1j",
    unread: false,
  },
]);

const unreadCount = computed(
  () => notifications.value.filter((n) => n.unread).length
);

const headerClasses = computed(() => {
  const base = "sticky top-0 z-50 transition-all duration-300";
  const background = props.transparent
    ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50"
    : "bg-white border-b border-gray-200 shadow-sm";
  return `${base} ${background}`;
});

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
  if (mobileMenuOpen.value) {
    userMenuOpen.value = false;
    notificationsOpen.value = false;
  }
};

const toggleUserMenu = () => {
  userMenuOpen.value = !userMenuOpen.value;
  notificationsOpen.value = false;
};

const toggleNotifications = () => {
  notificationsOpen.value = !notificationsOpen.value;
  userMenuOpen.value = false;
};

const handleLogout = () => {
  emit("logout");
  userMenuOpen.value = false;
};

const navigateTo = (path: string) => {
  router.push(path);
  mobileMenuOpen.value = false;
};
const goToRegister = () => {
  router.push({ name: "Register" });
};
const goToLogin = () => {
  router.push({ name: "Login" });
};
</script>

<template>
  <header :class="headerClasses">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex items-center gap-8">
          <router-link to="/" class="flex items-center gap-2 group">
            <div
              class="w-10 h-10 bg-linear-to-br from-primary-600 to-secondary-500 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow"
            >
              <svg
                class="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2.5"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <span
              class="text-2xl font-display font-bold bg-linear-to-r from-primary-600 to-secondary-500 bg-clip-text text-transparent"
            >
              CORA
            </span>
          </router-link>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-1">
            <router-link
              to="/courses"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              Mes Cours
            </router-link>
            <router-link
              to="/catalog"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              Catalogue
            </router-link>
            <router-link
              to="/exercises"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              Exercices
            </router-link>
            <router-link
              to="/progress"
              class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              Progression
            </router-link>
          </nav>
        </div>

        <!-- Right Actions -->
        <div class="flex items-center gap-3">
          <!-- Search (Desktop only) -->
          <div class="hidden lg:block relative">
            <input
              type="search"
              placeholder="Rechercher un cours..."
              class="w-64 pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <svg
              class="absolute left-3 top-2.5 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <!-- Notifications -->
          <div v-if="user" class="relative">
            <button
              @click="toggleNotifications"
              class="relative p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            >
              <svg
                class="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span
                v-if="unreadCount > 0"
                class="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
              >
                {{ unreadCount }}
              </span>
            </button>

            <!-- Notifications Dropdown -->
            <transition name="dropdown">
              <div
                v-if="notificationsOpen"
                class="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
              >
                <div class="px-4 py-3 border-b border-gray-200">
                  <h3 class="text-sm font-semibold text-gray-900">
                    Notifications
                  </h3>
                </div>
                <div class="max-h-96 overflow-y-auto">
                  <div
                    v-for="notif in notifications"
                    :key="notif.id"
                    :class="[
                      'px-4 py-3 hover:bg-gray-50 cursor-pointer transition-colors',
                      notif.unread ? 'bg-primary-50/50' : '',
                    ]"
                  >
                    <div class="flex items-start gap-3">
                      <div
                        :class="[
                          'w-2 h-2 rounded-full mt-2',
                          notif.unread ? 'bg-primary-600' : 'bg-gray-300',
                        ]"
                      ></div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900">
                          {{ notif.title }}
                        </p>
                        <p class="text-sm text-gray-600 truncate">
                          {{ notif.message }}
                        </p>
                        <p class="text-xs text-gray-400 mt-1">
                          Il y a {{ notif.time }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="px-4 py-2 border-t border-gray-200">
                  <button
                    class="text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Voir tout
                  </button>
                </div>
              </div>
            </transition>
          </div>

          <!-- User Menu / Auth Buttons -->
          <div v-if="user" class="relative">
            <button
              @click="toggleUserMenu"
              class="flex items-center gap-2 hover:bg-gray-100 rounded-lg p-1.5 pr-3 transition-colors"
            >
              <div
                class="w-9 h-9 bg-linear-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold text-sm"
              >
                {{ user.prenom.charAt(0) }}{{ user.nom.charAt(0) }}
              </div>
              <div class="hidden lg:block text-left">
                <p class="text-sm font-medium text-gray-900">
                  {{ user.prenom }} {{ user.nom }}
                </p>
                <p class="text-xs text-gray-500">{{ user.classe }}</p>
              </div>
              <svg
                class="w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- User Dropdown -->
            <transition name="dropdown">
              <div
                v-if="userMenuOpen"
                class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2"
              >
                <div class="px-4 py-3 border-b border-gray-200">
                  <p class="text-sm font-semibold text-gray-900">
                    {{ user.prenom }} {{ user.nom }}
                  </p>
                  <p class="text-xs text-gray-500">{{ user.email }}</p>
                </div>
                <router-link
                  to="/profile"
                  class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Mon profil
                </router-link>
                <router-link
                  to="/settings"
                  class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
                </router-link>
                <div class="border-t border-gray-200 my-2"></div>
                <button
                  @click="handleLogout"
                  class="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full"
                >
                  <svg
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
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
            </transition>
          </div>

          <!-- Auth Buttons (if not logged in) -->
          <div v-else class="hidden md:flex items-center gap-2">
            <AppButton variant="secondary" @click="goToLogin"
              >Se connecter</AppButton
            >
            <AppButton variant="primary" @click="goToRegister"
              >S'inscrire</AppButton
            >
          </div>

          <!-- Mobile Menu Button -->
          <button
            @click="toggleMobileMenu"
            class="md:hidden p-2 text-gray-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
          >
            <svg
              v-if="!mobileMenuOpen"
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              v-else
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition name="mobile-menu">
        <div
          v-if="mobileMenuOpen"
          class="md:hidden py-4 border-t border-gray-200"
        >
          <!-- Search Mobile -->
          <div class="px-2 mb-4">
            <input
              type="search"
              placeholder="Rechercher..."
              class="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <!-- Navigation Links -->
          <nav class="space-y-1 px-2">
            <a
              @click="navigateTo('/courses')"
              class="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg cursor-pointer"
            >
              Mes Cours
            </a>
            <a
              @click="navigateTo('/catalog')"
              class="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg cursor-pointer"
            >
              Catalogue
            </a>
            <a
              @click="navigateTo('/exercises')"
              class="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg cursor-pointer"
            >
              Exercices
            </a>
            <a
              @click="navigateTo('/progress')"
              class="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600 rounded-lg cursor-pointer"
            >
              Progression
            </a>
          </nav>

          <!-- Auth Buttons Mobile -->
          <div v-if="!user" class="mt-4 px-2 space-y-2">
            <router-link
              to="/login"
              class="block w-full px-4 py-2 text-center text-base font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Connexion
            </router-link>
            <router-link
              to="/register"
              class="block w-full px-4 py-2 text-center text-base font-medium text-white bg-primary-600 rounded-lg hover:bg-primary-700"
            >
              S'inscrire
            </router-link>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<style scoped>
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}

.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  max-height: 0;
}

.mobile-menu-enter-to,
.mobile-menu-leave-from {
  opacity: 1;
  max-height: 500px;
}
</style>
