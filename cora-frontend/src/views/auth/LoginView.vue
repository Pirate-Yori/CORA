<script setup lang="ts">
import LoginForm from '@/components/auth/LoginForm.vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter()
const route = useRoute()
const handleLogin = ()=>{
    const redirectTo = route.query.redirectTo as string || '/dasboard'
    return router.push(redirectTo)
}
const register = ()=>{
    return router.push({name:"Register"})
}

</script>
<template>
    <LoginForm @success="handleLogin" @register="register"/>
</template>