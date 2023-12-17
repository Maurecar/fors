<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-3xl font-bold">Drivers List</h1>
      <button @click="redirectToCreateDriver" class="text-green-500 hover:underline cursor-pointer">Create Driver</button>
      <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
    </div>
    <div v-if="!driverLoading">
      <table class="table-auto">
        <thead>
          <tr>
            <th class="px-4 py-2">Name</th>
            <th class="px-4 py-2">Phone</th>
            <th class="px-4 py-2">Email</th>
            <th class="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="driver in driverResult.Driver" :key="driver.id">
            <td class="border px-4 py-2">{{ driver.name }}</td>
            <td class="border px-4 py-2">{{ driver.phone }}</td>
            <td class="border px-4 py-2">{{ driver.email }}</td>
            <td class="border px-4 py-2">
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                @click="() => deleteDriver({ id: driver.id })">Delete</button>
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
  loading: driverLoading,
  result: driverResult,
  refetch: driverRefetch
} = useQuery(gql`
    query GetDriver {
  Driver {
    id
		email
		name
		phone
  }
}
  `)

const { mutate: deleteDriver, onDone: deleteDone } = useMutation(gql`
  mutation ($id: Int!) {
    delete_Driver (where: {id: {_eq: $id}}){
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
      text: 'Driver deleted successfully',
    });
    driverRefetch();
  }
})
const handleDeleteDriver = ({ id }) => {
  deleteDriver({ id })
}

const redirectToCreateDriver = () => {
  router.push('/createdrivers')
}

</script>