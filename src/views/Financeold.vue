<template>
    <VueDatePicker v-model="date" range :formatter="formatter" :is-24="false" />
    {{  start=dateToString(date[0]) }}
</template>

<script setup>
import { ref, onMounted } from 'vue';
const end = ref();
const start = ref();
const date = ref();
const formatter = ref({
    date: "MMM dd yyyy ",
    month: "MMM",
    time: "HH:mm aa",
    timezone: "UTC"
});
//cambio de nombre
onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
  
  
})
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

console.log(start)
console.log(end)
</script>