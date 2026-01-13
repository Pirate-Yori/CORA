import { useAuthStore } from "@/stores";
import { ApiException, ServerError, UnauthorizedError, ValidationException } from "@/types";
import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import { useToast } from "vue-toastification";

const toast = useToast();

const apiClient: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api",
    timeout: 30000,
    headers: {
        'Content-Type': "application/json",
        Accept: "application/json",
    },
})

//Variables pour gérer le refresh
let isRefreshing = false
let failedQueue: Array<{
    resolve: (value?: any) => void
    reject: (reason?: any) => void
}> = []

const processQueue = (error: any = null, token: string | null = null) => {
    failedQueue.forEach(promise => {
        if (error) {
            promise.reject(error)
        } else {
            promise.resolve(token)
        }
    })

    failedQueue = []
}


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
apiClient.interceptors.response.use(
    response => {
        return response
    },

    async (error: AxiosError) => {
        const authStore = useAuthStore()
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean }

        // Erreur réseau
        if (!error.response) {
            toast.error('Erreur de connexion au serveur')
            return Promise.reject(new ServerError('Erreur de connexion au serveur'))
        }

        const { status, data } = error.response as any

        //401-Token expiré ou non authentifier
        if (status === 401 && !originalRequest._retry) {
            // Si déjà en train de refresher, mettre la requête en queue
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject })
                })
                    .then(token => {
                        if (originalRequest.headers) {
                            originalRequest.headers.Authorization = `Bearer ${token}`
                        }
                        return apiClient(originalRequest)
                    })
                    .catch(err => {
                        return Promise.reject(err)
                    })
            }

            //Marquer qu'on a tenter de rafraichire
            originalRequest._retry = true
            isRefreshing = true

            // Vérifier qu'on a un refresh token
            if (!authStore.refreshToken) {
                console.log('Pas de refresh token, déconnexion')
                isRefreshing = false
                toast.error('Session expirée. Veuillez vous reconnecter.')
                authStore.logout()
                window.location.href = '/auth/login'
                return Promise.reject(new UnauthorizedError('Session expirée'))
            }

            try {
                console.log('Tentative de refresh du token...')

                // Appeler l'endpoint de refresh (sans passer par l'interceptor)
                const response = await axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/auth/refresh`,
                    { refresh: authStore.refreshToken }
                )

                const { access, refresh } = response.data

                // Mettre à jour les tokens
                authStore.token = access
                if (refresh) {
                    authStore.refreshToken = refresh  // Nouveau refresh token si rotation activée
                }

                //Mettre à jour l'header de la requête originale
                if (originalRequest.headers) {
                    originalRequest.headers.Authorization = `Bearer ${access}`
                }

                console.log('Token refreshed avec succès')

                //Traiter toutes les requêtes en queue
                processQueue(null, access)

                // Rejouer la requête originale
                return apiClient(originalRequest)

            } catch (refreshError: any) {
                console.error('Échec du refresh token:', refreshError)

                // Rejeter toutes les requêtes en queue
                processQueue(refreshError, null)

                // Déconnecter l'utilisateur
                toast.error('Session expirée. Veuillez vous reconnecter.')
                authStore.logout()
                window.location.href = '/auth/login'

                return Promise.reject(new UnauthorizedError('Session expirée'))
            } finally {
                isRefreshing = false
            }
        }

        // 403 - Accès refusé
        if (status === 403) {
            toast.error(data.message || 'Accès refusé')
            return Promise.reject(
                new ApiException(data.message || 'Accès refusé', 403)
            )
        }

        // 404 - Non trouvé
        if (status === 404) {
            toast.error(data.message || 'Ressource non trouvée')
            return Promise.reject(
                new ApiException(data.message || 'Ressource non trouvée', 404)
            )
        }

        // 422 - Erreur de validation
        if (status === 422) {
            const message = data.message || 'Erreur de validation'
            // Ne pas afficher de toast pour les erreurs de validation
            return Promise.reject(new ValidationException(message, data.errors))
        }

        // 500 - Erreur serveur
        if (status >= 500) {
            toast.error('Erreur serveur. Veuillez réessayer plus tard.')
            return Promise.reject(
                new ServerError(data.message || 'Erreur serveur')
            )
        }

        // Autres erreurs
        const message = data.message || 'Une erreur est survenue'
        toast.error(message)
        return Promise.reject(new ApiException(message, status, data.errors))
    }
)
export default apiClient