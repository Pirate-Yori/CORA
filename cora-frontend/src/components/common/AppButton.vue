<!-- src/components/common/AppButton.vue -->
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'warning' | 'outline' | 'ghost'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
  fullwidth?: boolean
  icon?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  disabled: false,
  loading: false,
  type: 'button',
  fullwidth: false,
  icon: false,
})

const emit = defineEmits<{ click: [event: MouseEvent] }>()

const buttonClass = computed(() => {
  const classes = [
    'inline-flex items-center justify-center font-medium transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed',
    'rounded-lg',
  ]

  // Size classes
  const sizeClasses = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
    xl: 'px-8 py-4 text-lg',
  }
  classes.push(sizeClasses[props.size])

  // Icon button
  if (props.icon) {
    const iconSizes = {
      xs: 'w-6 h-6 p-1',
      sm: 'w-8 h-8 p-1.5',
      md: 'w-10 h-10 p-2',
      lg: 'w-12 h-12 p-2.5',
      xl: 'w-14 h-14 p-3',
    }
    classes.push(iconSizes[props.size])
  }

  // Fullwidth
  if (props.fullwidth) {
    classes.push('w-full')
  }

  // Disabled or loading state
  if (props.disabled || props.loading) {
    classes.push('opacity-60 cursor-not-allowed')
  }

  return classes.join(' ')
})

const variantClasses = computed(() => {
  const variants = {
    primary:
      'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800 focus:ring-primary-500 shadow-sm',
    secondary:
      'bg-secondary-100 text-secondary-900 hover:bg-secondary-200 active:bg-secondary-300 focus:ring-secondary-500',
    success:
      'bg-success-600 text-white hover:bg-success-700 active:bg-success-800 focus:ring-success-500 shadow-sm',
    danger:
      'bg-danger-600 text-white hover:bg-danger-700 active:bg-danger-800 focus:ring-danger-500 shadow-sm',
    warning:
      'bg-warning-600 text-white hover:bg-warning-700 active:bg-warning-800 focus:ring-warning-500 shadow-sm',
    outline:
      'border-2 border-primary-600 text-primary-600 bg-transparent hover:bg-primary-50 active:bg-primary-100 focus:ring-primary-500',
    ghost:
      'text-gray-700 bg-transparent hover:bg-gray-100 active:bg-gray-200 focus:ring-gray-400',
  }
  return variants[props.variant]
})

const handleClick = (event: MouseEvent) => {
  if (!props.disabled && !props.loading) {
    emit('click', event)
  }
}
</script>

<template>
  <button
    :type="type"
    :class="[buttonClass, variantClasses]"
    :disabled="disabled || loading"
    @click="handleClick"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <!-- Content -->
    <slot />
  </button>
</template>