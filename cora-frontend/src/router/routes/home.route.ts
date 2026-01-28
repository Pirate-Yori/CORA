import CoursDetail from "@/components/cours/CoursDetail.vue";
import Dashboard from "@components/dashboard/Dashboard.vue";
import MatiereDetail from "@/components/matiere/MatiereDetail.vue";
import LandingView from "@/views/dasboard/LandingView.vue";
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
                path: "profile",
                name: "Profile",
                component: () => import("@views/auth/ProfileView.vue"),
                meta: {
                    title: "Profile",
                    requiresAuth: true,
                }
            },
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => Dashboard,
                meta: {
                    title: 'Dashboard',
                    requiresAuth: false
                }
            },
            {
                path: 'dashboard2',
                name: 'Dashboard2',
                component: () => LandingView,
                meta: {
                    title: 'Dashboard',
                    requiresAuth: false
                }
            },
            {
                path: '/detail',
                name: 'detail',
                component: () => MatiereDetail,
                meta: {
                    title: 'detail',
                    requiresAuth: false
                }
            },
            {
                path: '/detail2',
                name: 'detail2',
                component: () => CoursDetail,
                meta: {
                    title: 'detail2',
                    requiresAuth: false
                }
            }
        ]
    }
]
export default homeRoutes