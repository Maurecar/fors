<template>
    <div>
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-bold">Reservations List</h1>
        <button @click="redirectToCreateArrival" class="text-green-500 hover:underline cursor-pointer">Create
          Reservation</button>
        <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
      </div>
        <div v-if="!reservationLoading ">
        <table class="table-auto">
          <thead>
            <tr>
              <th class="px-4 py-2"># of reservation</th>
              <th class="px-4 py-2">Customer</th>
              <th class="px-4 py-2">Phone</th>
              <th class="px-4 py-2">Pickup Time</th>
              <th class="px-2 py-1">departure time</th>
              <th class="px-2 py-1">to</th>
              <th class="px-2 py-1">Landing Time</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tr v-for="n in reservationResult.reservation" :key="n.id">
            <td class="border px-4 py-2">FORS{{ n.id }}</td>
            <td class="border px-4 py-2">{{ n.customer }}</td>
            <td class="border px-4 py-2">{{ n.phone }}</td>
            <td class="border px-4 py-2">{{ n.pickup_time }}</td>
            <td class="border px-2 py-1">{{ n.departure_time }}</td>
            <td class="border px-2 py-1">{{ n.to }}</td>
            <td class="border px-2 py-1">{{ n.landing_time }}</td> 
            <!-- hacer aqui antes de enviar -->
            <td class="border px-4 py-2">
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                @click="() => handleDeleteReservation({ id: n.id })">Delete</button>
            </td>
            <td class="border px-4 py-2">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="() => loadDataForUpdate(n)">Update</button>
  </td>
          </tr>
        </table>
      </div>
      <edit-modal v-if="showModal" :reservation="selectedReservation" @close="closeEditModal" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useSignOut, useUserId } from "@nhost/vue";
  import { useQuery, useMutation } from "@vue/apollo-composable";
  import { gql } from "@apollo/client/core";
  import EditModal from "@/components/EditModal.vue"; 
  import swal from "sweetalert2"
  
  const router = useRouter();
  const { signOut } = useSignOut();
  const { userId } = useUserId();
  
  const logout = () => {
    signOut();
    router.push("/login");
  };
  let updateId = ref('');
let updateCustomer = ref('');
let updatePhone = ref('');
let updatePickupTime = ref('');
let updateDepartureTime = ref('');
let updateTo = ref('');
  const {
    loading: reservationLoading,
    result: reservationResult,
    refetch: reservationRefetch,
  } = useQuery(
    gql`
      query GetReservation {
        reservation(order_by: { id: desc }) {
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
    `
  );
  
  const { mutate: deleteReservation, onDone: deleteDone } = useMutation(
    gql`
      mutation ($id: Int!) {
        delete_reservation(where: { id: { _eq: $id } }) {
          affected_rows
        }
      }
    `
  );

  function dateToString(date) {
    if (!(date instanceof Date)) {
        console.error('Input is not a valid Date object');
        return null;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const timezoneOffset = date.getTimezoneOffset();
    const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
    const offsetMinutes = Math.abs(timezoneOffset) % 60;
    const timezone = '+00:00';
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`;

    return formattedDate;
}
  
  deleteDone(() => {
    reservationRefetch();
  
    refetchQueries({ include: "active" });
  });
  const handleDeleteReservation = ({ id }) => {
  // Mostrar el mensaje de confirmación con swal
  swal.fire({
    title: "Are you sure you want to delete this Reservation",
    text: "You can’t recover this reservation once you delete it.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, Delete",
    cancelButtonText: "No, cancel"
  }).then((result) => {
    // Verificar la respuesta del usuario
    if (result.isConfirmed) {
      // Llamar a la función para eliminar la reserva
      deleteReservation({ id });
      // Mostrar un mensaje de éxito
      swal.fire("Deleted", "The reservation has been deleted.", "success");
    } else {
      // Mostrar un mensaje de cancelación
      swal.fire("Cancelled", "The reservation has not been deleted.", "error");
    }
  });
};
  
  const redirectToCreateArrival = () => {
    router.push("/createarrivals");
  };
  const showModal = ref(false); 
  const selectedReservation = ref(null); 
  const openEditModal = (reservation) => {
    selectedReservation.value = reservation;    
    showModal.value = true;
    
  };
  
  const closeEditModal = () => {
    showModal.value = false;
    selectedReservation.value = null;
    reservationRefetch();
  };

  const loadDataForUpdate = (reservation) => {
  selectedReservation.value = reservation;
  showModal.value = true;swal.fire({
        title: 'Alert',
        html:'Attention: If you are going to update a round trip, you need to reselect the following dates and times:'+
                '<br>-Date and pick-up time'+
                '<br>-Landing time'+
                '<br>For return'+
                '<br>-Date and pick-up time'+
                '<br>-Departure time'+
                '<br>-Reservation date'+

                '<br>If you are going to update a one-way trip, you need to reselect the following dates and times:'+
                '<br>-Date and pick-up time'+
                '<br>-Landing time or departure time'+
                '<br>-Reservation date'+

                '<br>Note 1: The reservation will not be updated unless you select these hours and dates.'+

                '<br>Note 2: For now, the hours of departure time and landing need to be corrected since they are taking the current time of the PC. The correct time will be shown at the top of the picker. I will let you know as soon as I fix the problem.'
                
    })
};
  </script>
  