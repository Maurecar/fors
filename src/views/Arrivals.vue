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
              <th class="px-4 py-2">Customer</th>
              <th class="px-4 py-2">Phone</th>
              <th class="px-4 py-2">Pickup Time</th>
              <th class="px-2 py-1">departure time</th>
              <th class="px-2 py-1">to</th>
              <th class="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tr v-for="n in reservationResult.reservation" :key="n.id">
            <td class="border px-4 py-2">{{ n.customer }}</td>
            <td class="border px-4 py-2">{{ n.phone }}</td>
            <td class="border px-4 py-2">{{ n.pickup_time }}</td>
            <td class="border px-2 py-1">{{ n.departure_time }}</td>
            <td class="border px-2 py-1">{{ n.to }}</td>
            <td class="border px-4 py-2">
              <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                @click="() => handleDeleteReservation({ id: n.id })">Delete</button>
              <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                @click="() => openEditModal(n)">Update</button>
            </td>
            <td class="border px-4 py-2">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      @click="() => loadDataForUpdate(n)">Update</button>
  </td>
          </tr>
        </table>
      </div>
  
      <!-- Añadir el componente modal aquí -->
      <edit-modal v-if="showModal" :reservation="selectedReservation" @close="closeEditModal" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import { useSignOut, useUserId } from "@nhost/vue";
  import { useQuery, useMutation } from "@vue/apollo-composable";
  import { gql } from "@apollo/client/core";
  import EditModal from "@/components/EditModal.vue"; // Importar el componente modal
  
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
  
  deleteDone(() => {
    reservationRefetch();
  
    refetchQueries({ include: "active" });
  });
  const handleDeleteReservation = ({ id }) => {
    deleteReservation({ id });
  };
  
  const redirectToCreateArrival = () => {
    router.push("/createarrivals");
  };
  
  // Añadir las variables para controlar el estado del modal
  const showModal = ref(false); // Indica si el modal está abierto o no
  const selectedReservation = ref(null); // Guarda la reserva seleccionada para editar
  
  // Añadir las funciones para abrir y cerrar el modal
  const openEditModal = (reservation) => {
    // Asigna la reserva al estado
    selectedReservation.value = reservation;
    // Abre el modal
    showModal.value = true;
  };
  
  const closeEditModal = () => {
    // Cierra el modal
    showModal.value = false;
    // Limpia la reserva
    selectedReservation.value = null;
    // Refresca la lista de reservas
    reservationRefetch();
  };

  const loadDataForUpdate = (reservation) => {
  // Asigna la reserva al estado
  selectedReservation.value = reservation;
  // Abre el modal
  showModal.value = true;

  // Carga los datos en el formulario de actualización
  //updateId.value = reservation.id;
  updateCustomer.value = reservation.customer;
  updatePhone.value = reservation.phone;
  updatePickupTime.value = reservation.pickup_time;
  updateDepartureTime.value = reservation.departure_time;
  updateTo.value = reservation.to;
  // ... otros campos del formulario
};
  </script>
  