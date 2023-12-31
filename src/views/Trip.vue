<template>
    <div>
      <h1>WELCOME! THIS SITE SHOWCASES YOUR RIDES.</h1>
      <form @submit.prevent="handleCheckRides" class="w-full max-w-lg">
        <div class="w-full px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="driver-code"
          >
            Put your code:
          </label>
          <input
            id="driver-code"
            v-model="driver"
            placeholder="This code is provided by FIRST OPTION RIDE SERVICE."
            class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          />
        </div>
        <div class="w-full px-3">
          <input
            type="submit"
            value="Check your Rides"
            class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useQuery } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
  
  const driver = ref('');
  const currentDate = new Date();
  const tomorrowDate = new Date();
tomorrowDate.setDate(currentDate.getDate() + 1);

console.log(tomorrowDate);
  const {
  loading: ridesLoading,
  result: ridesResult,
  refetch: refetchRides
} = useQuery(gql`
  query GetRides($driver: String, $startDate: timestamptz, $endDate: timestamptz) {
    rides(where: { driver: { _eq: $driver }, pickup_time: { _gte: $startDate, _lt: $endDate } }) {
      
      id
      pickup_time
      }
  }
`, {
  driver: driver.value,
  
});
  
  const handleCheckRides = async () => {
    if (!driver.value) {
      
      alert('Please fill in the code');
    } else {
      
    }
  };
  </script>
  