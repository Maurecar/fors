<template>
    <VueDatePicker v-model="date" range :formatter="formatter" :is-24="false"/>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const date = ref();
const formatter = ref({
    date: "MMM dd yyyy ",
    month: "MMM",
    time: "HH:mm tt"
});

onMounted(() => {
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
})
console.log(date)
</script>