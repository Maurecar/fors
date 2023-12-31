<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import {
  useSignInEmailPassword,
  useSignUpEmailPassword
} from '@nhost/vue'

const router = useRouter()
const isRegister = ref(false)
const email = ref('')
const password = ref('')
const { signUpEmailPassword } = useSignUpEmailPassword()
const { signInEmailPassword } = useSignInEmailPassword()
const registerOrLogin = async () => {
  if (!email.value || !password.value) {
    return alert("Please fill in all fields")
  }
  try {
    if (isRegister.value) {      
      await signUpEmailPassword(email.value, password.value);
    } else {      
      await signInEmailPassword(email.value, password.value);
    }
    router.push('/');
  } catch (error) {
    alert(error.message);
}

router.push('/')
}
</script>
<template>
  <main>
    <h1 class="text-4xl font-bold mb-8">FORS APP</h1>
    <div class="image">
      <img src="https://firstoptionrideservicellc.com/wp-content/uploads/2023/08/500x500.webp" alt="Fors Logo" align-items="center">
    </div>
    <form @submit.prevent="registerOrLogin">
      <h3>Login or Register</h3>
      <label>
        <input type="checkbox" v-model="isRegister" />
        Register?
      </label>
      <label class="block mb-4">
        <span class="block text-sm uppercase mb-2">Email</span>
        <input type="email" v-model="email" placeholder="Enter your email"
          class="block w-full text-slate-800 px-4 py-2" />
      </label>
      <label class="block mb-4">
        <span class="block text-sm uppercase mb-2">Password</span>
        <input type="password" v-model="password" placeholder="Enter your password"
          class="block w-full text-slate-800 px-4 py-2" />
      </label>
      <input type="submit" value="Login or SignUp" class="text-green-500 hover:underline cursor-pointer" />
    </form>
  </main>
</template>
<style scoped>
img {
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  justify-items: center;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>