

<template>
    <div>
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold mb-4">Add Vehicles</h1>
        <button @click="redirectToListVehicle" class="text-green-500 hover:underline cursor-pointer">List Vehicle</button>
        <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
      </div>
      <form @submit.prevent="handleCreateVehicle" class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="vehicle-name">
              Vehicle´s Model:
            </label>
            <input id="vehicle-name" v-model="newVehicle.name" placeholder="Vehicle´s Model" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="vehicle-licence">
              Licence Plate:
            </label>
            <input id="vehicle-licence" v-model="newVehicle.licence" placeholder="licence" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="vehicle-owner">
              Driver´s name:
            </label>
            <input id="vehicle-owner" v-model="newVehicle.owner" placeholder="Driver´s name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <input type="submit" value="Create Vehicle" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" />
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
  
  const newVehicle = ref({
    name: '',
    licence: '',
    owner: ''
  })
  
  const { mutate: createVehicle, onDone: createDone } = useMutation(gql`
      mutation InsertVehicle($name: String, $licence: String, $owner: String) {
        insert_Vehicle(objects: {name: $name, licence: $licence, owner: $owner}) {
          affected_rows
          returning {
            name
            licence
            owner
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
      text: 'Vehicle created successfully',
    });
    
  }
})
  const handleCreateVehicle = async () => {
    if (!newVehicle.value.name || !newVehicle.value.owner || !newVehicle.value.licence) {
      return alert("Please fill all fields")
    }
    await createVehicle({
      name: newVehicle.value.name,
      licence: newVehicle.value.licence,
      owner: newVehicle.value.owner
    })
    newVehicle.value = {
      name: '',
      licence: '',
      owner: ''
    }
    redirectToListVehicle()
    
  }
const redirectToListVehicle = () => {
    router.push('/vehicles')
    router.afterEach(() => {
    window.location.reload();
  });
}
  </script>