<script lang="ts" setup>
import AppButton from "@/components/common/AppButton.vue";
import AppCard from "@/components/common/AppCard.vue";
import AvatarUpload from "@/components/common/AvatarUpload.vue";
import { useForm } from "@/composables";
import type { User } from "@/types";
import { ref } from "vue";

interface Profile {
  nom: string;
  prenom: string;
  full_name: string;
  email: string;
  classe: string;
  telephone: string;
  dateNaissance?: string;
  etablissement?: string;
  bio?: string;
  derniere_connexion?: string;
  photo_profil?: string;
  est_actif?: boolean;
}
// État initial de l'utilisateur
const user = ref<User>({
  id: 1,
  nom: "Dupont",
  prenom: "Marie",
  full_name: "Dupont Marie",
  email: "marie.dupont@ecole.fr",
  telephone: "06 12 34 56 78",
  dateNaissance: "2006-03-15",
  classe: "Terminale S",
  etablissement: "Lycée Victor Hugo",
  bio: "Passionnée de mathématiques et de sciences. Mon objectif est de devenir ingénieure en intelligence artificielle.",
  photo_profil: undefined,
  created_at: "01/12/2027",
  updated_at: "01/12/2027",
});

const { values, setValue, errors, submit, isSubmitting } = useForm<Profile>(
  {
    prenom: "",
    nom: "",
    full_name: "",
    email: "",
    classe: "",
    telephone: "",
    dateNaissance: "",
    etablissement: "",
    bio: "",
    derniere_connexion: "",
    photo_profil: "",
    est_actif: true,
  },
  {
    prenom: [
      { required: true, message: "Le prénom est requis" },
      { min: 2, message: "Au moins 2 caractères" },
    ],
    nom: [
      {
        required: true,
        message: "Le nom est requis",
      },
      { min: 2, message: "Au moins 2 caractères" },
    ],
    email: [
      {
        required: true,
        message: "Email est obligatoire",
      },
      { email: true },
    ],
  }
);

const isEditing = ref(false);
const uploadError = ref("");
const showPasswordModal = ref(false);

// Stats
const userStats = [
  {
    label: "Cours suivis",
    value: "8",
    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
    color: "primary",
  },
  {
    label: "Exercices terminés",
    value: "142",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "green",
  },
  {
    label: "Heures d'étude",
    value: "87h",
    icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
    color: "secondary",
  },
  {
    label: "Badges obtenus",
    value: "12",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
    color: "purple",
  },
];

const handleEdit = () => {
  isEditing.value = true;
};

const handleCancel = () => {
  isEditing.value = false;
};
const handlePhotoUpdate = (file: File, preview: string) => {
  uploadError.value = "";
  setValue("photo_profil", preview);
  console.log("Photo updated:", file.name);
};

const handlePhotoRemove = () => {
  setValue("photo_profil", "");
  uploadError.value = "";
};

const handlePhotoError = (message: string) => {
  uploadError.value = message;
};
</script>

<template>
  <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <!-- Page Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-display font-bold text-gray-900 mb-2">
        Mon profil
      </h1>
      <p class="text-gray-600">
        Gérez vos informations personnelles et vos préférences
      </p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div
        v-for="stat in userStats"
        :key="stat.label"
        class="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center gap-3">
          <div
            :class="`w-10 h-10 bg-${stat.color}-100 rounded-lg flex items-center justify-center shrink-0`"
          >
            <svg
              :class="`w-5 h-5 text-${stat.color}-600`"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                :d="stat.icon"
              />
            </svg>
          </div>
          <div>
            <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
            <p class="text-xs text-gray-600">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid lg:grid-cols-3 gap-">
      <div class="lg:cols-span-1">
        <AppCard variant="elevated" padding="lg">
          <div class="mb-6">
            <AvatarUpload
              :current-photo="values.photo_profil"
              :user-name="`${values.prenom} ${values.nom}`"
              :editable="isEditing"
              size="xl"
              @update:photo="handlePhotoUpdate"
              @remove="handlePhotoRemove"
              @error="handlePhotoError"
            />

            <div class="text-center mt-4">
              <h2 class="text-xl font-bold text-gray-900">
                {{ values.prenom }} {{ values.nom }}
              </h2>
              <p class="text-sm text-gray-600">{{ values.classe }}</p>
            </div>

            <p v-if="uploadError" class="text-xs text-red-600 text-center mt-2">
              {{ uploadError }}
            </p>
          </div>

          <!-- Quick Info -->
          <div class="space-y-3 pt-6 border-t border-gray-200">
            <div class="flex items-center gap-3 text-sm">
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
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span class="text-gray-600 truncate">{{ values.email }}</span>
            </div>

            <div
              v-if="values.telephone"
              class="flex items-center gap-3 text-sm"
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
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span class="text-gray-600">{{ values.telephone }}</span>
            </div>

            <div
              v-if="values.etablissement"
              class="flex items-center gap-3 text-sm"
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
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
              <span class="text-gray-600 truncate">{{
                values.etablissement
              }}</span>
            </div>
          </div>

          <!-- Actions -->
          <div v-if="!isEditing" class="mt-6 space-y-2">
            <AppButton @click="handleEdit" variant="primary" :full="true">
              Modifier le profil
            </AppButton>
            <AppButton
              @click="showPasswordModal = true"
              variant="outline"
              :full="true"
            >
              Changer le mot de passe
            </AppButton>
          </div>
        </AppCard>
      </div>
    </div>
  </div>
</template>
<style scoped>
@keyframes modal {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(-20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-modal {
  animation: modal 0.2s ease-out;
}
</style>
