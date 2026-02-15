import { useMatiereStore } from "@/stores/matiere.store";
import { computed, onMounted, ref } from "vue";

/**
 * Composable pour gérer les matières
 * Facilite l'utilisation du store dans les composants
 */

export function useMatieres() {
    const store = useMatiereStore()
    const localLoading = ref(false)
    const localError = ref<string | null>(null)

    //Etat

    const matieres = computed(() => store.matieres)
    const matiereActive = computed(() => store.matiereActive)
    const coursActif = computed(() => store.coursActif)
    const coursList = computed(() => store.coursList)
    const chapitres = computed(() => store.chapitres)
    const leconActive = computed(() => store.leconActive)
    const isLoading = computed(() => store.isLoading)
    const error = computed(() => store.error)
    const statistiques = computed(() => store.statistiques);

    /**
     * Charger toutes les matières
     */
    const loadMatieres = async () => {
        localLoading.value = true;
        localError.value = null;

        try {
            await store.fetchMatieres();
        } catch (err: any) {
            localError.value = err.message || 'Erreur lors du chargement';
            throw err;
        } finally {
            localLoading.value = false;
        }
    };

    /**
     * Charger une matière spécifique
     */
    const loadMatiere = async (matiereId: number) => {
        localLoading.value = true;
        localError.value = null;

        try {
            await store.fetchMatiereById(matiereId);
        } catch (err: any) {
            localError.value = err.message || 'Erreur lors du chargement';
            throw err;
        } finally {
            localLoading.value = false;
        }
    };

    /**
     * Réinitialiser les erreurs
     */
    const clearError = () => {
        localError.value = null;
        store.clearError();
    };

    return {
        // État
        matieres,
        matiereActive,
        isLoading,
        error,
        statistiques,

        // Actions
        loadMatieres,
        loadMatiere,
        clearError,

        // Accès direct au store si nécessaire
        store
    };
}

/**
 * Composable pour gérer les cours
 */
export function useCours() {
    const store = useMatiereStore();
    const localLoading = ref(false);
    const localError = ref<string | null>(null);

    const coursList = computed(() => store.coursList);
    const coursActif = computed(() => store.coursActif);
    const isLoading = computed(() => store.isLoading || localLoading.value);
    const error = computed(() => store.error || localError.value);

    /**
     * Charger les cours d'une matière
     */
    const loadCours = async (matiereId: number) => {
        localLoading.value = true;
        localError.value = null;

        try {
            await store.fetchCoursByMatiere(matiereId);
        } catch (err: any) {
            localError.value = err.message || 'Erreur lors du chargement';
            throw err;
        } finally {
            localLoading.value = false;
        }
    };

    /**
     * Charger un cours spécifique
     */
    const loadCoursDetail = async (matiereId: number, coursId: number) => {
        localLoading.value = true;
        localError.value = null;

        try {
            await store.fetchCoursById(matiereId, coursId);
        } catch (err: any) {
            localError.value = err.message || 'Erreur lors du chargement';
            throw err;
        } finally {
            localLoading.value = false;
        }
    };

    const clearError = () => {
        localError.value = null;
        store.clearError();
    };

    return {
        coursList,
        coursActif,
        isLoading,
        error,
        loadCours,
        loadCoursDetail,
        clearError,
        store
    };
}

/**
 * Composable pour gérer les chapitres et leçons
 */
export function useChapitres() {
    const store = useMatiereStore();
    const localLoading = ref(false);
    const localError = ref<string | null>(null);

    const chapitres = computed(() => store.chapitres);
    const leconActive = computed(() => store.leconActive);
    const isLoading = computed(() => store.isLoading || localLoading.value);
    const error = computed(() => store.error || localError.value);

    /**
     * Charger les chapitres d'un cours
     */
    const loadChapitres = async (coursId: number) => {
        localLoading.value = true;
        localError.value = null;

        try {
            await store.fetchChapitresByCours(coursId);
        } catch (err: any) {
            localError.value = err.message || 'Erreur lors du chargement';
            throw err;
        } finally {
            localLoading.value = false;
        }
    };

    /**
     * Charger une leçon spécifique
     */
    const loadLecon = async (
        matiereId: number,
        coursId: number,
        chapitreId: number,
        leconId: number
    ) => {
        localLoading.value = true;
        localError.value = null;

        try {
            await store.fetchLeconById(matiereId, coursId, chapitreId, leconId);
        } catch (err: any) {
            localError.value = err.message || 'Erreur lors du chargement';
            throw err;
        } finally {
            localLoading.value = false;
        }
    };

    /**
     * Marquer une leçon comme terminée
     */
    const completeLecon = async (
        matiereId: number,
        coursId: number,
        chapitreId: number,
        leconId: number
    ) => {
        localLoading.value = true;
        localError.value = null;

        try {
            await store.marquerLeconTerminee(matiereId, coursId, chapitreId, leconId);
        } catch (err: any) {
            localError.value = err.message || 'Erreur lors de la validation';
            throw err;
        } finally {
            localLoading.value = false;
        }
    };

    /**
     * Soumettre un quiz
     */
    const submitQuiz = async (
        matiereId: number,
        coursId: number,
        chapitreId: number,
        leconId: number,
        reponses: any[]
    ) => {
        localLoading.value = true;
        localError.value = null;

        try {
            const result = await store.soumettreQuiz(
                matiereId,
                coursId,
                chapitreId,
                leconId,
                reponses
            );
            return result;
        } catch (err: any) {
            localError.value = err.message || 'Erreur lors de la soumission';
            throw err;
        } finally {
            localLoading.value = false;
        }
    };

    const clearError = () => {
        localError.value = null;
        store.clearError();
    };

    return {
        chapitres,
        leconActive,
        isLoading,
        error,
        loadChapitres,
        loadLecon,
        completeLecon,
        submitQuiz,
        clearError,
        store
    };
}

/**
 * Composable tout-en-un pour une page complète
 * Charge automatiquement les données au montage
 */
export function useMatieresPage(autoLoad = true) {
    const { matieres, isLoading, error, loadMatieres, statistiques } = useMatieres();

    if (autoLoad) {
        onMounted(() => {
            loadMatieres();
        });
    }

    return {
        matieres,
        isLoading,
        error,
        statistiques,
        loadMatieres
    };
}