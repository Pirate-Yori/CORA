import type { Matiere, MatiereResponse } from "@/types"
import apiClient from "./axios.config"

class MatiereService {
    // Récuperer les matieres
    async getMatieres(): Promise<MatiereResponse> {
        const { data } = await apiClient.get<MatiereResponse>('/matieres/')
        return data
    }

    // Récuperer une matiere par son ID
    async getMatiereById(matiereId: string): Promise<Matiere> {
        const { data } = await apiClient.get<Matiere>(`/matieres/${matiereId}/`)
        return data
    }

    //Recuperer les cours d'une matiere
    async getCoursByMatiereId(matiereId: number):Promise<any> {
        const { data } = await apiClient.get(`/courses/${matiereId}/`)
        return data
    }
}
export default new MatiereService()