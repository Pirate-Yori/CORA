<script setup lang="ts">
import { computed } from "vue";

export interface CardProps {
  variant?: "default" | "bordered" | "elevated" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
  hoverable?: boolean;
  clickable?: boolean;
}

const props = withDefaults(defineProps<CardProps>(), {
  variant: "default",
  padding: "md",
  hoverable: false,
  clickable: false,
});

const emit = defineEmits<{
  click: [event: MouseEvent];
}>();

const cardClasses = computed(() => {
  const baseClasses = "rounded-xl bg-white transition-all duration-200";
  const variants = {
    default: "border border-gray-200 shadow-sm",
    bordered: "border-2 border-gray-300",
    elevated: "shadow-lg",
    flat: "bg-gray-50",
  };

  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  const interactionClasses = [];
  if (props.hoverable || props.clickable) {
    interactionClasses.push("hover:shadow-md hover:-translate-y-0.5");
  }
  if (props.clickable) {
    interactionClasses.push("cursor-pointer active:scale-[0.98]");
  }

  return `${baseClasses} ${variants[props.variant]} ${
    paddings[props.padding]
  } ${interactionClasses.join("")}}`;
});

const handleClick = (event: MouseEvent) => {
  if (props.clickable) {
    emit("click", event);
  }
};
</script>

<template>
  <div :class="cardClasses" @click="handleClick">
    <div v-if="$slots.header" class="mb-4 pb-4 border-b border-gray-200">
      <slot name="header" />
    </div>

    <div>
      <slot />
    </div>
    <div v-if="$slots.footer" class="mt-4 pt-4 border-t border-gray-200">
      <slot name="footer" />
    </div>
  </div>
</template>
