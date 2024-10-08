<template>
  <div>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text text-lg sm:text-sm font-bold">Reservations List</h1>
      <button @click="redirectToCreateArrival" class="text-green-500 hover:underline cursor-pointer">Create
        Reservation</button>
      <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
    </div>
    <div v-if="!reservationLoading">
      <table class="table-container">
        <thead class="sticky top-0 dark:bg-slate-800 bg-white">
          <tr>
            <th class="border px-2 py-1"># of reservation</th>
            <th class="border px-4 py-2">Trip</th>
            <th class="border px-4 py-2">Customer</th>
            <th class="border px-0 py-0">Phone</th>
            <th class="border px-4 py-2">Pickup Date</th>
            <th class="border px-2 py-1">Landing Time</th>
            <th class="border px-4 py-2">Pickup Time</th>
            <th class="border px-2 py-1">From</th>
            <th class="border px-2 py-1">to</th>
            <th class="border px-2 py-1">departure time</th>
            <th class="border px-4 py-2">Delete</th>
            <th class="border px-4 py-2">Update</th>
            <th class="border px-4 py-2">View</th>
          </tr>
        </thead>
        <tr v-for="n in reservationResult.reservation" :key="n.id">
          <td class="border px-4 py-2">FORS{{ n.id }}</td>
          <td class="border px-4 py-2">{{ n.way }}</td>
          <td class="border px-4 py-2">{{ n.customer }}</td>
          <td class="border px-0 py-0">{{ n.phone }}</td>
          <td class="border px-0 py-2">{{ formatDate(n.pickup_time) }}</td>
          <td class="border px-2 py-1">{{ n.landing_time }}</td>
          <td class="border px-2 py-1">{{ formatTime(n.pickup_time) }}</td>
          <td class="border px-2 py-1">{{ n.from }}</td>
          <td class="border px-2 py-1">{{ n.to }}</td>
          <td class="border px-2 py-1">{{ n.departure_time }}</td>
          <!-- hacer aqui antes de enviar -->
          <td class="border px-4 py-2">
            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              @click="() => handleDeleteReservation({ id: n.id })">Delete</button>
          </td>
          <td class="border px-4 py-2">
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              @click="() => loadDataForUpdate(n)">Update</button>
          </td>
          <td class="border px-4 py-2">
            <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
              @click="() => loadDataForView(n)">View</button>
          </td>
        </tr>
      </table>
    </div>
    <edit-modal v-if="showModal" :reservation="selectedReservation" @close="closeEditModal" />
    <see-modal v-if="showModal" :reservation="selectedReservation" @close="closeSeeModal" />

  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useSignOut, useUserId } from "@nhost/vue";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import EditModal from "@/components/EditModal.vue";
import SeeModal from "@/components/SeeModal.vue"
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
          driver2
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
          vehicle2
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
//para cargar los datos en swal

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

const openSeeModal = (reservation) => {
  selectedReservation.value = reservation;
  showModal.value = true;
}

const openEditModal = (reservation) => {
  selectedReservation.value = reservation;
  showModal.value = true;

};

const closeSeeModal = () => {
  showModal.value = false;
  selectedReservation.value = null;
  reservationRefetch();
};

const closeEditModal = () => {
  showModal.value = false;
  selectedReservation.value = null;
  reservationRefetch();
};

