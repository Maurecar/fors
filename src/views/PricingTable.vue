<template>
    <div>
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-bold">prices List</h1>
            
            <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
        </div>
        <div v-if="!priceLoading">
            <table class="table-auto">
                <thead>
                    <tr>
                        <th class="px-4 py-2">number of passengers</th>
                        <th class="px-4 py-2">Pricing</th>
                        <th>Actions</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="price in priceResult.Pricing" :key="price.id">
                        <td class="border px-4 py-2">{{ price.passengers }}</td>
                        <td class="border px-4 py-2">{{ price.cost }}</td>
                        <td class="border px-4 py-2">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                >Update</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import { useSignOut, useUserId } from '@nhost/vue'
import { useQuery, useMutation } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2';

const router = useRouter();  

const { signOut } = useSignOut()
const { userId } = useUserId()

const logout = () => {
  signOut()
  router.push('/login')
}

const {
  loading: priceLoading,
  result: priceResult,
  refetch: priceRefetch
} = useQuery(gql`
    query GetPricing {
        Pricing {
            id
            passengers
            cost
  }
}
  `)

</script>
