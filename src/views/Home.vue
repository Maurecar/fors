<script setup>
import { ref, onMounted, reactive, initCustomFormatter, setBlockTracking } from 'vue'
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
const titulo ='';
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
    company
  }
}
`);

const reservation = ref([]);

onMounted(async () => {
  await reservationRefetch();

  if (!reservationLoading.value && reservationResult.value) {
    reservation.value = reservationResult.value.reservation || [];
    calendarOptions.events = mapToFullCalendarEvents(reservation.value); 
  }
});

const mapToFullCalendarEvents = (reservation) => {
  const events = [];

  for (const n of reservation) {
    const startEvent = {
      title: n.company + " " + (n.from === 'Hayden airport' ? '(H/S)' : '(S/H)')+ " " + 
      (n.driver === 'Mauricio Vasquez' ? 'M' : (n.driver === 'Jarvi Colchado' ? 'J' : (n.driver === 'Tatiana Frolova' ? 'T' :(n.driver === 'Ivan Aguilar' ? 'Iv' :'X')))) + " " + (n.adult + n.kid )+ "P",
      trip: n.way,
      from: n.from,
      start: n.pickup_time,
      end: n.pickup_time,
      customer: n.customer,
      phone: n.phone,
      to: n.to,
      loc: n.pick_location,
      land: n.landing_time,
      dep: n.departure_time,
      kid: n.kid,
      adu: n.adult,
      veh: n.vehicle,
      veh2: n.vehicle2,
      land: n.landing_time,
      met: n.payment_met,
      email: n.email,
      flight: n.flight,
      dispat: n.dispatcher,
      driver: n.driver,
      driver2: n.driver2,
      reservation: n.date_reserv,
      note: n.note,
      cost: n.cost,
      costr: n.costreturn,
      tip: n.tip,
      tipr: n.tipreturn,

      display: 'block',
      color: (n.from === 'Hayden airport' ? 'black' : '#1d4ed8'),
    };

    const endEvent = {
      title: n.company + " " + (n.to === 'Hayden airport' ? '(H/S)' : '(S/H)') + " " +  
      (n.driver2 === 'Mauricio Vasquez' ? 'M' : (n.driver2 === 'Jarvi Colchado' ? 'J' : (n.driver2 === 'Tatiana Frolova' ? 'T' :(n.driver2 === 'Ivan Aguilar' ? 'Iv' :'X')))) + " " + (n.adult + n.kid )+ "P",
      start: n.re_pickup_time,
      end: n.re_pickup_time,
      customer: n.customer,
      phone: n.phone,
      to: n.to,
      loc: n.pick_location,
      land: n.landing_time,
      dep: n.departure_time,
      kid: n.kid,
      adu: n.adult,
      veh2: n.vehicle2,
      lan: n.landing_time,
      met: n.payment_met,
      email: n.email,
      flight: n.flight,
      dispat: n.dispatcher,
      driver: n.driver,
      driver2: n.driver2,
      reservation: n.date_reserv,
      note: n.note,
      cost: n.cost,
      costr: n.costreturn,
      tip: n.tip,
      tipr: n.tipreturn,
      from: n.from,

      display: 'block',
      color: (n.to === 'Hayden airport' ? 'black' : '#1d4ed8'),
      
    }
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
  aspectRatio: 0.7,
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  events: [],
  
  eventClick: function (info) {
    if (!"endevent" in info.event) {
      if (info.event.extendedProps['from'].includes("Hayden Airport")) {
        alert('END EVENT - ARRIVAL:'
          
        );
      } else if (eventType === 'departure') {
        alert('END EVENT - DEPARTURE:'
          
        );
      }
    } else {
      if (info.event.title.includes("S/H")) {
        alert('DEPARTURE:' +
          ' \nDate: ' + formatDate(info.event.start) +
          ' \nFrom: ' + 'Steamboat ' +
          ' - ' + info.event.extendedProps['loc'] +
          ' \nto: Hayden Airport' +
          ' \nTime: ' + formatTime(info.event.start) +
          ' \nDeparture time: ' + info.event.extendedProps['dep'] +
          ' \nName: ' + info.event.extendedProps['customer'] +
          ' \nPhone: ' + info.event.extendedProps['phone'] +
          ' \nAdult: ' + info.event.extendedProps['adu'] +
          ' \nKid: ' + info.event.extendedProps['kid'] +
          ' \nVehicle: ' + info.event.extendedProps['veh'] +
          ' \nPayment Status: Alredy paid: ' + info.event.extendedProps['trip'] +
          ' cost: $' + info.event.extendedProps['cost'] + ' tip: $' + info.event.extendedProps['tip'] +
          ' cost return: $' + info.event.extendedProps['costr'] + ' tip return: $ ' + info.event.extendedProps['tipr'] +
          ' \nPayment method: ' + info.event.extendedProps['met'] +
          ' \nEmail: ' + info.event.extendedProps['email'] +
          ' \nFlight: ' + info.event.extendedProps['flight'] +
          ' \nDispatcherS name: ' + info.event.extendedProps['dispat'] +
          ' \nDriverS name: ' + info.event.extendedProps['driver'] +
          ' \nDriverS name: ' + info.event.extendedProps['driver2'] +
          ' \nNote: ' + info.event.extendedProps['note']);
      } else if(info.event.title.includes("H/S")) {
        alert('ARRIVAL:' +
          ' \nDate: ' + formatDate(info.event.start) +
          ' \nFrom: Hayden Airport' +          
          ' \nto: ' + info.event.extendedProps['to'] +
          ' \nTime: ' + formatTime(info.event.start) +
          ' \nLanding time: ' + info.event.extendedProps['land'] +
          ' \nName: ' + info.event.extendedProps['customer'] +
          ' \nPhone: ' + info.event.extendedProps['phone'] +
          ' \nAdult: ' + info.event.extendedProps['adu'] +
          ' \nKid: ' + info.event.extendedProps['kid'] +
          ' \nPayment Status: Alredy paid: ' + info.event.extendedProps['trip'] +
          ' cost: $' + info.event.extendedProps['cost'] + ' tip: $' + info.event.extendedProps['tip'] +
          ' cost return: $' + info.event.extendedProps['costr'] + ' tip return: $ ' + info.event.extendedProps['tipr'] +
          ' \nPayment method ' + info.event.extendedProps['met'] +
          ' \nEmail ' + info.event.extendedProps['email'] +
          ' \nVehicle: ' + info.event.extendedProps['veh'] +
          ' \nPayment Status: Alredy paid: ' + info.event.extendedProps['trip'] +
          ' \nPayment method: ' + info.event.extendedProps['met'] +
          ' \nEmail: ' + info.event.extendedProps['email'] +
          ' \nFlight: ' + info.event.extendedProps['flight'] +
          ' \nDispatcherS name: ' + info.event.extendedProps['dispat'] +
          ' \nDriverS name: ' + info.event.extendedProps['driver'] +
          ' \nDriverS name: ' + info.event.extendedProps['driver2'] +
          ' \nNote: ' + info.event.extendedProps['note']);
      }
      else {
        alert('DEPARTURE:' +
          ' \nDate: ' + formatDate(info.event.start) +
          ' \nFrom: ' + info.event.extendedProps['to'] +
          ' \nTo: ' + info.event.extendedProps['from'] +
          ' \nTime: ' + formatTime(info.event.start) +
          ' \nDeparture time: ' + info.event.extendedProps['dep'] +
          ' \nName: ' + info.event.extendedProps['customer'] +
          ' \nPhone: ' + info.event.extendedProps['phone'] +
          ' \nAdult: ' + info.event.extendedProps['adu'] +
          ' \nKid: ' + info.event.extendedProps['kid'] +
          ' \nPayment Status: Alredy paid: ' + info.event.extendedProps['trip'] +
          ' cost: $' + info.event.extendedProps['cost'] + ' tip: $' + info.event.extendedProps['tip'] +
          ' cost return: $' + info.event.extendedProps['costr'] + ' tip return: $ ' + info.event.extendedProps['tipr'] +
          ' \nPayment method ' + info.event.extendedProps['met'] +
          ' \nEmail ' + info.event.extendedProps['email'] +
          ' \nVehicle: ' + info.event.extendedProps['veh'] +
          ' \nPayment Status: Alredy paid: ' + info.event.extendedProps['trip'] +
          ' \nPayment method: ' + info.event.extendedProps['met'] +
          ' \nEmail: ' + info.event.extendedProps['email'] +
          ' \nFlight: ' + info.event.extendedProps['flight'] +
          ' \nDispatcherS name: ' + info.event.extendedProps['dispat'] +
          ' \nDriverS name: ' + info.event.extendedProps['driver'] +
          ' \nNote: ' + info.event.extendedProps['note']);
      }
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
const redirectToCreateArrival = () => {
  router.push('/createarrivals')
}

function formatDate(date) {
  if (!(date instanceof Date)) {
    console.error('Input is not a valid Date object');
    return null;
  }
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  return date.toLocaleDateString('en-US', options);
}
const formatTime = (isoDate) => {
  const date = new Date(isoDate);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
  return formattedTime;
};

</script>

<template>
  <main>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text 3xl font-bold">First Option Ride Service App</h1>
      <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
    </div>
  </main>
  <h1>Welcome to app </h1>
  <button @click="redirectToCreateArrival" class="text-green-500 hover:underline cursor-pointer">Create
    Reservation</button>
  <div>
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
<style scoped>
/* @media screen and (max-width: 640px) {
    .custom-mobile-calendar {
      height: 640px; 
    }
  } */
  @media (max-width: 600px) {
  .fc-daygrid-event, .fc-event {
    white-space: normal !important;
    /* Otros estilos para dispositivos móviles */
  }

  .fc-daygrid-day-events {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    /* Otros estilos para dispositivos móviles */
  }
}
</style>