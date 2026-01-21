<script lang="ts" setup>
import AppButton from "@/components/common/AppButton.vue";
import AppCard from "@/components/common/AppCard.vue";
import AppInput from "@/components/common/AppInput.vue";
import AvatarUpload from "@/components/common/AvatarUpload.vue";
import { useForm } from "@/composables";
import { useAuthStore } from "@/stores";
import type { ChangePasswordRequest, UpdateUserRequest } from "@/types";
import { computed, onMounted, ref, watch } from "vue";

const authStore = useAuthStore();

const { values, setValue, errors, submit, isSubmitting } = useForm<UpdateUserRequest>(
  {
    nom: "",
    prenom: "",
    email: "",
    classe: "",
    telephone: "",
    dateNaissance: "",
    bio: "",
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
        message: "Email est obligatoire",
      },
      { email: true },
    ],
  }
);

// Password form
const passwordData = ref<ChangePasswordRequest>({
  old_password: "",
  new_password: "",
  confirmPassword: "",
});

const passwordErrors = ref<Record<string, string>>({});
const isChangingPassword = ref(false);

const isEditing = ref(false);
const uploadError = ref("");
const showPasswordModal = ref(false);
const activeTab = ref("profile");

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

const handleUpdateUser = async ()=>{
  await submit(async (formvalues)=>{
    try{
      const { photo_profil, classe, ...dataToUpdate } = formvalues;
      await authStore.updateUserData(dataToUpdate)
      
    }catch(error){
      console.error("erreur lors de l'update",error)
    }finally {
      isEditing.value = false
    }

  })
}

const handleCancel = () => {
  isEditing.value = false;
};
const handlePhotoUpdate = async (file: File, preview: string) => {
  uploadError.value = "";
  setValue("photo_profil", preview);
  console.log("Photo updated:", file.name);
  try{
    //Upload
    const photoUrl = await authStore.uploadPhoto(file)
    //Remplacer par url du server
    setValue('photo_profil',photoUrl)
  }catch(error:any){
    uploadError.value = error.message
  }
};

const handlePhotoRemove = () => {
  setValue("photo_profil", "");
  uploadError.value = "";
};

const handlePhotoError = (message: string) => {
  uploadError.value = message;
};

const handleDeleteAccount = () => {
  if (
    confirm(
      "⚠️ Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible."
    )
  ) {
    console.log("Suppression du compte...");
  }
};

const validatePasswordChange = (): boolean => {
  passwordErrors.value = {};

  if (!passwordData.value.old_password) {
    passwordErrors.value.old_password = "Mot de passe actuel requis";
  }

  if (passwordData.value.new_password.length < 8) {
    passwordErrors.value.new_password = "Au moins 8 caractères requis";
  }

  if (passwordData.value.new_password !== passwordData.value.confirmPassword) {
    passwordErrors.value.confirmPassword =
      "Les mots de passe ne correspondent pas";
  }

  return Object.keys(passwordErrors.value).length === 0;
};

const handlePasswordChange = async () => {
  if (!validatePasswordChange()) return;

  isChangingPassword.value = true;
try{

  // Simulation API
  await authStore.changePassword(passwordData.value)
  // console.log("data",passwordData.value)
  showPasswordModal.value = false;
  passwordData.value = {
    old_password: "",
    new_password: "",
    confirmPassword: "",
  };
  passwordErrors.value = {};
  isChangingPassword.value = false;

  console.log("✅ Mot de passe changé !");
}catch(error:any){
  console.error('erreur',error)
}
};

const currentUser = computed(()=>authStore.user)

const loadUserData = ()=>{
  const user = currentUser.value

  if(!user){
    console.warn("Aucun utilisateur connecté");
    return;
  }

  //Mapper les donnée
  (Object.keys(values) as Array<keyof UpdateUserRequest>).forEach((key) => {
    if (key === 'classe') {
      // Mapper la classe depuis l'objet classe du store
      const classe = authStore.classe;
      setValue(key, classe ? `${classe.niveau} ${classe.serie}` : '');
    } else {
      const value = user[key as keyof typeof user];
      if (value !== undefined) {
        setValue(key, value as any);
      }
    }
  });
}

watch(currentUser, (newUser) => {
  if (newUser) {
    loadUserData();
  }
}, { immediate: true });

