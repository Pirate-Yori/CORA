<script setup lang="ts">
import RegisterForm from '@components/auth/RegisterForm.vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const goToLogin = ()=>{
    console.log('emmit declenché')
router.push({name:"Login"})
}
const handleSuccess = ()=>{
    router.push({name:"Home"})
}
</script>

<template>
    <div>
        <RegisterForm @success="goToLogin" @login="goToLogin"/>
    </div>
</template>