<script setup lang="ts">
import { useForm } from "@/composables";
import { ref } from "vue";
import AppInput from "@components/common/AppInput.vue";
import AppAlert from "@components/common/AppAlert.vue";
import AppButton from "@components/common/AppButton.vue";
import type { RegisterRequest } from "@/types";
import { useAuthStore } from "@/stores";

const emit = defineEmits<{ success: []; login: []; home: [] }>();

const authStore = useAuthStore();
// Form State

const { values, errors, setValue, setErrors, submit, isSubmitting } =
  useForm<RegisterRequest>(
    {
      nom: "",
      prenom: "",
      classe: 0,
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
    },
  );

const handleRegister = async () => {
  generalError.value = null;

  await submit(async (formvalues) => {
    try {
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
  { id: "2", libelle: "Terminale A" },
  { id: "3", libelle: "Terminale C" },
  { id: "4", libelle: "Terminale D" },
]);
</script>

<template>
  <div
    class="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-h-screen"
  >
    <!-- Image à gauche - visible uniquement sur tablette et desktop -->
    <div
      class="hidden lg:block relative overflow-hidden bg-linear-to-br from-blue-600 to-indigo-700 rounded-2xl"
    >
      <!-- Image de fond -->
      <div
        class="absolute inset-0 bg-cover bg-center opacity-90"
        style="
          background-image: url(&quot;https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&quot;);
        "
      ></div>

      <!-- Overlay gradient -->
      <div
        class="absolute inset-0 bg-linear-to-br from-blue-600/80 to-indigo-700/80"
      ></div>

      <!-- Contenu par-dessus l'image -->
      <div
        class="relative h-full flex flex-col justify-center items-center p-8 text-white"
      >
        <div class="max-w-md text-center">
          <svg
            class="w-20 h-20 mx-auto mb-6 opacity-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.5"
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>

          <h3 class="text-3xl font-bold mb-4">
            Commencez votre voyage d'apprentissage
          </h3>
          <p class="text-blue-100 text-lg leading-relaxed">
            Rejoignez des milliers d'étudiants qui développent leurs compétences
            avec Cora
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

    <!-- Formulaire à droite -->
    <div
      class="w-full flex flex-col justify-center py-4 lg:py-0 overflow-y-auto lg:overflow-visible"
    >
      <!-- Tabs Login/Register -->
      <div class="flex justify-center mb-4">
        <div class="inline-flex bg-gray-100 rounded-full p-1">
          <button
            @click="emit('login')"
            class="px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 text-gray-600 hover:text-gray-800"
          >
            Connexion
          </button>
          <button
            class="px-6 py-2.5 text-sm font-medium rounded-full transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
          >
            Inscription
          </button>
        </div>
      </div>

      <!-- Message d'erreur général -->
      <AppAlert
        v-if="generalError"
        type="danger"
        dismissible
        @dismiss="generalError = null"
        class="mb-4"
      >
        {{ generalError }}
      </AppAlert>

      <!-- Formulaire -->
      <form @submit.prevent="handleRegister" class="space-y-3">
        <!-- Numéro de téléphone -->
        <AppInput
          :model-value="values.telephone"
          @update:model-value="setValue('telephone', String($event))"
          label="Numéro de téléphone"
          type="tel"
          placeholder="Entrez votre numéro"
          autocomplete="tel"
          :error="errors.telephone"
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
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </template>
        </AppInput>

        <!-- Nom et Prénom -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <AppInput
            :model-value="values.nom"
            @update:model-value="setValue('nom', String($event))"
            label="Nom"
            type="text"
            placeholder="Votre nom"
            autocomplete="family-name"
            :error="errors.nom"
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </template>
          </AppInput>

          <AppInput
            :model-value="values.prenom"
            @update:model-value="setValue('prenom', String($event))"
            label="Prénom"
            type="text"
            placeholder="Votre prénom"
            autocomplete="given-name"
            :error="errors.prenom"
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
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </template>
          </AppInput>
        </div>

        <!-- Classe -->
        <div>
          <label
            for="classe"
            class="block text-sm font-medium text-gray-700 mb-1.5"
          >
            Classe
          </label>
          <div class="relative">
            <div
              class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
            >
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
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <select
              id="classe"
              v-model="values.classe"
              class="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 bg-white appearance-none cursor-pointer"
              :class="{
                'border-red-500 focus:ring-red-500 bg-red-50': errors.classe,
              }"
            >
              <option value="" disabled>Choisir votre classe</option>
              <option
                v-for="classe in classes"
                :key="classe.id"
                :value="classe.id"
              >
                {{ classe.libelle }}
              </option>
            </select>
            <div
              class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
            >
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
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
          <p v-if="errors.classe" class="text-red-600 text-sm mt-1">
            {{ errors.classe }}
          </p>
        </div>

        <!-- Mot de passe -->
        <AppInput
          :model-value="values.password"
          @update:model-value="setValue('password', String($event))"
          label="Mot de passe"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••••"
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
              class="text-gray-400 hover:text-gray-600 transition-colors"
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

        <!-- Confirmation mot de passe -->
        <AppInput
          :model-value="values.password_confirmation"
          @update:model-value="
            setValue('password_confirmation', String($event))
          "
          label="Confirmer le mot de passe"
          :type="showPasswordConfirmation ? 'text' : 'password'"
          placeholder="••••••••••"
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
              tabindex="-1"
              class="text-gray-400 hover:text-gray-600 transition-colors"
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
                  d="M13.875 18.825A10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            </button>
          </template>
        </AppInput>

        <!-- Bouton de soumission -->
        <div class="pt-1">
          <AppButton
            type="submit"
            variant="primary"
            :loading="isSubmitting"
            :disabled="isSubmitting"
            class="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
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

        <!-- Lien vers connexion -->
        <p class="text-center text-sm text-gray-600 mt-3">
          Vous avez déjà un compte ?
          <button
            type="button"
            @click="emit('login')"
            class="text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            Se connecter
          </button>
        </p>
      </form>
    </div>
  </div>
</template>
