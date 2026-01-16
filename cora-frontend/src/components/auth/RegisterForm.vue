<script setup lang="ts">
import { useForm } from "@/composables";
import { ref } from "vue";
import AppInput from "@components/common/AppInput.vue";
import AppAlert from "@components/common/AppAlert.vue";
import AppButton from "@components/common/AppButton.vue";
import type { RegisterRequest } from "@/types";
import { useAuthStore } from "@/stores";

const emit = defineEmits<{ success: []; login: [] }>();

const authStore = useAuthStore();
// Form State

const { values, errors, setValue, setErrors, submit, isSubmitting } =
  useForm<RegisterRequest>(
    {
      nom: "",
      prenom: "",
      classe: "",
      telephone: "",
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
      telephone: [{ required: true, message: "Le telephone est obligatoire" }],
      classe: [{ required: true, message: "La classe est obligatoire" }],
      password: [
        { required: true, message: "Le mot de passe est obligatoire" },
        {
          min: 2,
          message: "Le mot de passe doit contenir au moins 8 caractères",
        },
        // {
        //   custom: (value) => {
        //     const hasUpperCase = /[A-Z]/.test(value);
        //     const hasLowerCase = /[a-z]/.test(value);
        //     const hasNumbers = /\d/.test(value);
        //     if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
        //       return "Le mot de passe doit contenir des majuscules, minuscules et chiffres";
        //     }
        //     return true;
        //   },
        // },
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
      // const registerData: RegisterRequest = {
      //   telephone: formvalues.telephone,
      //   nom: formvalues.nom,
      //   prenom: formvalues.prenom,
      //   classe:formvalues.classe,
      //   password: formvalues.password,
      //   password_confirmation: formvalues.password_confirmation,
      // };
      console.log(formvalues);
      await authStore.register(formvalues);
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
const classes = ref<Array<{ id: string; libelle: string }>>([
  { id: "1", libelle: "3ème" },
  { id: "2", libelle: "Terminale A1" },
  { id: "3", libelle: "Terminale A2" },
  { id: "4", libelle: "Terminale D" },
  { id: "5", libelle: "Terminale C" },
]);
</script>

<template>
  <!-- Layout principal : colonne sur mobile, ligne sur desktop -->
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- Partie GAUCHE : Image - UNIQUEMENT sur desktop -->
    <div class="hidden lg:block lg:w-1/2 relative overflow-hidden">
      <!-- Image pleine hauteur -->
      <div
        class="absolute inset-0 bg-cover bg-center lg:rounded-2xl"
        style="background-image: url('https://placehold.co/600x800')"
      ></div>

      <!-- Texte en bas à gauche (visible seulement sur desktop) -->
      <div class="absolute bottom-16 left-16 z-10">
        <h1 class="text-white text-4xl font-bold font-['Poppins'] mb-4">
          Lorem Ipsum is simply
        </h1>
        <p class="text-white text-2xl font-normal font-['Poppins']">
          Lorem Ipsum is simply
        </p>
      </div>
    </div>

    <!-- Partie DROITE : Contenu (formulaire + header) - visible partout -->
    <div
      class="w-full lg:w-1/2 bg-white flex items-center justify-center px-6 py-12 lg:px-16 lg:py-20"
    >
      <div class="max-w-md w-full mx-auto">
        <!-- Header : Welcome + Tabs centrés -->
        <div class="text-center mb-10">
          <p
            class="text-zinc-600 text-sm lg:text-base font-normal font-['Poppins'] mb-6"
          >
            Welcome to lorem..!
          </p>

          <!-- Boutons Login / Register -->
          <div class="inline-flex bg-teal-400/20 rounded-full p-1 mb-6 mx-auto">
            <button
              @click="emit('login')"
              class="px-8 py-3 text-sm lg:text-base font-medium font-['Poppins'] rounded-full transition-colors 'text-teal-600',"
            >
              Login
            </button>
            <button
              :class="[
                `px-8 py-3 text-sm lg:text-base font-medium font-['Poppins'] rounded-full transition-colors`,
                'bg-teal-400 text-white',
              ]"
            >
              Register
            </button>
          </div>

          <p
            class="text-zinc-600 text-sm lg:text-base font-normal font-['Poppins']"
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </p>
        </div>

        <AppAlert
          v-if="generalError"
          type="danger"
          dismissible
          @dismiss="generalError = null"
        >
          {{ generalError }}
        </AppAlert>
        <!-- Formulaire -->
        <form @submit.prevent="handleRegister" class="space-y-5">
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
            :model-value="values.nom"
            @update:model-value="setValue('nom', String($event))"
            label="Nom"
            type="text"
            placeholder="Entrer votre nom"
            autocomplete="family-name"
            :error="errors.nom"
          />

          <AppInput
            :model-value="values.prenom"
            @update:model-value="setValue('prenom', String($event))"
            label="Prénom"
            type="text"
            placeholder="Entrer votre prénom"
            autocomplete="given-name"
            :error="errors.prenom"
          />

          <!-- classe -->
          <select 
            class="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          v-model="values.classe">
            <option
              v-for="classe in classes"
              :key="classe.id"
              :value="classe.id"
            >
              {{ classe.libelle }}
            </option>
          </select>

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
            <!-- <template #append>
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
            </template> -->
          </AppInput>

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
            <!-- <template #append>
              <button
                type="button"
                @click="showPasswordConfirmation = !showPasswordConfirmation"
                tabindex="-1"
                class="text-gray-400 hover:text-gray-600"
              >
                <!-- Même icônes œil -
              </button>
            </template> -->
          </AppInput>

          <!-- Bouton soumission -->
          <div class="pt-6">
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
