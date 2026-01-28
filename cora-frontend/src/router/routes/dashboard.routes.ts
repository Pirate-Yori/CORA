import CoursDetail from "@/components/cours/CoursDetail.vue";
import MatiereDetail from "@/components/matiere/MatiereDetail.vue";
import DashboardLayout from "@/layouts/DashboardLayout.vue";
import LandingView from "@/views/dasboard/LandingView.vue";
import DashboardView from "@/views/home/DashboardView.vue";
import CoursChapitres from "@/views/matieres/CoursChapitres.vue";
import DetailMatiere from "@/views/matieres/DetailMatiere.vue";
import Leçon from "@/views/matieres/Leçon.vue";
import ListeMatieres from "@/views/matieres/ListeMatieres.vue";
import type { RouteRecordRaw } from "vue-router";

const dashboardRoutes: RouteRecordRaw[] = [
    {
        path: "/",
        component: () => DashboardLayout,
        meta: {
            requiresAuth: false
        },
        children: [
            {
                path: "dashboard",
                name: "Dashboard",
                component: () => LandingView,
                meta: {
                    title: "Dashboard"
                }
            },
            {
                path: "matieres",
                children: [
                    //Liste des matiere
                    {
                        path: "",
                        name: "Matieres",
                        component: () => ListeMatieres,
                        meta: { title: "Mes matières" }
                    },
                    //Detail d'une matiere
                    {
                        path: "/matiere/:matiereId",
                        name: "DetailMatiere",
                        component: () => DetailMatiere,
                        meta: { title: 'Détails de la matière' },
                    },
                    //Chapitre d'un cours specifiue
                    {
                        path: ":matiereId/cours/:coursId",
                        name: "CoursChapitres",
                        component: () => CoursChapitres,
                        meta: {
                            title: "Chapitres du cours"
                        }
                    },
                    //Leçon d'un cours spécifique
                    {
                        path: ":matiereId/cours/:coursId/chapitre/:chapitreId/lecon/:leconId",
                        name: "Leçon",
                        component: () => Leçon,
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