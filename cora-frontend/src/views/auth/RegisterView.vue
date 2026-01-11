<script setup lang="ts">
import RegisterForm from '@components/auth/RegisterForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const goToLogin = ()=>{
router.push({name:"Login"})
}
const handleSuccess = ()=>{
    router.push({name:"Home"})
}
</script>

<template>
    <div>
        <RegisterForm @success="handleSuccess" @login="goToLogin"/>
    </div>
</template>