const loadDataForView = (reservation) => {
  const fechaf = new Date(reservation.pickup_time);
  const fechaf2 = new Date(reservation.date_reserv);

  const formattedDate = fechaf.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
  const formattedDate2 = fechaf2.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  const formattedTime = fechaf.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
  if (reservation.way === "One Way") {
    if (reservation.from.toLowerCase() === "hayden airport") {
      console.log(reservation.pickup_time)
      swal.fire({
        title: 'ARRIVAL',
        html: 'Reservation Number FORS' + reservation.id +
          "<br> Date: " + formattedDate +
          "<br> from: " + reservation.from +
          "<br> to: " + reservation.to +
          "<br> Pick-up time: " + formattedTime +
          "<br> Flight departure time: " + reservation.landing_time +
          "<br> Name: " + reservation.customer +
          "<br> Phone: " + reservation.phone + reservation.phone2 +
          "<br> Adults: " + reservation.adult +
          "<br> kids: " + reservation.kid +
          "<br> Car seat: " + reservation.carseat +
          "<br> Booster seat: " + reservation.boosterseat +
          "<br> Vehicle: " + reservation.vehicle +
          "<br> Payment status, already paid: " + reservation.way.toLowerCase() + " cost: $ " + reservation.cost + " gratuity: $" + reservation.tip + " = Total: $ " + (reservation.cost + reservation.tip) +
          "<br> Payment  method: " + reservation.payment_met +
          "<br> Email: " + reservation.email +
          "<br> Dispatcher's name: " + reservation.dispatcher +
          "<br> Driver's name: " + reservation.driver +
          "<br> Date of reservation: " + formattedDate2 +
          "<br> How do you hear about us?: " + reservation.heard +
          "<br> NOTES: " + reservation.note + "",
        icon: "info",
      })
    } else {
      swal.fire({
        title: 'DEPARTURE',
        html: 'Reservation Number FORS' + reservation.id +
          "<br> Date: " + formattedDate +
          "<br> from: " + reservation.from +
          "<br> to: " + reservation.to +
          "<br> Pick-up time: " + formattedTime +
          "<br> Flight departure time: " + reservation.landing_time +
          "<br> Name: " + reservation.customer +
          "<br> Phone: " + reservation.phone + reservation.phone2 +
          "<br> Adults: " + reservation.adult +
          "<br> kids: " + reservation.kid +
          "<br> Car seat: " + reservation.carseat +
          "<br> Booster seat: " + reservation.boosterseat +
          "<br> Vehicle: " + reservation.vehicle +
          "<br> Payment status, already paid: " + reservation.way.toLowerCase() + " cost: $ " + reservation.cost + " gratuity: $" + reservation.tip + " = Total: $ " + (reservation.cost + reservation.tip) +
          "<br> Payment  method: " + reservation.payment_met +
          "<br> Email: " + reservation.email +
          "<br> Dispatcher's name: " + reservation.dispatcher +
          "<br> Driver's name: " + reservation.driver +
          "<br> Date of reservation: " + formattedDate2 +
          "<br> How do you hear about us?: " + reservation.heard +
          "<br> NOTES: " + reservation.note + "",
        icon: "info",
      })
    }
  } else {
    if (reservation.from.toLowerCase() === "hayden airport") {
      swal.fire({
        title: 'ROUND TRIP - ARRIVAL',
        html: 'Reservation Number FORS' + reservation.id + 
        "<br> Date: " + formattedDate +
          "<br> from: " + reservation.from +
          "<br> to: " + reservation.to +
          "<br> Pick-up time: " + formattedTime +
          "<br> Flight departure time: " + reservation.landing_time +
          "<br> Name: " + reservation.customer +
          "<br> Phone: " + reservation.phone + reservation.phone2 +
          "<br> Adults: " + reservation.adult +
          "<br> kids: " + reservation.kid +
          "<br> Car seat: " + reservation.carseat +
          "<br> Booster seat: " + reservation.boosterseat +
          "<br> Vehicle: " + reservation.vehicle +
          "<br> Payment status, already paid: " + reservation.way.toLowerCase() + " cost: $ " + reservation.cost + " gratuity: $" + reservation.tip + " = Total: $ " + (reservation.cost + reservation.tip) +
          "<br> Payment  method: " + reservation.payment_met +
          "<br> Email: " + reservation.email +
          "<br> Dispatcher's name: " + reservation.dispatcher +
          "<br> Driver's name: " + reservation.driver +
          "<br> Date of reservation: " + formattedDate2 +
          "<br> How do you hear about us?: " + reservation.heard +
          "<br> NOTES: " + reservation.note +
          '<br> ====================================' + '<br>ROUND TRIP - DEPARTURE' +
          "<br> Date: " + formattedDate +
          "<br> from: " + reservation.from +
          "<br> to: " + reservation.to +
          "<br> Pick-up time: " + formattedTime +
          "<br> Flight departure time: " + reservation.landing_time +
          "<br> Name: " + reservation.customer +
          "<br> Phone: " + reservation.phone + reservation.phone2 +
          "<br> Adults: " + reservation.adult +
          "<br> kids: " + reservation.kid +
          "<br> Car seat: " + reservation.carseat +
          "<br> Booster seat: " + reservation.boosterseat +
          "<br> Vehicle: " + reservation.vehicle2 +
          "<br> Payment status, already paid: " + reservation.way.toLowerCase() + " cost: $ " + reservation.costreturn + " gratuity: $" + reservation.tipreturn + " = Total: $ " + (reservation.cost + reservation.tip) +
          "<br> Payment  method: " + reservation.payment_met +
          "<br> Email: " + reservation.email +
          "<br> Dispatcher's name: " + reservation.dispatcher +
          "<br> Driver's name: " + reservation.driver2 +
          "<br> Date of reservation: " + formattedDate2 +
          "<br> How do you hear about us?: " + reservation.heard +
          "<br> NOTES: " + reservation.note,

        icon: "info",
      })
    } else {
      swal.fire({
        title: 'ROUND TRIP - DEPARTURE',
        html: 'Reservation Number FORS' + reservation.id + 
        "<br> Date: " + formattedDate +
          "<br> from: " + reservation.from +
          "<br> to: " + reservation.to +
          "<br> Pick-up time: " + formattedTime +
          "<br> Flight departure time: " + reservation.landing_time +
          "<br> Name: " + reservation.customer +
          "<br> Phone: " + reservation.phone + reservation.phone2 +
          "<br> Adults: " + reservation.adult +
          "<br> kids: " + reservation.kid +
          "<br> Car seat: " + reservation.carseat +
          "<br> Booster seat: " + reservation.boosterseat +
          "<br> Vehicle: " + reservation.vehicle +
          "<br> Payment status, already paid: " + reservation.way.toLowerCase() + " cost: $ " + reservation.cost + " gratuity: $" + reservation.tip + " = Total: $ " + (reservation.costreturn + reservation.tipreturn) +
          "<br> Payment  method: " + reservation.payment_met +
          "<br> Email: " + reservation.email +
          "<br> Dispatcher's name: " + reservation.dispatcher +
          "<br> Driver's name: " + reservation.driver +
          "<br> Date of reservation: " + formattedDate2 +
          "<br> How do you hear about us?: " + reservation.heard +
          "<br> NOTES: " + reservation.note + 
          '<br> ====================================' + '<br>ROUND TRIP - ARRIVAL' +
          "<br> Date: " + formattedDate +
          "<br> from: " + reservation.from +
          "<br> to: " + reservation.to +
          "<br> Pick-up time: " + formattedTime +
          "<br> Flight departure time: " + reservation.landing_time +
          "<br> Name: " + reservation.customer +
          "<br> Phone: " + reservation.phone + reservation.phone2 +
          "<br> Adults: " + reservation.adult +
          "<br> kids: " + reservation.kid +
          "<br> Car seat: " + reservation.carseat +
          "<br> Booster seat: " + reservation.boosterseat +
          "<br> Vehicle: " + reservation.vehicle2 +
          "<br> Payment status, already paid: " + reservation.way.toLowerCase() + " cost: $ " + reservation.costreturn + " gratuity: $" + reservation.tipreturn + " = Total: $ " + (reservation.costreturn + reservation.tipreturn) +
          "<br> Payment  method: " + reservation.payment_met +
          "<br> Email: " + reservation.email +
          "<br> Dispatcher's name: " + reservation.dispatcher +
          "<br> Driver's name: " + reservation.driver2 +
          "<br> Date of reservation: " + formattedDate2 +
          "<br> How do you hear about us?: " + reservation.heard +
          "<br> NOTES: " + reservation.note
          ,
        icon: "info",
      })

    }
  }
}
const loadDataForUpdate = (reservation) => {
  selectedReservation.value = reservation;
  showModal.value = true;
  swal.fire({
    title: 'Alert',
    html: 'Attention: If you are going to update a round trip, you need to reselect the following dates and times:' +
      '<br>-Date and pick-up time' +
      '<br>-Landing time' +
      '<br>For return' +
      '<br>-Date and pick-up time' +
      '<br>-Departure time' +
      '<br>-Reservation date' +

      '<br>If you are going to update a one-way trip, you need to reselect the following dates and times:' +
      '<br>-Date and pick-up time' +
      '<br>-Landing time or departure time' +
      '<br>-Reservation date' +

      '<br>Note 1: The reservation will not be updated unless you select these hours and dates.' +

      '<br>Note 2: For now, the hours of departure time and landing need to be corrected since they are taking the current time of the PC. The correct time will be shown at the top of the picker. I will let you know as soon as I fix the problem.',
    customClass: {
      htmlContainer: 'text-left'
    },
    showClass: {
      popup: 'text-left'
    },
    grow: 'fullscreen'
  })
};
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}-${day}-${year}`;
};

const formatTime = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
};

</script>
<style scoped>
.text-left {
  text-align: left;
}

</style>