import type { RegisterRequest, LoginRequest, AuthResponse, LogoutResponse, MeResponse } from "@/types";
import apiClient from "./axios.config";

/**
 * Service d'authentification
 */
class AuthService {
    /**
     * Inscription
     */
    async register(userData: RegisterRequest): Promise<AuthResponse> {
        const { data } = await apiClient.post<AuthResponse>('auth/register/', userData)
        return data
    }

    /**
     * Connexion
     */
    async login(credentials: LoginRequest): Promise<AuthResponse> {
        const { data } = await apiClient.post<AuthResponse>('auth/login/', credentials)
        return data
    }

    /**
    * Déconnexion
   */
    async logout(): Promise<LogoutResponse> {
        const { data } = await apiClient.post<LogoutResponse>('/auth/logout/')
        return data
    }

    /**
     * Récuperer l'utilisateur connecté
     */
    async me(): Promise<MeResponse> {
        const { data } = await apiClient.get<MeResponse>('/auth/me/')
        return data
    }

    async myProfile(): Promise<MeResponse> {
        const { data } = await apiClient.get<MeResponse>('/auth/profile')
        return data
    }
}
export default new AuthService()