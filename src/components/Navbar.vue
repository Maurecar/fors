<template>
    <div class="dark">
      <nav
        class="
          container
          px-6
          py-8
          mx-auto
          md:flex md:justify-between md:items-center
        "
      >
        <div class="flex items-center justify-between">
          <router-link
            to="/"
            class="
              text-xl
              font-bold
              text-gray-700
              md:text-2xl
              hover:text-indigo-700
            "
            >Dashboard         -  
          </router-link>
          <!-- <h1 v-if="isAuthenticated">Bienvenido, {{ user.displayName }}</h1> -->
          
          <div @click="toggleNav" class="flex md:hidden">
            <button
              type="button"
              class="
                text-gray-700
                hover:text-gray-700
                focus:outline-none focus:text-gray-700
              "
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
          </div>
        </div>
  
        
        <ul
          :class="showMenu ? 'flex' : 'hidden'"
          class="
            flex-col
            mt-8
            space-y-4
            md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
          "
        >
        <li> <a href="/check" class="text-gray-700 hover:text-indigo-400">Available</a></li>
        <li>
          
          <div class="relative" @click="toggleVehiclesMenu">
            <a class="text-gray-700 hover:text-indigo-400">Vehicles</a>
            <ul v-show="showVehiclesMenu" class="absolute mt-2 space-y-2 bg-white shadow-md">
              <li><a href="/van1" class="block px-4 py-2 text-gray-800">Van 1</a></li>
              <li><a href="/van2" class="block px-4 py-2 text-gray-800">Van 2</a></li>
              <li><a href="/suburban" class="block px-4 py-2 text-gray-800">Suburban</a></li>
              <li><a href="/yukon" class="block px-4 py-2 text-gray-800">Yukon</a></li>
              <li><a href="/" class="block px-4 py-2 text-gray-800">all</a></li>
              
            </ul>
          </div>
        </li>
          <li> <a href="/drivers" class="text-gray-700 hover:text-indigo-400">Drivers</a></li>
          <li> <a href="/dispatchers" class="text-gray-700 hover:text-indigo-400">Dispatchers</a></li>
          <li> <a href="/arrivals" class="text-gray-700 hover:text-indigo-400">Reservation</a></li>
          
          
        </ul>
      </nav>
    </div>
  </template>
  <script>
  import { ref } from 'vue';
  export default {
    setup() {
      let showMenu = ref(false);
      let showVehiclesMenu = ref(false);
      const toggleNav = () => (showMenu.value = !showMenu.value);
      const toggleVehiclesMenu = () => (showVehiclesMenu.value = !showVehiclesMenu.value);
      return { showMenu, showVehiclesMenu, toggleNav, toggleVehiclesMenu  };
    },
  };
  </script>