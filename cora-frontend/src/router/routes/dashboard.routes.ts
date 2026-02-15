

import type { RouteRecordRaw } from "vue-router";

const dashboardRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => import("@/layouts/DashboardLayout.vue"),
        meta: {
            requiresAuth: false
        },
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                component: () => import("@/views/Dashboard.vue"),
                meta: {
                    title: "Dashboard",
                    requiresAuth: true
                }
            },
            {
                path: "profil",
                name: "Profile",
                component: () => import("@/views/auth/ProfileView.vue"),
                meta: {
                    requiresAuth: true
                }
            },
            {
                path: "matieres",
                meta: {
                    requiresAuth: true
                },
                children: [
                    //Liste des matiere
                    {
                        path: "",
                        name: "Matieres",
                        component: () => import("@/views/matieres/ListeMatieres.vue"),
                        meta: { title: "Mes matières" }
                    },
                    //Detail d'une matiere
                    {
                        path: ":matiereId",
                        name: "DetailMatiere",
                        component: () => import("@/views/matieres/DetailMatiere.vue"),
                        props: true,
                        meta: {
                            title: 'Détails de la matière',
                            breadcrumb: (route: any) => [
                                { label: "Tableau de bord", path: "/dashboard" },
                                { label: 'Mes matières', path: '/matieres' },
                                {
                                    label: route.params?.matiereName
                                        || `Matière ${route.params?.matiereId ?? ""}`,
                                    path: route.path
                                }
                            ]
                        },
                    },
                    //Chapitre d'un cours specifiue
                    {
                        path: ":matiereId/cours/:coursId",
                        name: "CoursChapitres",
                        component: () => import("@/views/matieres/CoursChapitres.vue"),
                        meta: {
                            title: "Chapitres du cours"
                        }
                    },
                    //Leçon d'un cours spécifique
                    {
                        path: ":matiereId/cours/:coursId/chapitre/:chapitreId/lesson/:lessonId",
                        name: "Leçon",
                        props: true,
                        component: () => import("@/views/matieres/Leçon.vue"),
                        meta: {
                            title: "Leçon"
                        }
                    },
                ]
            },
        ]
    }
]

export default dashboardRoutes;