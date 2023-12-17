<template>
    <div>
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-bold">Customers List</h1>
            <button @click="redirectToCreateCustomer" class="text-green-500 hover:underline cursor-pointer">Create Customer</button>
            <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
        </div>
        <div v-if="!customerLoading">
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
                    <tr v-for="customer in customerResult.customers" :key="customer.id">
                        <td class="border px-4 py-2">{{ customer.name }}</td>
                        <td class="border px-4 py-2">{{ customer.phone }}</td>
                        <td class="border px-4 py-2">{{ customer.email }}</td>
                        <td class="border px-4 py-2">
                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                @click="() => deleteCustomer({ id: customer.id })">Delete</button>
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
    loading: customerLoading,
    result: customerResult,
    refetch: customerRefetch
} = useQuery(gql`
    query {
      customers(order_by: { id: desc }) {
        id
        name
        phone
        email
      }
    }
  `)

const { mutate: deleteCustomer, onDone: deleteDone } = useMutation(gql`
  mutation ($id: Int!) {
    delete_customers (where: {id: {_eq: $id}}){
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
      text: 'Customer deleted successfully',
    });
    customerRefetch();
  }
})
const handleDeleteCustomer = ({ id }) => {
    deleteCustomer({ id })
   
}

const redirectToCreateCustomer = () => {
    router.push('/createcustomers')
}

</script>