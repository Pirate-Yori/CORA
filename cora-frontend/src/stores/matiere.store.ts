import { matiereService } from "@/services";
import type { Cours, Matiere, Chapitre, Lecon } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useMatiereStore = defineStore("matiere", () => {
    // ==========================================
    // ÉTAT
    // ==========================================
    const matieres = ref<Matiere[]>([]);
    const matiereActive = ref<Matiere | null>(null);
    const coursActif = ref<Cours | null>(null);
    const coursList = ref<Cours[]>([]);
    const chapitres = ref<Chapitre[]>([]);
    const leconActive = ref<Lecon | null>(null);
    
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    // ==========================================
    // GETTERS
    // ==========================================
    const matieresEnCours = computed(() => 
        matieres.value.filter(m => m.progression > 0 && m.progression < 100)
    );

    const matieresTerminees = computed(() => 
        matieres.value.filter(m => m.progression === 100)
    );

    const matieresNonCommencees = computed(() => 
        matieres.value.filter(m => m.progression === 0)
    );

    const getMatiereById = computed(() => (id: number) => 
        matieres.value.find(m => m.id === id)
    );

    const progressionMoyenne = computed(() => {
        if (matieres.value.length === 0) return 0;
        const total = matieres.value.reduce((sum, m) => sum + m.progression, 0);
        return Math.round(total / matieres.value.length);
    });

    const statistiques = computed(() => ({
        total: matieres.value.length,
        enCours: matieresEnCours.value.length,
        terminees: matieresTerminees.value.length,
        nonCommencees: matieresNonCommencees.value.length,
        progressionMoyenne: progressionMoyenne.value
    }));

    // ==========================================
    // ACTIONS - MATIÈRES
    // ==========================================
    const fetchMatieres = async () => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await matiereService.getMatieres();
            matieres.value = response.results; 
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Erreur lors du chargement des matières';
            console.error("Erreur:", err);
            throw err; // ✅ On throw pour que le composant puisse gérer
        } finally {
            isLoading.value = false;
        }
    };

    const fetchMatiereById = async (matiereId: number) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await matiereService.getMatiereById(matiereId);
            matiereActive.value = response;
            coursList.value = response.cours
            // Mettre à jour aussi dans la liste
            const index = matieres.value.findIndex(m => m.id === matiereId);
            if (index !== -1) {
                matieres.value[index] = response.data;
            }
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Erreur lors du chargement de la matière';
            console.error("Erreur:", err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    // ==========================================
    // ACTIONS - COURS
    // ==========================================
    const fetchCoursByMatiere = async (matiereId: number) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await matiereService.getCoursByMatiereId(matiereId);
            coursList.value = response.cours;
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Erreur lors du chargement des cours';
            console.error("Erreur:", err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    const fetchCoursById = async (matiereId: number, coursId: number) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await matiereService.getSpecCour(matiereId, coursId);
            coursActif.value = response.data;
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Erreur lors du chargement du cours';
            console.error("Erreur:", err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    // ==========================================
    // ACTIONS - CHAPITRES
    // ==========================================
    const fetchChapitresByCours = async (coursId: number) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await matiereService.getChapitres(coursId);
            chapitres.value = response;
        } catch (err: any) {
            error.value = err.response?.message || 'Erreur lors du chargement des chapitres';
            console.error("Erreur:", err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    // ==========================================
    // ACTIONS - LEÇONS
    // ==========================================
    const fetchLeconById = async (
        matiereId: number, 
        coursId: number, 
        chapitreId: number, 
        leconId: number
    ) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await matiereService.getLecon(
                matiereId, 
                coursId, 
                chapitreId, 
                leconId
            );
            leconActive.value = response.data;
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Erreur lors du chargement de la leçon';
            console.error("Erreur:", err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    const marquerLeconTerminee = async (
        matiereId: number,
        coursId: number,
        chapitreId: number,
        leconId: number
    ) => {
        isLoading.value = true;
        error.value = null;

        try {
            await matiereService.completeLecon(
                matiereId,
                coursId,
                chapitreId,
                leconId
            );

            // Mettre à jour l'état local
            if (leconActive.value && leconActive.value.id === leconId) {
                leconActive.value.completed = true;
                leconActive.value.progression = 100;
            }
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Erreur lors de la validation';
            console.error("Erreur:", err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    const soumettreQuiz = async (
        matiereId: number,
        coursId: number,
        chapitreId: number,
        leconId: number,
        reponses: any[]
    ) => {
        isLoading.value = true;
        error.value = null;

        try {
            const response = await matiereService.submitQuiz(
                matiereId,
                coursId,
                chapitreId,
                leconId,
                { reponses }
            );
            return response.data; // ✅ ICI on peut retourner car le composant a besoin du résultat (score, etc.)
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Erreur lors de la soumission du quiz';
            console.error("Erreur:", err);
            throw err;
        } finally {
            isLoading.value = false;
        }
    };

    // ==========================================
    // SETTERS (optionnels)
    // ==========================================
    const setMatieres = (matiereList: Matiere[]) => {
        matieres.value = matiereList;
    };

    const setMatiereActive = (matiere: Matiere | null) => {
        matiereActive.value = matiere;
    };

    const setCoursActif = (cours: Cours | null) => {
        coursActif.value = cours;
    };

    // ==========================================
    // UTILITAIRES
    // ==========================================
    const resetState = () => {
        matieres.value = [];
        matiereActive.value = null;
        coursActif.value = null;
        coursList.value = [];
        chapitres.value = [];
        leconActive.value = null;
        error.value = null;
    };

    const clearError = () => {
        error.value = null;
    };

    return {
        // État
        matieres,
        matiereActive,
        coursActif,
        coursList,
        chapitres,
        leconActive,
        isLoading,
        error,

        // Getters
        matieresEnCours,
        matieresTerminees,
        matieresNonCommencees,
        getMatiereById,
        progressionMoyenne,
        statistiques,

        // Actions
        fetchMatieres,
        fetchMatiereById,
        fetchCoursByMatiere,
        fetchCoursById,
        fetchChapitresByCours,
        fetchLeconById,
        marquerLeconTerminee,
        soumettreQuiz,

        // Setters (optionnels)
        setMatieres,
        setMatiereActive,
        setCoursActif,

        // Utilitaires
        resetState,
        clearError
    };
});