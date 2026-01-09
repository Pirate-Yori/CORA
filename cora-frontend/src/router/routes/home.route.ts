import type { RouteRecordRaw } from "vue-router";

const homeRoutes:RouteRecordRaw[]=[
    {
        path:"/home",
        component:()=>import("@layouts/HomeLayout.vue"),
        meta:{
            requiresAuth:false,
        },children:[
            {
                path:"",
                name:"Home",
                component:()=>import("@views/home/HomeView.vue"),
                meta:{
                    title:"Accueil"
                }
            },
            {
                path:"/profile",
                name:"Profile",
                component:()=>import("@views/auth/ProfileView.vue"),
                meta:{
                    title:"Profile"
                }
            },
        ]
    }
]
export default homeRoutes