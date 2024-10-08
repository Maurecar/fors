<template>
    <div>
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold mb-4">Customers Create</h1>
        <button @click="redirectToListCustomer" class="text-green-500 hover:underline cursor-pointer">List Customer</button>
        <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
      </div>
      <form @submit.prevent="handleCreateCustomer" class="w-full max-w-lg">
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="customer-name">
              Name:
            </label>
            <input id="customer-name" v-model="newCustomer.name" placeholder="Name" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="customer-phone">
              Phone:
            </label>
            <input id="customer-phone" v-model="newCustomer.phone" placeholder="Phone" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="customer-email">
              Email:
            </label>
            <input id="customer-email" v-model="newCustomer.email" placeholder="Email" class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
          </div>
        </div>
        <div class="flex flex-wrap -mx-3 mb-6">
          <div class="w-full px-3">
            <input type="submit" value="Create Customer" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" />
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useSignOut, useUserId } from '@nhost/vue'
  import { useMutation } from "@vue/apollo-composable";
  import { gql } from "@apollo/client/core";
  import Swal from 'sweetalert2';
  
  const router = useRouter()
  const { signOut } = useSignOut()
  const { userId } = useUserId()
  
  const logout = () => {
    signOut()
    router.push('/login')
  }
  
  const newCustomer = ref({
    name: '',
    phone: '',
    email: ''
  })
  
  const { mutate: createCustomer } = useMutation(gql`
    mutation CreateCustomer($name: String!, $phone: String!, $email: String!) {
      insert_customers_one(object: { name: $name, phone: $phone, email: $email }) {
        name
        phone
        email
      }
      
    }
  `)
  
    const handleCreateCustomer = async () => {
  if (!newCustomer.value.name || !newCustomer.value.email || !newCustomer.value.phone) {
    return alert("Please fill all fields");
  }

  const { data, errors } = await createCustomer({
    name: newCustomer.value.name,
    phone: newCustomer.value.phone,
    email: newCustomer.value.email,
  });

  if (errors) {
    console.error(errors);
  } else {
    Swal.fire({
      icon: 'success',
      title: 'Succesfully',
      text: 'Customer created successfully',
    });

    newCustomer.value = {
      name: '',
      phone: '',
      email: '',
    };

    
    redirectToListCustomer();
  }
};

const redirectToListCustomer = () => {
    router.push('/customers')
}
  </script>