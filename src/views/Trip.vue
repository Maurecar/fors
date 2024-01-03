<template>
  <div>
    <h1>WELCOME! THIS SITE SHOWCASES YOUR RIDES.</h1>
    <form @submit.prevent="handleCheckRides" class="w-full max-w-lg">
      <div class="w-full px-3">
        <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="driver-code">
          Put your code:
        </label>
        <input id="driver-code" v-model="code" placeholder="This code is provided by FIRST OPTION RIDE SERVICE."
          class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
      </div>
      <div class="w-full px-3">
        <input type="submit" value="Check your Rides"
          class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" />
      </div>
    </form>
  </div>
  <div v-if="ridesResult && ridesResult.reservation">
    <table class="table-auto">
      <thead>
        <tr>
          <th class="px-4 py-2">Name</th>
          <th class="px-4 py-2">Phone</th>
          <th class="px-4 py-2">Email</th>
          <th class="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ride in ridesResult.reservation" :key="ride.id">
          <td class="border px-4 py-2">{{ ride.pickup_time }}</td>
          <td class="border px-4 py-2">{{ ride.re_pickup_time }}</td>
          <td class="border px-4 py-2">{{ ride.from }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useQuery } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";

const code = ref('');
const driver = ref('');

const currentDate = new Date();
const tomorrowDate = new Date();
tomorrowDate.setDate(currentDate.getDate() + 1);

const { loading: ridesLoading, result: ridesResult, refetch: refetchRides } = useQuery(
  gql`
    query GetReservation(
  $driver: String, 
  $driver2: String, 
  $startDate: timestamptz, 
  $endDate: timestamptz
) { 
  reservation (where: { 
      _or: [
        { _and: [
            { driver: { _eq: $driver }},
            { pickup_time: { _gte: $startDate, _lt: $endDate }},
          ]
        }, 
        { _and: [
            { driver2: { _eq: $driver2 }},
            { re_pickup_time: { _gte: $startDate, _lt: $endDate }},
          ]
        },
      ] 
    }
  ) {
    pickup_time
    re_pickup_time
    from
    driver
    driver2
    vehicle
    vehicle2
  }
}

  `,
  {
    driver: driver.value,
    startDate: dateToString(currentDate.value),
    endDate: dateToString(tomorrowDate.value)
  }
);

const handleCheckRides = async () => {
  if (!code.value) {
    alert('Please fill in the code');
  } else {
    if (code.value === 'MV110') {
      driver.value = 'Mauricio Vasquez';
    } else if (code.value === 'JV215') {
      driver.value = 'Jarvi Colchado';
    } else if (code.value === 'MKS20') {
      driver.value = 'Mi';
    }else if (code.value === 'TY125') {
      driver.value = 'Tatiana Frolova';
    }else if (code.value === 'IY230') {
      driver.value = 'Ivan Aguilar	';
    }else if (code.value === 'LFE35') {
      driver.value = 'Librado';
    } else {
      alert('Your code is wrong');
    }
  }
};

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

</script>
