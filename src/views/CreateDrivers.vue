

<template>
    <div>
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold mb-4">Customers Create</h1>
        <button @click="redirectToListDriver" class="text-green-500 hover:underline cursor-pointer">List Driver</button>
        <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
      </div>
      <form @submit.prevent="handleCreateDriver" class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="customer-name">
              Name:
            </label>
            <input id="driver-name" v-model="newDriver.name" placeholder="Name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="customer-phone">
              Phone:
            </label>
            <input id="driver-phone" v-model="newDriver.phone" placeholder="Phone" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="customer-email">
              Email:
            </label>
            <input id="driver-email" v-model="newDriver.email" placeholder="Email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <input type="submit" value="Create Driver" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" />
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useSignOut, useUserId } from '@nhost/vue'
  import { useMutation, useQuery } from "@vue/apollo-composable";
  import { gql } from "@apollo/client/core";
  import Swal from 'sweetalert2'
  

    
  const router = useRouter()
  const { signOut } = useSignOut()
  const { userId } = useUserId()
  
  const logout = () => {
    signOut()
    router.push('/login')
  }
  
  const newDriver = ref({
    name: '',
    phone: '',
    email: ''
  })
  
  const { mutate: createDriver, onDone: createDone } = useMutation(gql`
    mutation InsertDriver($email: String, $name: String, $phone: String) {
  insert_Driver(objects: {email: $email, name: $name, phone: $phone}) {
    affected_rows
    returning {
      id
			email
			name
			phone
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
      text: 'Driver created successfully',
    });
    
  }
})
  const handleCreateDriver = async () => {
    if (!newDriver.value.name || !newDriver.value.email || !newDriver.value.phone) {
      return alert("Please fill all fields")
    }
    await createDriver({
      name: newDriver.value.name,
      phone: newDriver.value.phone,
      email: newDriver.value.email
    }
    )
    newDriver.value = {
      name: '',
      phone: '',
      email: ''
    }
  
    redirectToListDriver();
    
  }
  const redirectToListDriver = () => {
    router.push('/drivers')
    router.afterEach(() => {
    window.location.reload();
  });
}
  </script>