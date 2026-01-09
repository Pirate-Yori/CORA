<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter()
const goBack = () => {
    router.back();
}
const goHome =()=>{
    router.push({name:'Home'});
}
</script>

<template>
    <div class="main-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div class="text-center max-w-md">
            <!-- Icon -->
            <div class="mb-8">
                <span class="text-8xl">🔍</span>
            </div>

            <!-- Title -->
            <h1 class="text-6xl font-bold text-secondary-900 mb-4">404</h1>
            <h2 class="text-6xl font-semibold text-secondary-700 mb-4">Page non trouvée</h2>

            <!-- Description -->
            <p class="text-secondary-600 mb-8">
                Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
            </p>

            <!-- Actions -->
            <div class="flex gap-4 justify-center">
                <button @click="goBack" class="btn btn-outline">Retour</button>
                <button @click="goHome" class="btn btn-primary">Accueil</button>
            </div>
        </div>
    </div>
</template>