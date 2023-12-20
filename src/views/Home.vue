<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSignOut, useUserId } from '@nhost/vue'

import FullCalendar from '@fullcalendar/vue3'
//import FullCalendar from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import { useQuery } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";

const router = useRouter()
const { signOut } = useSignOut()
const reservations = ref([]);

const {
  loading: reservationLoading,
  result: reservationResult,
  refetch: reservationRefetch
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
`);

/* const mapToFullCalendarEvents = (reservation) => {
  const events = [];

  for (const n of reservation) {
    events.push({
      title: n.customer,
      start: n.pickup_time,
      end: n.re_pickup_time,
      display: 'list-item',
    });
  }
  return events;
};
 */
/* onMounted(async () => {
  await reservationRefetch();

  if (!reservationLoading.value && reservationResult.value) {
    n.value = reservationResult.value.reservation || [];
    calendarOptions.events = mapToFullCalendarEvents(reservationResult.value.reservations);
  }
});
 */
 const reservation = ref([]);

onMounted(async () => {
  await reservationRefetch();

  if (!reservationLoading.value && reservationResult.value) {
    reservation.value = reservationResult.value.reservation || [];
    calendarOptions.events = mapToFullCalendarEvents(reservation.value); // Pass the 'reservation' array directly to the function
  }
});

const mapToFullCalendarEvents = (reservation) => {
  const events = [];

  for (const n of reservation) {
    events.push({
      title: n.customer,
      start: n.pickup_time,
      end: n.re_pickup_time,
      display: 'list-item',
    });
  }
  return events;
};

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin],
  initialView: 'dayGridMonth',
  timeZone: 'America/Denver',
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  events: [],

  eventTimeFormat: {
    hour: '2-digit',
    minute: '2-digit',
    meridiem: 'short',
    timezone: 'America/Denver',
  },
});
const logout = () => {
  signOut()
  router.push('/login')
}


</script>

<template>
  <main>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text 3xl font-bold">First Option Ride Service App</h1>
      <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
    </div>
  </main>
  <h1>Welcome to app </h1>
  <!-- <div v-if="!reservationLoading">
    <table class="table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Customer</th>
          <th class="px-4 py-2">time</th>
          <th class="px-4 py-2">landing_time</th>
          <th class="px-2 py-1">date reser</th>

          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody v-if="reservationResult && reservationResult.reservation">

        <tr v-for="n in reservationResult.reservation" :key="n.id">
          <td class="border px-4 py-2">{{ n.customer }}</td>
          <td class="border px-4 py-2">{{ n.pickup_time }}</td>
          <td class="border px-4 py-2">{{ n.re_pickup_time }}</td>
          <td class="border px-2 py-1">{{ n.vehicle}}</td>

          <td class="border px-4 py-2"></td>
        </tr>
      </tbody>
    </table>
  </div> -->
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
  
</template>
