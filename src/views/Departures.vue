<template>
    <div>
        <div class="flex items-center justify-between mb-8">
            <h1 class="text-3xl font-bold">Departures List</h1>
            <button @click="redirectToCreateDeparture" class="text-green-500 hover:underline cursor-pointer">Create
                Departure</button>
            <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
        </div>
        <div v-if="!departureLoading">
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
                    <tr v-for="n in departureResult.reservation" :key="n.id">
                        <td class="border px-4 py-2">{{ n.customer }}</td>
                        <td class="border px-4 py-2">{{ n.phone }}</td>
                        <td class="border px-4 py-2">{{ n.email }}</td>
                        <td class="border px-4 py-2">
                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                @click="() => deleteDeparture({ id: n.id })">Delete</button>
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

const router = useRouter()
const { signOut } = useSignOut()
const { userId } = useUserId()

const logout = () => {
    signOut()
    router.push('/login')
}

const {
    loading: departureLoading,
    result: departureResult,
    refetch: departureRefetch
} = useQuery(gql`
    query GetReservation {
  reservation {
    date_reserv
		cost
		costreturn
		tip
		tipreturn
		adult
		boosterseat
		carseat
		id
		kid
		address
		customer
		dispatcher
		driver
		email
		flight
		from
		heard
		note
		payment_met
		phone
		phone2
		pick_location
		status
		to
		tosec
		vehicle
		way
		departure_time
		landing_time
		pickup_time
		re_pickup_time
  }
}
    
  `)

const { mutate: deleteDeparture, onDone: deleteDone } = useMutation(gql`
  mutation ($id: Int!) {
    delete_reservation (where: {id: {_eq: $id}}){
        affected_rows
    } 
  }
`)

deleteDone(() => {
    departureRefetch()

    refetchQueries({ include: "active" })
})
const handleDeleteDeparture = ({ id }) => {
    deleteDeparture({ id })
}

const redirectToCreateDeparture = () => {
    router.push('/createdepartures')
}

</script>