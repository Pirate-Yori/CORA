import type { Matiere } from "@/types"
import apiClient from "./axios.config"

class MatiereService {
    // Récuperer les matieres
    async getMatieres(): Promise<Matiere[]> {
        const { data } = await apiClient.get<Matiere[]>('/matieres/')
        return data
    }

    // Récuperer une matiere par son ID
    async getMatiereById(matiereId: string): Promise<Matiere> {
        const { data } = await apiClient.get<Matiere>(`/matieres/${matiereId}/`)
        return data
    }
}
export default new MatiereService()