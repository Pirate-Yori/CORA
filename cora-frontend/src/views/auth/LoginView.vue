<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const handleLogin = ()=>{
    return router.push({name:'Home'})
}

</script>
<template>
    <LoginForm @success="handleLogin"/>
</template>