onMounted(async () => {
  if (!authStore.user) {
    try {
      await authStore.fetchUser();
    } catch (error) {
      console.error("❌ Erreur lors du chargement du profil:", error);
    }
  }
});
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

    <div class="grid lg:grid-cols-3 gap-8">
      <!-- SideBar -->
      <div class="lg:col-span-1">
        <AppCard variant="elevated" padding="lg">
          <!-- Avatr Upload -->
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
<!-- 
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
            </div> -->
          </div>

          <!-- Actions -->
          <div v-if="!isEditing" class="mt-6 space-y-2">
            <AppButton @click="handleEdit" variant="primary" :fullwidth="true">
              Modifier le profil
            </AppButton>
            <AppButton
              @click="showPasswordModal = true"
              variant="outline"
              :fullwidth="true"
            >
              Changer le mot de passe
            </AppButton>
          </div>
        </AppCard>
      </div>

      <!-- Main Content -->
      <div class="lg:col-span-2">
        <!-- Tabs -->
        <div class="flex gap-2 mb-6 border-b border-gray-200">
          <button
            @click="activeTab = 'profile'"
            :class="[
              'px-4 py-2 text-sm font-medium transition-colors border-b-2',
              activeTab === 'profile'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900',
            ]"
          >
            Informations
          </button>
          <button
            @click="activeTab = 'security'"
            :class="[
              'px-4 py-2 text-sm font-medium transition-colors border-b-2',
              activeTab === 'security'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900',
            ]"
          >
            Sécurité
          </button>
          <button
            @click="activeTab = 'preferences'"
            :class="[
              'px-4 py-2 text-sm font-medium transition-colors border-b-2',
              activeTab === 'preferences'
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-600 hover:text-gray-900',
            ]"
          >
            Préférences
          </button>
        </div>

        <!-- Tab profile -->
        <AppCard v-if="activeTab === 'profile'" variant="elevated" padding="lg">
          <h3 class="text-lg font-bold text-gray-900 mb-6">
            Informations personnelles
          </h3>

          <form @submit.prevent="handleUpdateUser" class="space-y-6">
            <div class="grid md:grid-cols-2 gap-6">
              <AppInput
                :model-value="String(values.prenom)"
                @update:model-value="setValue('prenom', String($event))"
                label="Prénom"
                :disabled="!isEditing"
                :error="errors.prenom"
                required
              />
              <AppInput
                :model-value="String(values.nom)"
                @update:model-value="setValue('nom', String($event))"
                label="Nom"
                :disabled="!isEditing"
                :error="errors.nom"
                required
              />
            </div>
            <AppInput
              :model-value="String(values.email)"
              @update:model-value="setValue('email', String($event))"
              label="Email"
              :disabled="!isEditing"
              :error="errors.email"
            />

            <div class="grid md:grid-cols-2 gap-6">
              <AppInput
                :model-value="String(values.telephone)"
                @update:model-value="setValue('telephone', String($event))"
                label="Téléphone"
                :disabled="!isEditing"
                :error="errors.telephone"
                required
              />
              <AppInput
                :model-value="(values.dateNaissance as string)"
                @update:model-value="setValue('dateNaissance', String($event))"
                label="Date de naissance"
                :disabled="!isEditing"
                :error="errors.dateNaissance"
                type="date"
              />
            </div>
            <div class="grid md:grid-cols-2 gap-6">
              <AppInput
                :model-value="String(values.classe)"
                @update:model-value="setValue('classe', String($event))"
                label="Classe"
                disabled
                :error="errors.classe"
                required
              />
            </div>

            <div>
              <label
                for=""
                class="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Biographie
                <span
                  v-if="values.bio"
                  class="text-xs text-gray-500 font-normal ml-2"
                >
                  {{ values.bio?.length || 0 }} / 500
                </span>
              </label>
              <textarea
                :value="values.bio"
                @input="(e)=>setValue('bio',(e.target as HTMLTextAreaElement).value)"
                :disabled="!isEditing"
                rows="4"
                maxlength="500"
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-none"
                placeholder="Parlez-nous un peu de vous..."
              ></textarea>
              <p class="mt-1.5 text-sm text-red-600" v-if="errors.bio">
                {{ errors.bio }}
              </p>
            </div>

            <div
              v-if="isEditing"
              class="flex gap-3 pt-4 border-t border-gray-200"
            >
              <AppButton
                type="submit"
                variant="primary"
                :loading="isSubmitting"
                class="flex-1"
                :disabled="isSubmitting"
              >
                Enregistrer
              </AppButton>

              <AppButton
                type="button"
                variant="outline"
                class="flex-1"
                @click="handleCancel"
                :disabled="isSubmitting"
              >
                Annuler
              </AppButton>
            </div>
          </form>
        </AppCard>

        <!-- Tab: Security -->
        <AppCard
          v-if="activeTab === 'security'"
          variant="elevated"
          padding="lg"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-6">
            Sécurité du compte
          </h3>

          <div class="space-y-4">
            <div
              class="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-gray-900 mb-1">
                  Mot de passe
                </h4>
                <p class="text-sm text-gray-600">
                  Dernière modification il y a 3 mois
                </p>
              </div>
              <AppButton
                variant="outline"
                size="sm"
                @click="showPasswordModal = true"
              >
                Modifier
              </AppButton>
            </div>

            <div
              class="flex items-start justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div class="flex-1">
                <h4 class="text-sm font-semibold text-gray-900 mb-1">
                  Authentification à deux facteurs
                </h4>
                <p class="text-sm text-gray-600">
                  Ajoutez une couche de sécurité supplémentaire
                </p>
              </div>
              <AppButton variant="outline" size="sm"> Activer </AppButton>
            </div>

            <div class="pt-6 border-t border-gray-200">
              <h4 class="text-sm font-semibold text-red-600 mb-2">
                ⚠️ Zone dangereuse
              </h4>
              <p class="text-sm text-gray-600 mb-4">
                La suppression de votre compte est irréversible.
              </p>
              <AppButton
                variant="danger"
                size="sm"
                @click="handleDeleteAccount"
              >
                Supprimer mon compte
              </AppButton>
            </div>
          </div>
        </AppCard>

        <!-- Tab: Preferences -->
        <AppCard
          v-if="activeTab === 'preferences'"
          variant="elevated"
          padding="lg"
        >
          <h3 class="text-lg font-bold text-gray-900 mb-6">Préférences</h3>

          <div class="space-y-6">
            <div class="flex items-center justify-between py-3">
              <div>
                <h4 class="text-sm font-semibold text-gray-900">
                  Notifications par email
                </h4>
                <p class="text-sm text-gray-600">
                  Recevoir les mises à jour par email
                </p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" checked />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"
                ></div>
              </label>
            </div>

            <div
              class="flex items-center justify-between py-3 border-t border-gray-200"
            >
              <div>
                <h4 class="text-sm font-semibold text-gray-900">Mode sombre</h4>
                <p class="text-sm text-gray-600">Activer le thème sombre</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" class="sr-only peer" />
                <div
                  class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"
                ></div>
              </label>
            </div>

            <div class="pt-3 border-t border-gray-200">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Langue</label
              >
              <select
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </AppCard>
      </div>
    </div>

    <!-- Password Modal -->
    <div
      v-if="showPasswordModal"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      @click.self="showPasswordModal = false"
    >
      <div
        class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-modal"
      >
        <div class="flex items-center justify-between mb-6">
          <h3 class="text-xl font-bold text-gray-900">
            Changer le mot de passe
          </h3>
          <button
            @click="showPasswordModal = false"
            class="text-gray-400 hover:text-gray-600"
          >
            <svg
              class="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form @submit.prevent="handlePasswordChange" class="space-y-4">
          <AppInput
            v-model="passwordData.old_password"
            label="Mot de passe actuel"
            type="password"
            :error="passwordErrors.old_password"
            required
          />

          <AppInput
            v-model="passwordData.new_password"
            label="Nouveau mot de passe"
            type="password"
            :error="passwordErrors.new_password"
            hint="Au moins 8 caractères"
            required
          />

          <AppInput
            v-model="passwordData.confirmPassword"
            label="Confirmer"
            type="password"
            :error="passwordErrors.confirmPassword"
            required
          />

          <div class="flex gap-3 pt-4">
            <AppButton
              type="submit"
              variant="primary"
              :loading="isChangingPassword"
              full-width
            >
              Changer
            </AppButton>
            <AppButton
              type="button"
              variant="outline"
              @click="showPasswordModal = false"
              :disabled="isChangingPassword"
            >
              Annuler
            </AppButton>
          </div>
        </form>
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
