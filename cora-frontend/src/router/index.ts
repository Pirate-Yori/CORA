import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import authRoutes from "./routes/auth.routes";
import { authGuard } from "./guards/auth.guard";
import homeRoutes from "./routes/home.route";

const routes: RouteRecordRaw[]=[
    //Redirection Dashbord
    {
        path:"/",
        redirect:'/home',
    },
    ...authRoutes,
    ...homeRoutes,
    //Route 404 - Page non trouvée
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import("@views/errors/NotFoundView.vue"),
        meta: {
            title: 'Page non trouvée'
        }
    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    scrollBehavior(to, from, savePosition) {
        if (savePosition) {
            return savePosition;
        } else {
            return { top: 0 };
        }
    },
    routes
})

router.beforeEach(authGuard);

//Mise à jour du titre de la page
router.afterEach(to=>{
    const baseTitle= import.meta.env.VITE_APP_TITLE || "CORA e-Lerning"
    document.title = to.meta.title ? `${to.meta.title} - ${baseTitle}`: baseTitle
})

export default router;