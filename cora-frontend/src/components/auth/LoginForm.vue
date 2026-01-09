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

const { values, setErrors, submit, setValue, isSubmitting,errors } =
  useForm<LoginRequest>(
    {
      email: "",
      password: "",
    },
    {
      email: [
        { required: true, message: "L'email est obligatoire" },
        {
          email: true,
          message: "Email invalide",
        },
      ],
      password: [
        { required: true, message: "Le mot de passe est obligatoire" },
        {
          min: 6,
          message: "Le mot de passe doit contenir au moins 6 caractères",
        },
      ],
    }
  );

const generalError = ref<string | null>(null);
  const showPassword = ref(false)

const handleLogin = async () => {
  generalError.value = null;
  try {
    await submit(async (formvalues) => {
      await authStore.login(formvalues);
      emit("success");
    });
  } catch (error: any) {
    if (error.status === 422 && error.errors) {
      setErrors(error.errors);
    } else {
      generalError.value =
        error.message || "Identifiants invalides. Veuillez réessayer.";
      throw error;
    }
  }
};
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col lg:flex-row">
    <!-- Section Image - Background sur mobile,gauche sur desktop -->

    <div
      class="relative w-full lg:w-1/2 h-screen lg:h-screen order-2 lg:order-1"
    >
      <!-- Image en background pour mobile -->
      <div
        class="absolute inset-0 bg-cover bg-center lg:rounded-2xl"
        style="background-image: url('https://placehold.co/600x800')"
      >
        <!-- Overlay sombre pour mobile -->
        <div class="absolute inset-0 bg-black/40 lg:bg-transparent"></div>
      </div>

      <!-- Overlay text sur l'image -->
      <div
        class="absolute bottom-8 left-8 right-8 lg:bottom-16 lg:left-16 z-10"
      >
        <h1
          class="text-white text-2xl lg:text-4xl font-bold font-['Poppins'] mb-2 lg:mb-4"
        >
          Lorem Ipsum is simply
        </h1>
        <p class="text-white text-lg lg:text-2xl font-normal font-['Poppins']">
          Lorem Ipsum is simply
        </p>
      </div>
    </div>

    <!-- Section Formulaire - Overlay sur mobile, droite sur desktop -->
    <div
      class="w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center order-1 lg:order-2 absolute lg:relative inset-0 lg:inset-auto z-20 pointer-events-none lg:pointer-events-auto"
    >
      <div class="max-w-md mx-auto w-full pointer-events-auto">
        <AppAlert
          v-if="generalError"
          type="danger"
          dismissible
          @dismiss="generalError = null"
        >
          {{ generalError }}
        </AppAlert>

        <!-- Formulaire -->
        <form @submit.prevent="handleLogin" class="space-y-4 lg:space-y-6">
          <!-- Email -->

          <AppInput
            :model-value="values.email"
            @update:model-value="setValue('email', String($event))"
            label="Email Address"
            type="email"
            placeholder="Enter your Email Address"
            autocomplete="email"
            :error="errors.email"
          />
          <!-- password Field -->
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
                class="text-gray-400 hover:text-gray-600 focus:outline-none"
                tabindex="-1"
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

          <!-- Bouton Login -->
          <div
            class="w-full lg:w-56 h-12 lg:mt-8 lg:ml-auto lg:block rounded-full"
          >
            <AppButton
              type="submit"
              variant="primary"
              :loading="isSubmitting"
              :disabled="isSubmitting"
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