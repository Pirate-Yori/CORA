import type { Matiere } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMatiereStore = defineStore("matiere", () => {
    const matieres = ref<Matiere[]>([]);
    const selectedMatiere = ref<Matiere | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const setMatieres = (matiereList: Matiere[]) => {
        matieres.value = matiereList;
    };

    const setSelectedMatiere = (matiere: Matiere | null) => {
        selectedMatiere.value = matiere;
    };

    const fetchMatieres = async () => {
        isLoading.value = true;
        error.value = null;

        try { } catch (error) { } finally {
            isLoading.value = false;
        }
    }
})