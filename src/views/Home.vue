<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useSignOut, useUserId } from '@nhost/vue'

import FullCalendar from '@fullcalendar/vue3'
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
    company
  }
}
`);

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
    const startEvent = {
      title: n.company + " " + n.from,
      trip: n.way,
      start: n.pickup_time,
      end: n.pickup_time,
      customer: n.customer,
      phone: n.phone,
      display: 'list-item',
      color:'green',
    };

    const endEvent = {
      title: n.company + " " + n.from,
      start: n.re_pickup_time,
      end: n.re_pickup_time,
      customer: n.customer,
      phone: n.phone,
      trip: n.way,
      display: 'list-item',
      color: 'red',
    };

    events.push(startEvent);
    events.push(endEvent);
  }
  return events;
};

const calendarOptions = reactive({
  plugins: [dayGridPlugin, timeGridPlugin],
  initialView: 'dayGridMonth',
  timeZone: 'America/Denver',
  dayMaxEvents: true,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  events: [],
  eventClick: function(info) {
    if( info.event.title ==='Hayden airport'){
    alert( 'ARRIVAL:' +
    ' \nFrom: ' + info.event.title +
    ' \ncustomer: ' + info.event._def.extendedProps.customer +
    ' \nphone: ' + info.event._def.extendedProps.phone  +
    ' \nType of trip: ' + info.event._def.extendedProps.trip );
  } else {
      alert('DEPARTURE:' +
      ' \nFrom: ' + info.event.title +
      ' \ncustomer: ' + info.event._def.extendedProps.customer +
      ' \nphone: ' + info.event._def.extendedProps.phone  +
      ' \nType of trip: ' + info.event._def.extendedProps.trip );
    }

  },

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
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
  
</template>
