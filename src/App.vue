<template>
  <Navbar v-if="!$route.meta.hideNavbar" />
  <router-view></router-view>
</template>
<script setup>
import Navbar from './components/Navbar.vue'
import Login from './views/Login.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      hideNavbar: true
    }
  },
  
]

</script>