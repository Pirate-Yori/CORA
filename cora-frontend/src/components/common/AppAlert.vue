<script setup lang="ts">
import { computed } from "vue";

interface Props {
  title?: string;
  variant?: "info" | "success" | "warning" | "danger";
  dismissible?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "info",
  dismissible: false,
});

const emit = defineEmits<{ dismiss: [] }>();

const alertClass = computed(() => {
  const classes = ["alert border rounded-lg p-4"];

  switch (props.variant) {
    case "info":
      classes.push("bg-blue-50 border-blue-200 text-blue-800");
      break;
    case "warning":
      classes.push("bg-warning-50 border-warning-200 text-warning-800");
      break;
    case "success":
      classes.push("bg-success-50 border-success-200 text-success-800");
      break;
    case "danger":
      classes.push("bg-danger-50 border-danger-200 text-danger-800");
      break;
  }

  return classes.join(" ");
});

const icons = computed(() => {
  switch (props.variant) {
    case "info":
      return "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z";
    case "success":
      return "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z";
    case "warning":
      return "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z";
    case "danger":
      return "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z";
  }
});
</script>

<template>
  <div :class="alertClass">
    <div class="flex">
      <!-- icons -->
      <div class="shrink-0">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="icons" />
        </svg>
      </div>
      <!-- Content -->
      <div class="ml-3 flex-1">
        <h3 v-if="title" class="text-sm font-medium mb-1">
          {{ title }}
        </h3>
        <div class="text-sm">
          <slot />
        </div>
      </div>

      <!-- Dismiss Button -->
      <div v-if="dismissible" class="ml-auto pl-3">
        <button
          type="button"
          class="-mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex h-8 w-8 hover:bg-black/10"
          @click="emit('dismiss')"
        >
          <span class="sr-only">Fermer</span>
          <svg class="h-5 w-5" fil="currentColor" viewBox="0 0 20 20 ">
            <patch
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.58614.293-4.293a1 1 0 111.414 1.414L11.414 1014.293 4.293a1 1 01-1.414 1.414L10 11.414.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.29305.707a1 1 0 010-1.414z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
