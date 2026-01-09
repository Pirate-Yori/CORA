import { defineStore } from "pinia";
import type { User, LoginRequest,RegisterRequest } from "@/types";
import { computed, ref } from "vue";
import {authService} from "@/services";
import { useToast } from "vue-toastification";

const toast = useToast();

export const useAuthStore = defineStore("auth", () => {
    //State
    const user = ref<User | null>(null)
    const token = ref<string | null>(null)
    const isLoading = ref(false)

    // Gettres
    const isAuthenticated = computed(() => !!token.value && !!user.value)

    //Actions
    const register = async (userData: RegisterRequest) => {
        try {
            isLoading.value = true
            const response = await authService.register(userData);
            user.value = response.user;
            token.value = response.token;

            //Sauvegarder en localstorage
            localStorage.setItem("user", response.user)
            localStorage.setItem("token", response.token)

            toast.success('Inscription réussie !')
            return response
        } catch (error) {
            console.error("Erreur lors de l'inscription:", error);
            toast.error("Erreur lors de l'inscription")
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

            //Sauvegarder en localstorage
            localStorage.setItem("user", response.user)
            localStorage.setItem("token", response.token)

            toast.success(`Bienvenue ${response.user.full_name}`)
            return response
        } catch (error) {
            console.error("Erreur lors de la connexion:", error);

            toast.error("Identifiants invalides")
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
        } finally {
            //Nettoyer l'état local
            user.value = null;
            token.value = null;
            //Nettoyer le localStorage
            localStorage.clear();

            toast.info("Vous avez été déconnecté.");
        }
    }
    return {
        //State
        user,
        token,
        isLoading,

        //Getters
        isAuthenticated,

        //Actions
        login, register, logout
    }
}) 