<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: number;
  subItems?: MenuItem[];
}

interface SidebarProps {
  collapsed?: boolean;
}

const props = withDefaults(defineProps<SidebarProps>(), {
  collapsed: false,
});

const emit = defineEmits<{
  "update:collapsed": [value: boolean];
}>();

const route = useRoute();
const router = useRouter();
const expandedItems = ref<string[]>([]);

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Tableau de bord",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    path: "Dashboard",
  },
  {
    id: "courses",
    label: "Mes Cours",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    path: "/courses",
    badge: 3,
  },
  {
    id: "catalog",
    label: "Catalogue",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
    path: "Catalog",
  },
  {
    id: "exercices",
    label: "Exercices",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
    path: "Exercices",
    subItems: [
      {
        id: "exercices-todo",
        label: "À faire",
        icon: "",
        path: "ExreciceAFaire",
        badge: 5,
      },
      {
        id: "exercices-completed",
        label: "Terminé",
        icon: "",
        path: "ExreciceTermine",
      },
      {
        id: "exercices-review",
        label: "À réviser",
        icon: "",
        path: "ExreciceAFaire",
        badge: 2,
      },
    ],
  },
  {
    id: "progress",
    label: "Ma Progression",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    path: "/progress",
  },
  {
    id: "calendar",
    label: "Calendrier",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
    path: "Catalog",
  },
  {
    id: "messages",
    label: "Messages",
    icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z",
    path: "/messages",
    badge: 12,
  },
];
const bottomMenuItems: MenuItem[] = [
  {
    id: "settings",
    label: "Parametres",
    icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z",
    path: "Settings",
  },
  {
    id: "help",
    label: "Aide & Support",
    icon: "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0",
    path: "Help",
  },
];

const isActive = (item: MenuItem): boolean => {
  return route.path === item.path || route.path.startsWith(item.path + "/");
};
const toggleExpanded = (itemId: string) => {
  const index = expandedItems.value.indexOf(itemId);
  if (index > -1) {
    expandedItems.value.splice(index, 1);
  } else {
    expandedItems.value.push(itemId);
  }
};
const isExpanded = (itemId: string): boolean => {
  return expandedItems.value.includes(itemId);
};

const navigateTo = (path: string) => {
  router.push(path);
};
const toggleCollapse = () => {
  emit("update:collapsed", !props.collapsed);
};
</script>
<template>
  <aside
    :class="['fixed left-0 top-16 bottom-0 bg-white border-r border-gray-200 transition-all duration-300 z-40 hidden lg:block ' collapsed ? 'w-20':'w-64']"
  >
    <div class="flex flex-col h-full">
      <!-- Main Navigation -->
      <nav class="flex-1 overflow-y-auto py-4 px-4 space-y-1">
        <div v-for="item in menuItems" :key="item.id">
          <!-- Main Menu Item -->
          <div>
            <button
              @click="
                item.subItems ? toggleExpanded(item.id) : navigateTo(item.path)
              "
              :class="[
                'w-full flex items-center gap-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                isActive(item)
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900',
              ]"
            >
              <svg
                class="w-5 h-5 shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  :d="item.icon"
                />
              </svg>
              <span v-if="!collapsed" class="flex-1 text-left">{{
                item.label
              }}</span>

              <span
                v-if="!collapsed && item.badge"
                class="px-2 py-0.5 text-xs font-semibold bg-primary-100 text-primary-700 rounded-full"
              >
                {{ item.badge }}
              </span>

              <svg
                v-if="!collapsed && item.subItems"
                :class="[
                  'w-4 h-4 transition-transform',
                  isExpanded(item.id) ? 'rotate-180' : '',
                ]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 91-7 7-7-7"
                />
              </svg>
            </button>

            <!-- Sub Items -->
            <transition name="submenu">
              <div
                v-if="!collapsed && item.subItems && isExpanded(item.id)"
                class="ml-8 mt-1 space-y-1"
              >
                <button
                  v-for="subItem in item.subItems"
                  @click="navigateTo(subItem.path)"
                  :key="subItem.id"
                  :class="['w-full flex items-center justify-between px-3 py-3 rounded-lg text-sm transition-colors' isActive(subItem) ? 'bg-primary-50 text-primary-700 font-medium' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900']"
                >
                  <span>{{ subItem.label }}</span>
                  <span
                    class="px-2 py-0.5 text-xs font-semibold bg-primary-100 text-primary-700 rounded-full"
                  >
                    {{ subItem.badge }}
                  </span>
                </button>
              </div>
            </transition>
          </div>

          <!-- Badge indictor when collapsed -->
          <div class="flex justify-center" v-if="collapsed && item.badge">
            <span class="w-2 h-2 bg-primary-600 rounded-full"></span>
          </div>
        </div>
      </nav>

      <!-- Bottom Menu Items -->
      <div class="border-t border-gray-200 py-4 px-4 space-y-1">
        <button
          v-for="item in bottomMenuItems"
          :key="item.id"
          @click="navigateTo(item.path)"
          :class="['w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors' isActive(item) ? 'bg-primary-50 text-pink-700' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900']"
        >
          <svg
            class="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              :d="item.icon"
            />
          </svg>
          <span v-if="!collapsed">{{ item.label }}</span>
        </button>
      </div>

      <!-- collapsed toggle -->
      <div class="border-t border-gray-200 p-3">
        <button
          @click="toggleCollapse"
          class="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
        >
          <svg
            :class="[
              'w-5 h-5 transition-transform',
              collapsed ? 'rotate-180' : '',
            ]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span v-if="!collapsed">Réduire</span>
        </button>
      </div>
    </div>
  </aside>
</template>

<style scoped>
.submenu-enter-active,
.submenu-leave-active {
  transition: all 0.3s ease;
}

.submenu-enter-from,
.submenu-leave-to {
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}

.submenu-enter-to,
.submenu-leave-from {
  opacity: 1;
  max-height: 200px;
}
</style>
