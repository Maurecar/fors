<template>
  <form @submit.prevent="handleCreateDeparture" class="w-full max-w-lg">
  <div>
    <vue-datepicker v-model="dateValue" :formatter="formatter" :timezone="'America/Denver'" :is-24="false"/>
  </div>
  <div>la fecha y hora es: {{ dateValue }}</div>
  <div>la fecha para timestap {{ dateToString(dateValue) }}</div>

  <div>
    <vue-datepicker v-model="timeValue" type="time" time-picker :formatter="formatTime" :timezone="'America/Denver'"
      :is-24="false" />
    <div>la hora es: {{ formatTime(timeValue) }}</div>
    <data value="nada"> la hora formateada es {{ formattedTime }}</data>

  </div>
  
    <div>
      <vue-datepicker v-model="otrafecha" type="date" :formatter="formatter.date"  :enable-time-picker="false"/>
    </div>
    <div>La fecha es: {{ new Date(otrafecha).toLocaleDateString()}}</div>
  <div> fecha normal {{ otrafecha }}</div>
  <div> otra formateada {{ formattedOtraFecha }}</div>
  <div class="w-full px-3">
            <input type="submit" value="Create Departure" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" />
          </div>
</form>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
  import { useRouter } from 'vue-router'
  import { useSignOut, useUserId } from '@nhost/vue'
  import { useMutation } from "@vue/apollo-composable";
  import { gql } from "@apollo/client/core";
  import Swal from 'sweetalert2';
  import VueDatepicker from "@vuepic/vue-datepicker";
  import '@vuepic/vue-datepicker/dist/main.css';

  const logout = () => {
    signOut()
    router.push('/login')
  }
  const router = useRouter()
  const { signOut } = useSignOut()
  const { userId } = useUserId()

const newDeparture = ref({
  dateValue: new Date(),
  otrafecha: new Date(),
  timeValue: new Date(),
  }) 

const dateValue = ref(new Date());
const formattedTime = ref(new Date());
const formattedOtraFecha = ref(new Date());
const xfecha = ref(new Date());
const otrafecha = ref(new Date());
const timeValue = ref(new Date()); 
const formatter = ref({
  date: "MM/DD/YYYY HH:mm",
  month: "MMM",
});
const { mutate: createDeparture, onDone: createDone } = useMutation(gql`
    mutation InsertDepartures($otrafecha: date, $dateValue: timestamptz, $timeValue: String) {
  insert_departures(objects: {otrafecha: $otrafecha, dateValue: $dateValue, timeValue: $timeValue}) {
    affected_rows
    returning {
      otrafecha
			id
			dateValue
			timeValue
    }
  }
}
  `)
  createDone((result) => {
  if (result.errors) {
    console.error(result.errors);
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: 'Departure created successfully',
    });
  }
})

const handleCreateDeparture = async () => {
    if (!dateValue || !otrafecha || !timeValue) {
      return alert("Please fill all fields")
    }
    await createDeparture({
  dateValue: dateToString(dateValue.value),
  timeValue: formatTime(timeValue.value),
  otrafecha: formatDate(otrafecha.value), 
})
    newDeparture.value = {
      name: '',
      timeValue: '',
      otrafecha: ''
    }
    redirectToListDepartures()
  }
  watchEffect(() => {
    formattedTime.value = formatTime(timeValue.value);
    formattedOtraFecha.value = formatDate(otrafecha.value);
  })
  function formatDate(date) {
  if (!(date instanceof Date)) {
    console.error('Input is not a valid Date object');
    return null;
  }
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
  console.log(date.toLocaleDateString('en-US', options))
  return date.toLocaleDateString('en-US', options);
}


console.log("la hora debe ser")
console.log(formatTime(timeValue.value))
console.log(formattedTime)
console.log("prueba de otra fechas")
console.log(dateToString(dateValue.value))

function formatTime(timeObject) {
  const time = new Date(0, 0, 0, timeObject.hours, timeObject.minutes, timeObject.seconds);
    return time.toLocaleTimeString('es-ES', { hour: 'numeric', minute: 'numeric', hour12: true });
     // Formatear las partes de la hora
  /* const hours = String(timeObject.hours).padStart(2, '0');
  const minutes = String(timeObject.minutes).padStart(2, '0');
  const seconds = String(timeObject.seconds).padStart(2, '0');

  // Obtener la zona horaria actual en formato offset (por ejemplo, "-0700")
  const timezoneOffset = new Date().getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const offsetMinutes = Math.abs(timezoneOffset) % 60;
  const timezone = (timezoneOffset < 0 ? '+' : '-') +
    String(offsetHours).padStart(2, '0') +
    String(offsetMinutes).padStart(2, '0');

  // Crear la cadena de fecha y hora en el formato deseado
  const formattedTime = `${hours}:${minutes}:${seconds}.${timezone}`;

  return formattedTime; */
}
function dateToString(date) {
  if (!(date instanceof Date)) {
    console.error('Input is not a valid Date object');
    return null;
  }

  // Obtener partes de la fecha y hora
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  const timezoneOffset = date.getTimezoneOffset();
  const offsetHours = Math.floor(Math.abs(timezoneOffset) / 60);
  const offsetMinutes = Math.abs(timezoneOffset) % 60;
  const timezone = (timezoneOffset < 0 ? '+' : '-') +
    String(offsetHours).padStart(2, '0') +
    ':' +
    String(offsetMinutes).padStart(2, '0');

   const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`;

  return formattedDate;
}
const redirectToListDepartures = () => {
    router.push('/arrivals')
}

</script>
