import { useAuthStore } from "@/stores";
import { ApiException, ServerError, UnauthorizedError, ValidationException } from "@/types";
import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
    timeout:30000,
    headers: {
        'Content-Type': "application/json",
        Accept: "application/json",
    },
})

// Intercepteur de requête - Ajouter le token
apiClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const authStore = useAuthStore()
        const token = authStore.token

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config

    },
    error => {
        return Promise.reject(error)
    }
)

// Intercepteur de réponse - Gérer les erreurs
// apiClient.interceptors.response.use(
//     response => {
//         return response
//     },
//     error => {
//         const authStore = useAuthStore()

//         // Erreur réseau
//         if (!error.response) {
//             toast.error('Erreur de connexion au serveur')
//             return Promise.reject(new ServerError('Erreur de connexion au serveur'))
//         }

//         const { status, data } = error.response

//         // 401 - Non authentifié
//         if (status == 401) {
//             toast.error('Session expirée. Veuillez vous reconnecter. ')
//             authStore.logout()
//             window.location.href = '/auth/login'
//             return Promise.reject(new UnauthorizedError(data.message))
//         }

//         //403 - Accès refusé
//         if (status === 403) {
//             toast.error(data.message || 'Accès refusé')
//             return Promise.reject(
//                 new ApiException(data.message || 'Accès refusé', 403)
//             )
//         }

//         // 404 - Non trouvé
//         if (status === 404) {
//             toast.error(data.message || 'Ressource non trouvée')
//             return Promise.reject(
//                 new ApiException(data.message || 'Ressource non trouvée', 404)
//             )
//         }

//         // 422 - Erreur de validation
//         if (status === 422) {
//             const message = data.message || 'Erreur de validation'
//             // Ne pas afficher de toast pour les erreurs de validation
//             // Elles seront gérées dans les formulaires
//             return Promise.reject(new ValidationException(message, data.errors))
//         }

//         // 500 - Erreur serveur
//         if (status >= 500) {
//             toast.error('Erreur serveur. Veuillez réessayer plus tard.')
//             return Promise.reject(
//                 new ServerError(data.message || 'Erreur serveur')
//             )
//         }

//         // Autres erreurs
//         const message = data.message || 'Une erreur est survenue'
//         toast.error(message)
//         return Promise.reject(new ApiException(message, status, data.errors))
//     }
// )
export default apiClient