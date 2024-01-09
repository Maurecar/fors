<template>
  <div>
    <h1>DRIVERS' SCHEDULE.</h1>
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
  <div v-if="ridesResultDriver1 && ridesResultDriver1.reservation">
    <h2>Driver {{ driver }}</h2>
    <table class="table-auto">
      There are your rides.
      <thead>
        <tr>
          <th class="px-4 py-2">Pick-up time</th>
          <th class="px-4 py-2">From</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="ride in ridesResultDriver1.reservation" :key="ride.id">
          <td class="border px-4 py-2">{{ ride.pickup_time }}</td>
          <td class="border px-4 py-2">{{ ride.from }}</td>
        </tr>
        
      </tbody>
    </table>
    <table class="table-auto">
      <tbody>
        <tr v-for="ride in ridesResultDriver1.reservation" :key="ride.id">
          <td class="border px-4 py-2">{{ ride.re_pickup_time }}</td>
          <td class="border px-4 py-2">{{ ride.address }}</td>
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
const dirver2 = ref('');

const currentDate = ref(new Date());
const tomorrowDate = ref(new Date());
tomorrowDate.value.setDate(currentDate.value.getDate() + 1);


const { loading: ridesLoadingDriver1, result: ridesResultDriver1, refetch: refetchRidesDriver1 } = useQuery(
  gql`
    query GetReservationDriver1(
      $driver: String, 
      $startDate: timestamptz, 
      $endDate: timestamptz
    ) { 
      reservation (where: { 
        _and: [
          { driver: { _eq: $driver }},
          { pickup_time: { _gte: $startDate, _lt: $endDate }},
        ]
      }) {
        pickup_time
        re_pickup_time
        from
        address
        driver
        driver2
        vehicle
        vehicle2
      }
    }
  `,
  {
    driver: driver.value,
    startDate: ref(dateToString(currentDate.value)),
    endDate: ref(dateToString(tomorrowDate.value))
  }
);

const { loading: ridesLoadingDriver2, result: ridesResultDriver2, refetch: refetchRidesDriver2 } = useQuery(
  gql`
    query GetReservationDriver2(
      $driver2: String, 
      $startDate: timestamptz, 
      $endDate: timestamptz
    ) { 
      reservation (where: { 
        _and: [
          { driver2: { _eq: $driver2 }},
          { re_pickup_time: { _gte: $startDate, _lt: $endDate }},
        ]
      }) {
        pickup_time
        re_pickup_time
        address
        from
        driver
        driver2
        vehicle
        vehicle2
      }
    }
  `,
  {
    driver2: driver.value,
    startDate: ref(dateToString(currentDate.value)),
    endDate: ref(dateToString(tomorrowDate.value))
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
    } else if (code.value === 'TY125') {
      driver.value = 'Tatiana Frolova';
    } else if (code.value === 'IY230') {
      driver.value = 'Ivan Aguilar	';
    } else if (code.value === 'LFE35') {
      driver.value = 'Librado';
    } else {
      alert('Your code is wrong');
    }
    const startDate = dateToString(currentDate.value);
const endDate = dateToString(tomorrowDate.value);


    await refetchRidesDriver1({
      driver: driver.value,
      startDate,
      endDate
    });

    await refetchRidesDriver2({
      driver2: driver.value,
      startDate,
      endDate
    });
  }
};

function dateToString(date) {
  if (!date || !(date instanceof Date)) {
    console.log(currentDate instanceof Date, currentDate);
    console.log(tomorrowDate instanceof Date, tomorrowDate);
    console.error('Input is not a valid Date object', date);
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
  //const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${timezone}`;
  const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;



  return formattedDate;
}

</script>
