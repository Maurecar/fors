

<template>
    <div>
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold mb-4">Dispatchers Create</h1>
        <button @click="redirectToListDispatcher" class="text-green-500 hover:underline cursor-pointer">List Dispatcher</button>
        <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
      </div>
      <form @submit.prevent="handleCreateDispatcher" class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="dispatcher-name">
              Name:
            </label>
            <input id="dispatcher-name" v-model="newDispatcher.name" placeholder="Name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="dispatcher-phone">
              Phone:
            </label>
            <input id="dispatcher-phone" v-model="newDispatcher.phone" placeholder="Phone" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="dispatcher-email">
              Email:
            </label>
            <input id="dispatcher-email" v-model="newDispatcher.email" placeholder="Email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <input type="submit" value="Create Dispatcher" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" />
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useSignOut, useUserId } from '@nhost/vue'
  import { useMutation } from "@vue/apollo-composable";
  import { gql } from "@apollo/client/core";
  import Swal from 'sweetalert2'; 

  
  const router = useRouter()
  const { signOut } = useSignOut()
  const { userId } = useUserId()
  
  const logout = () => {
    signOut()
    router.push('/login')
  }
  
  const newDispatcher = ref({
    name: '',
    phone: '',
    email: ''
  })
  
  const { mutate: createDispatcher, onDone: createDone } = useMutation(gql`
      mutation InsertDispatcher($name: String, $phone: String, $email: String) {
        insert_Dispatcher(objects: {name: $name, phone: $phone, email: $email}) {
          affected_rows
          returning {
            name
            phone
            email
            id
          }
        }
    }
  `)
  
  createDone((result) => {
  if (result.errors) {
    console.error(result.errors);
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Dispatcher created successfully',
    });
    
  }
})
  const handleCreateDispatcher = async () => {
    if (!newDispatcher.value.name || !newDispatcher.value.email || !newDispatcher.value.phone) {
      return alert("Please fill all fields")
    }
    await createDispatcher({
      name: newDispatcher.value.name,
      phone: newDispatcher.value.phone,
      email: newDispatcher.value.email
    })
    newDispatcher.value = {
      name: '',
      phone: '',
      email: ''
    }
    redirectToListDispatcher()
    
  }
const redirectToListDispatcher = () => {
    router.push('/dispatchers')
    router.afterEach(() => {
    window.location.reload();
  });
}
  </script>