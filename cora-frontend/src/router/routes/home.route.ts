import Dashboard from "@/components/dashboard/Dashboard.vue";
import type { RouteRecordRaw } from "vue-router";

const homeRoutes: RouteRecordRaw[] = [
    {
        path: "/home",
        component: () => import("@layouts/HomeLayout.vue"),
        meta: {
            requiresAuth: false,
        }, children: [
            {
                path: "",
                name: "Home",
                component: () => import("@/views/home/DashboardView.vue"),
                meta: {
                    title: "Accueil"
                }
            },
            {
                path: "/profile",
                name: "Profile",
                component: () => import("@views/auth/ProfileView.vue"),
                meta: {
                    title: "Profile",
                    requiresAuth: true,
                }
            },
            {
                path:'/dashboard',
                name:'Dashboard',
                component:()=>Dashboard,
                meta:{
                    title:'Dashboard',
                    requiresAuth:false
                }
            }
        ]
    }
]
export default homeRoutes