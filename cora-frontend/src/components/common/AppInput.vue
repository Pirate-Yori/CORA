<!-- src/components/common/AppInput.vue -->
<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: string | number
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search' | 'date'
  placeholder?: string
  label?: string
  error?: string
  hint?: string
  autocomplete?: string
  disabled?: boolean
  required?: boolean
  readonly?: boolean
  maxlength?: number
  min?: number
  max?: number
  step?: number
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  required: false,
  readonly: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
  blur: [event: FocusEvent]
  focus: [event: FocusEvent]
}>()

const hasError = computed(() => !!props.error)
const hasPrepend = computed(() => !!slots.prepend)
const hasAppend = computed(() => !!slots.append)

const slots = defineSlots<{
  prepend?: () => unknown
  append?: () => unknown
}>()

const inputClass = computed(() => {
  const classes = [
    'w-full px-4 py-2.5 border rounded-lg transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:border-transparent',
    'text-gray-900 placeholder-gray-400',
  ]

  if (hasError.value) {
    classes.push('border-danger-500 focus:ring-danger-500 bg-danger-50')
  } else {
    classes.push('border-gray-300 focus:ring-primary-500 focus:border-primary-500 bg-white')
  }

  if (props.disabled) {
    classes.push('bg-gray-100 cursor-not-allowed opacity-60')
  }

  if (props.readonly) {
    classes.push('bg-gray-50 cursor-default')
  }

  // Adjust padding for prepend/append
  if (hasPrepend.value) {
    classes.push('pl-11')
  }
  if (hasAppend.value) {
    classes.push('pr-11')
  }

  return classes.join(' ')
})

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', props.type === 'number' ? Number(target.value) : target.value)
}
</script>

<template>
  <div class="w-full">
    <!-- Label -->
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-1.5">
      {{ label }}
      <span v-if="required" class="text-danger-600 ml-0.5">*</span>
    </label>

    <!-- Input Container -->
    <div class="relative">
      <!-- Prepend Slot -->
      <div
        v-if="hasPrepend"
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <slot name="prepend" />
      </div>

      <!-- Input -->
      <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :autocomplete="autocomplete"
        :maxlength="maxlength"
        :min="min"
        :max="max"
        :step="step"
        :class="inputClass"
        :aria-invalid="hasError"
        :aria-describedby="error ? 'error-message' : hint ? 'hint-message' : undefined"
        @input="handleInput"
        @blur="emit('blur', $event)"
        @focus="emit('focus', $event)"
      />

      <!-- Append Slot -->
      <div v-if="hasAppend" class="absolute inset-y-0 right-0 pr-3 flex items-center">
        <slot name="append" />
      </div>
    </div>

    <!-- Hint Message -->
    <p v-if="hint && !error" id="hint-message" class="mt-1.5 text-sm text-gray-500">
      {{ hint }}
    </p>

    <!-- Error message -->
    <p
      v-if="error"
      id="error-message"
      class="mt-1.5 text-sm text-danger-600 flex items-center gap-1"
    >
      <svg class="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fill-rule="evenodd"
          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
          clip-rule="evenodd"
        />
      </svg>
      {{ error }}
    </p>
  </div>
</template>
