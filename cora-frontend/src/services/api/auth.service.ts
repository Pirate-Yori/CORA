import type { RegisterRequest, LoginRequest, AuthResponse, LogoutResponse, MeResponse, UpdateUserRequest, ChangePasswordRequest } from "@/types";
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
    async logout(refresToken:String): Promise<LogoutResponse> {
        const { data } = await apiClient.post<LogoutResponse>('/auth/logout/',{
            refresh:refresToken ,
        },{
            //Ignorer le refresh
            skipAuthRefresh:true
        } as any)
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
    async uploadPhoto(formData: FormData) {
        const response = await apiClient.post('/auth/profile/photo', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },

            onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                    console.log(`Uploade progress : ${percentCompleted}`);

                }
            }
        })
        return response.data
    }

    async updateUser(userData: UpdateUserRequest):Promise<MeResponse>{
        const {data} = await apiClient.put<MeResponse>('/auth/profile',userData)
        return data
    }

    async ChangePassword(passWordData:ChangePasswordRequest):Promise<String>{
        const {data} = await apiClient.put('/auth/profile/password',passWordData)
        return data
    }
}
export default new AuthService()