import type { Matiere, MatiereResponse } from "@/types"
import apiClient from "./axios.config"

class MatiereService {
    // Récuperer les matieres
    async getMatieres(): Promise<MatiereResponse> {
        const { data } = await apiClient.get<MatiereResponse>('/matieres/')
        return data
    }

    // Récuperer une matiere par son ID
    async getMatiereById(matiereId: number): Promise<any> {
        const { data } = await apiClient.get(`/matieres/${matiereId}/`)
        return data
    }

    //Recuperer les cours d'une matiere
    async getCoursByMatiereId(matiereId: number): Promise<any> {
        const { data } = await apiClient.get(`/courses/${matiereId}/`)
        return data
    }

    //Recuperer un cours d'une matiere
    async getSpecCour(matiereId: number, courId: number): Promise<any> {
        const { data } = await apiClient.get(`/matieres/${matiereId}/courses/${courId}/`)
        return data
    }

    async getChapitres(matiereId: number, courId: number): Promise<any> {
        const { data } = await apiClient.get(`/matieres/${matiereId}/courses/${courId}/chapters/`)
        return data
    }
    async getLecon(matiereId: number, coursId: number, chapitreId: number, leconId: number): Promise<any> {
        const { data } = await apiClient.get(`/matieres/${matiereId}/courses/${coursId}/chapters/${chapitreId}/lessons/${leconId}/`)
        return data
    }

    async completeLecon(matiereId: number, coursId: number, chapitreId: number, leconId: number): Promise<any> {
        const { data } = await apiClient.post(
            `/matieres/${matiereId}/courses/${coursId}/chapters/${chapitreId}/lessons/${leconId}/complete/`)
        return data
    }

    async submitQuiz(matiereId: number, coursId: number, chapitreId: number, leconId: number, reponses: any[]): Promise<any> {
        const { data } = await apiClient.post(
            `/matieres/${matiereId}/courses/${coursId}/chapters/${chapitreId}/lessons/${leconId}/submit-quiz/`,
            { reponses }
        )
        return data
    }
}
export default new MatiereService()