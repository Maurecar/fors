<script setup>
import { ref, onMounted} from 'vue'
import { useRouter } from 'vue-router'
import { useSignOut, useUserId } from '@nhost/vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';

import { useMutation, useQuery } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";


const router = useRouter()
const { signOut } = useSignOut()
const { userId} = useUserId()

const calendarOptions = ref({
  plugins: [dayGridPlugin, timeGridPlugin],
  initialView: 'dayGridMonth', 
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,timeGridWeek,timeGridDay',
  },
  events: [], // Aquí almacenarás las fechas de reserva desde la base de datos
});

const fetchReservas = async () => {
  // Lógica para obtener fechas de reserva desde la base de datos
  // Ejemplo: calendarOptions.value.events = await axios.get('/api/reservas');
};

onMounted(fetchReservas);

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
    <div >
        <FullCalendar :options="calendarOptions" />
    </div>
    
</template>