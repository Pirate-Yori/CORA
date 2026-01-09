import { useAuthStore } from "@/stores"
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router"

export const authGuard = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const authStore = useAuthStore()
    const isAuthenticated = authStore.isAuthenticated
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    // Routes publiques ne nécessitant pas d'authentification
    const publicRoutes = ['Login', 'Register']
    const isPublicRoute = publicRoutes.includes(to.name as string)

    if(requiresAuth && !isPublicRoute){
        if(!isAuthenticated){
            next({name:'Login', query:{redirect: to.fullPath}})
            return
        }
    }else if(isPublicRoute && isAuthenticated){
        next({name:'Home'})
        return
    }
    next()
}