<script setup lang="ts">
import { ref, computed } from 'vue'
import AppButton from './AppButton.vue'

interface AvatarUploadProps {
  currentPhoto?: string | null
  userName?: string
  editable?: boolean
  size?: 'sm' | 'md' | 'lg' | 'xl'
  maxSizeMB?: number
}

const props = withDefaults(defineProps<AvatarUploadProps>(), {
  currentPhoto: null,
  userName: '',
  editable: true,
  size: 'lg',
  maxSizeMB: 5
})

const emit = defineEmits<{
  'update:photo': [file: File, preview: string]
  'remove': []
  'error': [message: string]
}>()

const fileInput = ref<HTMLInputElement | null>(null)
const preview = ref<string | null>(null)
const isDragging = ref(false)
const isUploading = ref(false)

const displayPhoto = computed(() => {
  return preview.value || props.currentPhoto
})

const initials = computed(() => {
  if (!props.userName) return '?'
  const names = props.userName.split(' ')
  if (names.length >= 2) {
    return `${names[0].charAt(0)}${names[1].charAt(0)}`.toUpperCase()
  }
  return names[0].charAt(0).toUpperCase()
})

const sizeClasses = computed(() => {
  const sizes = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40'
  }
  return sizes[props.size]
})

const iconSizeClasses = computed(() => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  }
  return sizes[props.size]
})

const textSizeClasses = computed(() => {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  }
  return sizes[props.size]
})

const validateFile = (file: File): boolean => {
  // Check file type
  if (!file.type.startsWith('image/')) {
    emit('error', 'Le fichier doit être une image (JPG, PNG, GIF, etc.)')
    return false
  }

  // Check file size
  const maxSize = props.maxSizeMB * 1024 * 1024
  if (file.size > maxSize) {
    emit('error', `La taille de l'image ne doit pas dépasser ${props.maxSizeMB} Mo`)
    return false
  }

  return true
}

const processFile = (file: File) => {
  if (!validateFile(file)) return

  isUploading.value = true

  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target?.result as string
    preview.value = result
    emit('update:photo', file, result)
    isUploading.value = false
  }
  reader.onerror = () => {
    emit('error', 'Erreur lors de la lecture du fichier')
    isUploading.value = false
  }
  reader.readAsDataURL(file)
}

const handleClick = () => {
  if (props.editable) {
    fileInput.value?.click()
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    processFile(file)
  }
}

const handleDragOver = (event: DragEvent) => {
  if (!props.editable) return
  event.preventDefault()
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}

const handleDrop = (event: DragEvent) => {
  if (!props.editable) return
  event.preventDefault()
  isDragging.value = false

  const file = event.dataTransfer?.files[0]
  if (file) {
    processFile(file)
  }
}

const handleRemove = () => {
  preview.value = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  emit('remove')
}
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="relative">
      <!-- Avatar Container -->
      <div
        @click="handleClick"
        @dragover="handleDragOver"
        @dragleave="handleDragLeave"
        @drop="handleDrop"
        :class="[
          sizeClasses,
          'rounded-full overflow-hidden border-4 border-white shadow-lg transition-all duration-200',
          editable ? 'cursor-pointer' : '',
          editable && !displayPhoto ? 'border-dashed border-gray-300 hover:border-primary-400' : '',
          isDragging ? 'scale-105 border-primary-500' : '',
          isUploading ? 'opacity-50' : ''
        ]"
      >
        <!-- Photo -->
        <img
          v-if="displayPhoto"
          :src="displayPhoto"
          :alt="userName"
          class="w-full h-full object-cover"
        />

        <!-- Placeholder avec initiales -->
        <div
          v-else-if="!editable || userName"
          class="w-full h-full bg-linear-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold"
          :class="textSizeClasses"
        >
          {{ initials }}
        </div>

        <!-- Upload placeholder -->
        <div
          v-else
          class="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors"
        >
          <svg :class="iconSizeClasses" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span class="text-xs mt-1">Photo</span>
        </div>

        <!-- Loading overlay -->
        <div
          v-if="isUploading"
          class="absolute inset-0 bg-black/50 flex items-center justify-center"
        >
          <svg class="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </div>
      </div>

      <!-- Edit AppButton -->
      <button
        v-if="editable && !isUploading"
        @click="handleClick"
        type="button"
        class="absolute bottom-0 right-0 w-10 h-10 bg-primary-600 hover:bg-primary-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>

      <!-- File Input -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileChange"
      />
    </div>

    <!-- Remove AppButton -->
    <AppButton
      v-if="editable && displayPhoto && !isUploading"
      variant="ghost"
      size="sm"
      @click="handleRemove"
      class="mt-3 text-red-600 hover:text-red-700"
    >
      <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
      Supprimer la photo
    </AppButton>

    <!-- Helper Text -->
    <p v-if="editable && !displayPhoto" class="text-xs text-gray-500 text-center mt-3 max-w-xs">
      Cliquez ou glissez-déposez une image<br />
      JPG, PNG ou GIF (max {{ maxSizeMB }} Mo)
    </p>
  </div>
</template>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>