<script setup lang="ts">
import { useForm } from "@/composables";
import type { LoginRequest } from "@/types";
import { useAuthStore } from "@/stores";
import { ref } from "vue";
import AppAlert from "../common/AppAlert.vue";
import AppInput from "../common/AppInput.vue";
import AppButton from "../common/AppButton.vue";

const emit = defineEmits<{ success: []; register: [] }>();

const authStore = useAuthStore();

const { values, setErrors, submit, setValue, isSubmitting, errors } =
  useForm<LoginRequest>(
    {
      telephone: "",
      password: "",
    },
    {
      telephone: [{ required: true, message: "Le telephone est obligatoire" }],
      password: [
        { required: true, message: "Le mot de passe est obligatoire" },
        {
          min: 2,
          message: "Le mot de passe doit contenir au moins 6 caractères",
        },
      ],
    }
  );

const generalError = ref<string | null>(null);
const showPassword = ref(false);

const handleLogin = async () => {
  generalError.value = null;

  await submit(async (formvalues) => {
    try {
      await authStore.login(formvalues);
      emit("success");
    } catch (error: any) {
      if (error.status === 422 && error.errors) {
        setErrors(error.errors);
      } else {
        generalError.value =
          error.message || "Identifiants invalides. Veuillez réessayer.";
      }
      throw error;
    }
  });
};
</script>

<template>
  <!-- Layout principal : colonne sur mobile, ligne sur desktop -->
  <div class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-h-screen">
    <!-- Partie GAUCHE : Image - UNIQUEMENT sur desktop -->
    <div class="hidden lg:block relative overflow-hidden bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl">
       <!-- Image de fond -->
      <div 
        class="absolute inset-0 bg-cover bg-center opacity-90"
        style="background-image: url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80')"
      ></div>

     <!-- Overlay gradient -->
      <div class="absolute inset-0 bg-linear-to-br from-blue-600/80 to-indigo-700/80"></div>
      
      <!-- Contenu par-dessus l'image -->
      <div class="relative h-full flex flex-col justify-center items-center p-8 text-white">
        <div class="max-w-md text-center">
          <svg class="w-20 h-20 mx-auto mb-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          
          <h3 class="text-3xl font-bold mb-4">
            Commencez votre voyage d'apprentissage
          </h3>
          <p class="text-blue-100 text-lg leading-relaxed">
            Rejoignez des milliers d'étudiants qui développent leurs compétences avec Cora
          </p>
          
          <!-- Statistiques -->
          <div class="grid grid-cols-2 gap-6 mt-8">
            <div class="text-center">
              <div class="text-3xl font-bold">5000+</div>
              <div class="text-blue-200 text-sm mt-1">Étudiants actifs</div>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold">200+</div>
              <div class="text-blue-200 text-sm mt-1">Cours disponibles</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Partie DROITE : Contenu (formulaire + header) - visible partout -->
    <div
      class="w-full flex flex-col justify-center py-4 lg:py-0 overflow-y-auto lg:overflow-visible"
    >
    <div class="flex justify-center mb-4">
      <div class="inline-flex bg-gray-100 rounded-full p-1">
        <button
        class="px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-md"
          
        >
          Connexion
        </button>
        <button
        @click="emit('register')"
          class="px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 text-gray-600 hover:text-gray-800"
        >
          Inscription
        </button>
      </div>
    </div>
      <div class="max-w-md w-full mx-auto">
        <AppAlert
          v-if="generalError"
          type="danger"
          dismissible
          @dismiss="generalError = null"
        >
          {{ generalError }}
        </AppAlert>
        <!-- Formulaire -->
        <form @submit.prevent="handleLogin" class="space-y-5">
          <AppInput
            :model-value="values.telephone"
            @update:model-value="setValue('telephone', String($event))"
            label="Numéro de téléphone"
            type="tel"
            placeholder="Entrer votre numéro de téléphone"
            autocomplete="tel"
            :error="errors.telephone"
          />
          <AppInput
            :model-value="values.password"
            @update:model-value="setValue('password', String($event))"
            label="Mot de passe"
            :type="showPassword ? 'text' : 'password'"
            placeholder="**********"
            autocomplete="new-password"
            :error="errors.password"
          >
            <template #prepend>
              <svg
                class="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </template>
            <template #append>
              <button
                type="button"
                @click="showPassword = !showPassword"
                tabindex="-1"
                class="text-gray-400 hover:text-gray-600"
              >
                <svg
                  v-if="!showPassword"
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  v-else
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </template>
          </AppInput>
          <!-- Bouton soumission -->
          <div class="pt-6">
            <AppButton
              type="submit"
              variant="primary"
              :loading="isSubmitting"
              :disabled="isSubmitting"
              class="w-full"
            >
              <template v-if="!isSubmitting">
                <svg
                  class="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                  />
                </svg>
                Se connecter
              </template>
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
