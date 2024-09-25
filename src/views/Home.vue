<script setup>
import { ref, onMounted, reactive, initCustomFormatter, setBlockTracking } from 'vue'
import { useRouter } from 'vue-router'
import { useSignOut, useUserId } from '@nhost/vue'
import Swal from 'sweetalert2'
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
      address: n.address,
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
      ident: n.id,
      display: 'block',
      color: (n.from === 'Hayden airport' ? 'black' : '#0891b2'),
    };

    const endEvent = {
      title: n.company + " " + (n.to === 'Hayden airport' ? '(H/S)' : '(S/H)') + " " +  
      (n.driver2 === 'Mauricio Vasquez' ? 'M' : (n.driver2 === 'Jarvi Colchado' ? 'J' : (n.driver2 === 'Tatiana Frolova' ? 'T' :(n.driver2 === 'Ivan Aguilar' ? 'Iv' :'X')))) + " " + (n.adult + n.kid )+ "P",
      start: n.re_pickup_time,
      end: n.re_pickup_time,
      customer: n.customer,
      phone: n.phone,
      trip: n.way,
      to: n.to,
      loc: n.pick_location,
      address: n.address,
      land: n.landing_time,
      dep: n.departure_time,
      kid: n.kid,
      adu: n.adult,
      veh: n.vehicle,
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
      ident: n.id,
      
      
      display: 'block',
      color: (n.to === 'Hayden airport' ? 'black' : '#0891b2'),
      
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
      if (info.event.extendedProps['from'].includes("Hayden airport")) {
        alert('END EVENT - ARRIVAL:'
          
        );
      } else if (eventType === 'departure') {
        alert('END EVENT - DEPARTURE:'
          
        );
      }
    } else {
      if (info.event.title.includes("S/H")) {
        Swal.fire({
          title: 'DEPARTURE:',
          html: 
          ' <br>Reservation #: FORS' + info.event.extendedProps['ident'] +
          ' <br>Date: ' + formatDate(info.event.start) +
          ' <br>From: ' + 'Steamboat - ' + info.event.extendedProps['address'] +
          ' <br>To: Hayden airport' +
          ' <br>Pickup Time: ' + formatTime(info.event.start) +
          ' <br>Departure time: ' + info.event.extendedProps['dep'] +
          ' <br>Name: ' + info.event.extendedProps['customer'] +
          ' <br>Phone #: ' + info.event.extendedProps['phone'] +
          ' <br>Adult: ' + info.event.extendedProps['adu'] +
          ' <br>Kids: ' + info.event.extendedProps['kid'] +
          ' <br>Vehicle: ' + info.event.extendedProps['veh'] + //crear logica para definir si es round trip o one way
          ' <br>Payment Status - Already paid: ' + info.event.extendedProps['trip'] +
          ' <br>cost: $' + info.event.extendedProps['cost'] + ' gratuity: $' + info.event.extendedProps['tip'] +
          ' cost return: $' + info.event.extendedProps['costr'] + ' gratuity return: $ ' + info.event.extendedProps['tipr'] +
          ' <br>Payment method: ' + info.event.extendedProps['met'] +
          ' <br>Email: ' + info.event.extendedProps['email'] +
          ' <br>Dispatcher\'s name: ' + info.event.extendedProps['dispat'] +
          ' <br>Driver\'s name: ' + info.event.extendedProps['driver'] +
          
          ' <br>Note: ' + info.event.extendedProps['note'], 
          width: '80%'
          });
      } else if(info.event.title.includes("H/S")) {
        Swal.fire({
          title:'ARRIVAL:',
          html: 
          ' <br>Reservation #: FORS' + info.event.extendedProps['ident'] +
          ' <br>Date: ' + formatDate(info.event.start) +
          ' <br>From: Hayden airport' +          
          ' <br>To: ' + info.event.extendedProps['to'] +
          ' <br>Pickup Time: ' + formatTime(info.event.start) +
          ' <br>Landing time: ' + info.event.extendedProps['land'] +
          ' <br>Name: ' + info.event.extendedProps['customer'] +
          ' <br>Phone #: ' + info.event.extendedProps['phone'] +
          ' <br>Adult: ' + info.event.extendedProps['adu'] +
          ' <br>Kids: ' + info.event.extendedProps['kid'] +
          ' <br>Payment Status - Already paid: ' + info.event.extendedProps['trip'] +
          ' <br>cost: $' + info.event.extendedProps['cost'] + ' gratuity: $' + info.event.extendedProps['tip'] +
          ' cost return: $' + info.event.extendedProps['costr'] + ' gratuity return: $ ' + info.event.extendedProps['tipr'] +
          ' <br>Payment method: ' + info.event.extendedProps['met'] +
          ' <br>email: ' + info.event.extendedProps['email'] +
          ' <br>Vehicle: ' + info.event.extendedProps['veh'] +
          ' <br>Flight: ' + info.event.extendedProps['flight'] +
          ' <br>Dispatcher\'s name: ' + info.event.extendedProps['dispat'] +
          ' <br>Driver\'s name: ' + info.event.extendedProps['driver'] +          
          ' <br>Note: ' + info.event.extendedProps['note'],
          width: '80%'});
      }
      else {
        Swal.fire({
          title:'DEPARTURE:',
          html:
          ' <br>Reservation #: FORS' + info.event.extendedProps['ident'] +
          ' <br>Date: ' + formatDate(info.event.start) +
          ' <br>From: ' + info.event.extendedProps['to'] +
          ' <br>To: ' + info.event.extendedProps['from'] +
          ' <br>Pickup Time: ' + formatTime(info.event.start) +
          ' <br>Departure time: ' + info.event.extendedProps['dep'] +
          ' <br>Name: ' + info.event.extendedProps['customer'] +
          ' <br>Phone #: ' + info.event.extendedProps['phone'] +
          ' <br>Adult: ' + info.event.extendedProps['adu'] +
          ' <br>Kids: ' + info.event.extendedProps['kid'] +
          ' <br>Payment Status - Already paid: ' + info.event.extendedProps['trip'] +
          ' <br>cost: $' + info.event.extendedProps['cost'] + ' gratuity: $' + info.event.extendedProps['tip'] +
          ' cost return: $' + info.event.extendedProps['costr'] + ' gratuity return: $ ' + info.event.extendedProps['tipr'] +
          ' <br>Payment method: ' + info.event.extendedProps['met'] +
          ' <br>email: ' + info.event.extendedProps['email'] +
          ' <br>Vehicle: ' + info.event.extendedProps['veh'] + //crear logica para definir si es round trip o one way
          ' <br>Dispatcher\'s name: ' + info.event.extendedProps['dispat'] +
          ' <br>Driver\'s name: ' + info.event.extendedProps['driver2'] +
          ' <br>Note: ' + info.event.extendedProps['note'], 
          width: '80%'});
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
//verificar round trip steamboat to hayden

</script>

<template>
  <main>
    <div class="flex items-center justify-between mb-8">
      <h1 class="text-sm sm:text-5xl text-center font-bold">First Option Ride Service</h1>
      <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
    </div>
  </main>
  <h1 class="text-lg sm:text-4xl ">Welcome to Fors App </h1>
  <button @click="redirectToCreateArrival" class="text-green-500 hover:underline cursor-pointer">Create
    Reservation</button>
  <div class="calendar-container dark:bg-gray-600 text-xs sm:text-lg mt-0.5">
    <FullCalendar :options="calendarOptions" />
  </div>
</template>
<style scoped>

  /* @media (max-width: 600px) {
  } */
 /*  .fc-daygrid-event, .fc-event {
    white-space: normal !important;
   
  } */

 /*  .fc-daygrid-day-events {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    
  } */
/* :root {
  --fc-border-color: black;
  --fc-daygrid-event-dot-width: 5px;
  
} */
/* .my-text-class {
  font-size: 12px;
  text-align: left;
} */
.dark .fc .fc-daygrid-day {
  border-color: #4a5568; /* color de las líneas en modo oscuro */
}

.dark .fc .fc-daygrid-day-number {
  color: #e2e8f0; /* color de los números en modo oscuro */
}

</style>