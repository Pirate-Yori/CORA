import { useAuthStore } from "@/stores"
import { computed } from "vue"

/**
 * Composable pour gérer l'authentification
 */
export function useAuth() {
    const authStore = useAuthStore()

    //Computed properties
    const user = computed(() => authStore.user)
    const isAuthenticated = computed(() => authStore.isAuthenticated)
    const isLoading = computed(() => authStore.isLoading)
    const userFullName = computed(() => authStore.user?.nom + " "+ authStore.user?.prenom || "")
    const userEmail = computed(() => authStore.user?.email || "")
    const token = computed(()=>authStore.refreshToken)

    // Methode
    const login = authStore.login
    const register = authStore.register
    const logout = authStore.logout

    return {
        //States
        user, 
        isAuthenticated, 
        isLoading,
        token,
        
        //User info
        userFullName, 
        userEmail,

        //Methods
        login, 
        register, 
        logout

    }
}