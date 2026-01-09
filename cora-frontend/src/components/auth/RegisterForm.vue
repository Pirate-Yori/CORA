<script setup lang="ts">
import { useForm } from "@/composables";
import { ref } from "vue";
import AppInput from "@components/common/AppInput.vue";
import AppAlert from "@components/common/AppAlert.vue";
import AppButton from "@components/common/AppButton.vue";
import type { RegisterRequest } from "@/types";
import { useAuthStore } from "@/stores";

const emit = defineEmits<{ success: []; login: [] }>();

const activeTab = ref<"login" | "register">("register");

const authStore = useAuthStore();
// Form State
interface RegisterFormData {
  nom: string;
  prenom: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const { values, errors, setValue, setErrors, submit, isSubmitting } =
  useForm<RegisterFormData>(
    {
      nom: "",
      prenom: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    {
      nom: [
        { required: true, message: "Le prénom est obligatoir" },
        { min: 2, message: "Le prénom doit contenir au moins 3 caractères" },
      ],
      prenom: [
        { required: true, message: "Le nom est obligatoire" },
        { min: 2, message: "Le nom doit contenir au moins 2 caractères" },
      ],
      email: [
        { required: true, message: "L'email est obligatoire" },
        { email: true, message: "Email invalide" },
      ],
      password: [
        { required: true, message: "Le mot de passe est obligatoire" },
        {
          min: 8,
          message: "Le mot de passe doit contenir au moins 8 caractères",
        },
        {
          custom: (value) => {
            const hasUpperCase = /[A-Z]/.test(value);
            const hasLowerCase = /[a-z]/.test(value);
            const hasNumbers = /\d/.test(value);
            if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
              return "Le mot de passe doit contenir des majuscules, minuscules et chiffres";
            }
            return true;
          },
        },
      ],
      password_confirmation: [
        { required: true, message: "La confirmation est obligatoire" },
        {
          custom: (value) => {
            if (value !== values.password) {
              return "Les mots de passe ne correspondent pas";
            }
            return true;
          },
        },
      ],
    }
  );

const handleRegister = async () => {
  generalError.value = null;

  await submit(async (formvalues) => {
    try {
      const registerData: RegisterRequest = {
        email: formvalues.email,
        nom: formvalues.nom,
        prenom: formvalues.prenom,
        password: formvalues.password,
        password_confirmation: formvalues.password_confirmation,
      };
      console.log(registerData);
      authStore.register(registerData);
      emit("success");
    } catch (error: any) {
      if (error.status == 422 && error.errors) setErrors(error.errors);
      else {
        generalError.value =
          error.message || "Erreur lors de l'inscription. Veuillez réessayer.";
        throw error;
      }
    }
  });
};

const showPassword = ref(false);
const showPasswordConfirmation = ref(false);
const generalError = ref<string | null>(null);
</script>
<template>
   <!-- Header -->
    <div class="text-center mb-12 lg:mb-12">
      <p
        class="text-white lg:text-black text-sm lg:text-base font-normal font-['Poppins'] mb-6 lg:mb-8"
      >
        Welcome to lorem..!
      </p>

      <!-- Boutons Login/Register -->
      <!-- <div class="flex bg-teal-400/60 rounded-full p-1 mb-6 lg:mb-8">
        <button
          @click="activeTab = 'login'"
          :class="[
            'flex-1 py-2 lg:py-3 text-white text-sm lg:text-base font-medium font-[\'Poppins\'] rounded-full transition-colors',
            activeTab === 'login' ? 'bg-teal-400' : '',
          ]"
        >
          Login
        </button>
        <button
          @click="activeTab = 'register'"
          :class="[
            'flex-1 py-2 lg:py-3 text-white text-sm lg:text-base font-medium font-[\'Poppins\'] rounded-full transition-colors',
            activeTab === 'register' ? 'bg-teal-400' : '',
          ]"
        >
          Register
        </button>
      </div> -->

      <p
        class="text-white lg:text-zinc-600 text-sm lg:text-base font-normal font-['Poppins']"
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </p>
    </div>
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
      class="absolute w-full lg:w-1/2 p-6 lg:p-12 flex flex-col justify-center order-1 lg:order-2  lg:relative inset-0 lg:inset-auto z-20 pointer-events-none lg:pointer-events-auto"
    >
   
      <div class="max-w-md mx-auto w-full pointer-events-auto">

        <!-- Formulaire -->
        <form @submit.prevent="handleRegister" class="space-y-4 lg:space-y-6">
          <!-- Email -->

          <AppInput
            :model-value="values.email"
            @update:model-value="setValue('email', String($event))"
            label="Email Address"
            type="email"
            placeholder="Enter your Email Address"
            autocomplete="email"
            :error="errors.email"
            class="bg-white text-black placeholder:text-neutral-400 font-light font-['Poppins'] rounded-full"
          />
          <!-- User name -->
          <AppInput
            :model-value="values.nom"
            @update:model-value="setValue('nom', String($event))"
            label="User name"
            type="text"
            placeholder="Enter your User name"
            autocomplete="given-name"
            :error="errors.nom"
          />
          <!-- prenom Field -->
          <AppInput
            :model-value="values.prenom"
            @update:model-value="setValue('prenom', String($event))"
            label="Prenom"
            type="text"
            placeholder="Doe"
            autocomplete="family-name"
            :error="errors.prenom"
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
          <!-- password confi Field -->
          <AppInput
            :model-value="values.password_confirmation"
            @update:model-value="
              setValue('password_confirmation', String($event))
            "
            label="Confirmer le mot de passe"
            :type="showPasswordConfirmation ? 'text' : 'password'"
            placeholder="**********"
            autocomplete="new-password"
            :error="errors.password_confirmation"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </template>
            <template #append>
              <button
                type="button"
                @click="showPasswordConfirmation = !showPasswordConfirmation"
                class="text-gray-400 hover:text-gray-600 focus:outline-none"
                tabindex="-1"
              >
                <svg
                  v-if="!showPasswordConfirmation"
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

          <!-- Bouton Register -->
           <div class="w-full lg:w-56 h-12 mt-6 lg:mt-8 lg:ml-auto lg:block">
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
                  Créer mon compte
                </template>
              </AppButton>
           </div>
          
        </form>
      </div>
    </div>
  </div>
</template>
