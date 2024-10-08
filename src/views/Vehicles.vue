<template>
    <div>
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">Vehicles List</h1>
        <button @click="redirectToCreateVehicle" class="text-green-500 hover:underline cursor-pointer">Create Vehicle</button>
        <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
      </div>
      <div v-if="!vehicleLoading">
        <table class="table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2">Name</th>
              <th class="px-4 py-2">Licence</th>
              <th class="px-4 py-2">Owner</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vehicle in vehicleResult.Vehicle" :key="vehicle.id">
              <td class="border px-4 py-2">{{ vehicle.name }}</td>
              <td class="border px-4 py-2">{{ vehicle.licence }}</td>
              <td class="border px-4 py-2">{{ vehicle.owner }}</td>
              <td class="border px-4 py-2">
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  @click="() => deleteVehicle({ id: vehicle.id })">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
    
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useSignOut, useUserId } from '@nhost/vue'
  import { useQuery, useMutation } from "@vue/apollo-composable";
  import { gql } from "@apollo/client/core";
  import Swal from 'sweetalert2';
  
  
  const router = useRouter()
  const { signOut } = useSignOut()
  const { userId } = useUserId()
  
  const logout = () => {
    signOut()
    router.push('/login')
  }
  
  const {
    loading: vehicleLoading,
    result: vehicleResult,
    refetch: vehicleRefetch
  } = useQuery(gql`
      query GetVehicle {
    Vehicle {
        id
        name
        licence
        owner
    }
  }
    `)
  
  const { mutate: deleteVehicle, onDone: deleteDone } = useMutation(gql`
    mutation ($id: Int!) {
      delete_Vehicle (where: {id: {_eq: $id}}){
          affected_rows
      } 
    }
  `)
  
  deleteDone((result) => {
    if (result.errors) {
      console.error(result.errors);
    } else {
      Swal.fire({
        icon: 'success',
        title: 'Éxito',
        text: 'Vehicle deleted successfully',
      });
      vehicleRefetch();
    }
  })
  const handleDeleteVehicle = ({ id }) => {
    deleteVehicle({ id })
  }
  
  const redirectToCreateVehicle = () => {
    router.push('/createvehicles')
  }
  
  </script>