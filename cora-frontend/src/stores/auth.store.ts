import { defineStore } from "pinia";
import type { User, LoginRequest, RegisterRequest } from "@/types";
import { computed, ref } from "vue";
import { authService } from "@/services";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useAuthStore = defineStore("auth", () => {
    //State
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)
    const isLoading = ref(false)
    const refreshToken = ref<string | null|undefined>(null)
    const error = ref<string | null>(null)

    // Computed
    const isAuthenticated = computed(() => !!token.value && !!user.value)
    const isStudent = computed(() => user.value?.role === 'student')
    const isTeacher = computed(() => user.value?.role === 'teacher')
    const isAdmin = computed(() => user.value?.role === 'admin')
    const fullName = computed(() =>
        user.value ? `${user.value.prenom} ${user.value.nom}` : ''
    )

    //Actions

    /**
   * Initialize auth from stored data
   */
    const initialize = () => {
        const storedToken = localStorage.getItem('cora_token')
        const storedRefreshToken = localStorage.getItem('cora_refresh_token')
        const storedUser = localStorage.getItem('cora_user')

        if (storedToken && storedUser) {
            token.value = storedToken
            refreshToken.value = storedRefreshToken
            user.value = JSON.parse(storedUser)
        }
    }

    const register = async (userData: RegisterRequest) => {
        isLoading.value = true
        error.value = null
        try {
            const response = await authService.register(userData);
            user.value = response.user;
            token.value = response.token;
            refreshToken.value = response?.refreshToken

            //Sauvegarder en localstorage
            // localStorage.setItem("user", (response.user).toString())
            // localStorage.setItem("token", response.token)

            // localStorage.setItem('cora_token', response.token)
            // if (response.refreshToken) {
            //     localStorage.setItem('cora_refresh_token', response.refreshToken)
            // }
            // localStorage.setItem('cora_user', JSON.stringify(response.user))

            toast.success('Inscription réussie !')
            return response
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            toast.error("Erreur lors de l'inscription")
            throw error;
        } finally {
            isLoading.value = false
        }
    }

    const login = async (credentials: LoginRequest) => {
        try {
            isLoading.value = true
            const response = await authService.login(credentials);

            user.value = response.user;
            token.value = response.token;
            refreshToken.value= response.refreshToken

            //Sauvegarder en localstorage
            // localStorage.setItem("user",  response)
            // localStorage.setItem("token", response.token)
            localStorage.setItem('cora_token', response.token)
            if (response.refreshToken) {
                localStorage.setItem('cora_refresh_token', response.refreshToken)
            }
            localStorage.setItem('cora_user', JSON.stringify(response.user))
            toast.success(`Bienvenue ${response.user.nom}`)
            return response
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);
            toast.error("Identifiants invalides")
            throw error;
        } finally {
            isLoading.value = false
        }
    }

    const logout = async () => {
        try {
            if (token.value) {
                await authService.logout()
            }
        } catch (error) {
            console.error("Erreur lors de la déconnexion:", error);
            throw error;
        } finally {
            //Nettoyer l'état local
            user.value = null;
            token.value = null;
            //Nettoyer le localStorage
            localStorage.clear();

            toast.info("Vous avez été déconnecté.");
        }
    }

    /**
   * Fetch current user data
   */
    const fetchUser = async (): Promise<User> => {
        isLoading.value = true
        error.value = null

        try {
            const response = await authService.me()
            user.value = response.user
            localStorage.setItem('cora_user', JSON.stringify(response.user))
            return response.user
        } catch (err: any) {
            error.value = err.response?.data?.message || 'Échec de la récupération'
            throw err
        } finally {
            isLoading.value = false
        }
    }

    return {
        //State
        user,
        token,
        refreshToken,
        isLoading,

        //Getters
        isAuthenticated,

        //Actions
        login,
        register,
        logout,
        fetchUser
    }
}, {
    persist: {
        key: "auth",
        storage: localStorage,
        pick: ["user", "token", "refreshToken"]
    }
}) 