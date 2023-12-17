<template>
    <div>
        <div class="">
            <h1 class="text-3xl font-bold">Dispatchers List</h1>
            <button @click="redirectToCreateDispatcher" class="text-green-500 hover:underline cursor-pointer">Create dispatcher</button>
            <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
        </div>
        <div v-if="!dispatcherLoading">
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
                    <tr v-for="dispatcher in dispatcherResult.Dispatcher" :key="dispatcher.id">
                        <td class="border px-4 py-2">{{ dispatcher.name }}</td>
                        <td class="border px-4 py-2">{{ dispatcher.phone }}</td>
                        <td class="border px-4 py-2">{{ dispatcher.email }}</td>
                        <td class="border px-4 py-2">
                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                @click="() => deleteDispatcher({ id: dispatcher.id })">Delete</button>
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
    loading: dispatcherLoading,
    result: dispatcherResult,
    refetch: dispatcherRefetch
} = useQuery(gql`
    query GetDispatcher {
  Dispatcher {
    id
		email
		name
		phone
  }
}
  `)

const { mutate: deleteDispatcher, onDone: deleteDone } = useMutation(gql`
  mutation ($id: Int!) {
    delete_Dispatcher (where: {id: {_eq: $id}}){
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
      text: 'Dispatcher deleted successfully',
    });
    dispatcherRefetch();
  }
})
const handleDeleteDispatcher = ({ id }) => {
    deleteDispatcher({ id })
}

const redirectToCreateDispatcher = () => {
    router.push('/createdispatchers')
}

</script>