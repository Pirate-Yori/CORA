import { matiereService } from "@/services";
import type { Cours, Matiere } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useMatiereStore = defineStore("matiere", () => {
    const matieres = ref<Matiere[]>([]);
    const selectedMatiere = ref<Matiere | null>(null);
    const isLoading = ref(false);
    const error = ref<string | null>(null);
    const coursActif = ref<Cours | null>(null)

    const setMatieres = (matiereList: Matiere[]) => {
        matieres.value = matiereList;
    };

    const setSelectedMatiere = (matiere: Matiere | null) => {
        selectedMatiere.value = matiere;
    };

    const fetchMatieres = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const respones = await matiereService.getMatieres();
            matieres.value = respones.results
         } catch (error) {
            console.error("Erreur lors de la récupération des matières:", error);
            throw error;
          } finally {
            isLoading.value = false;
        }
    }

    return{
        matieres,
        selectedMatiere,
        isLoading,
        error,
        coursActif,
        setMatieres,
        setSelectedMatiere,
        fetchMatieres
    }
})