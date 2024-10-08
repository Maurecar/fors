<template>
  <div :class="{ 'dark': isDark }">
    <nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="text-xl font-bold text-gray-700 md:text-2xl hover:text-indigo-700 dark:text-gray-100"
        >
          Dashboard
        </router-link>
        <div @click="toggleNav" class="flex md:hidden">
          <button
            type="button"
            class="text-gray-700 hover:text-gray-700 focus:outline-none focus:text-gray-700 dark:text-gray-100"
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
        class="flex-col mt-8 space-y-4 md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0"
      >
        <li><a href="/check" class="text-gray-700 hover:text-indigo-400 dark:text-gray-100">Available</a></li>
        <li>
          <div @mouseenter="showVehiclesMenu = true" @mouseleave="showVehiclesMenu = false">
            <a href="/vehicles" class="text-gray-700 hover:text-indigo-400 dark:text-gray-100">Vehicles</a>
            <ul v-show="showVehiclesMenu" class="dropdown-menu absolute mt-2 space-y-2 bg-white shadow-md dark:bg-gray-800">
              <li><a href="/van1" class="block px-4 py-2 text-gray-800 dark:text-gray-100">Van 1</a></li>
              <li><a href="/van2" class="block px-4 py-2 text-gray-800 dark:text-gray-100">Van 2</a></li>
              <li><a href="/suburban" class="block px-4 py-2 text-gray-800 dark:text-gray-100">Suburban</a></li>
              <li><a href="/yukon" class="block px-4 py-2 text-gray-800 dark:text-gray-100">Yukon</a></li>
              <li><a href="/" class="block px-4 py-2 text-gray-800 dark:text-gray-100">All</a></li>
            </ul>
          </div>
        </li>
        <li><a href="/drivers" class="text-gray-700 hover:text-indigo-400 dark:text-gray-100">Drivers</a></li>
        <li><a href="/dispatchers" class="text-gray-700 hover:text-indigo-400 dark:text-gray-100">Dispatchers</a></li>
        <li><a href="/arrivals" class="text-gray-700 hover:text-indigo-400 dark:text-gray-100">Reservations</a></li>
        <li>
          <label for="dark-mode-toggle" class="flex items-center cursor-pointer">
            <div class="relative">
              <input id="dark-mode-toggle" type="checkbox" class="sr-only" @change="toggleDarkMode" :checked="isDark">
              <div class="block bg-gray-600 w-14 h-8 rounded-full"></div>
              <div class="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition-transform"></div>
            </div>
            <div class="ml-3 text-gray-700 dark:text-gray-300">{{ isDark ? 'Light mode' : 'Dark mode' }}</div>
          </label>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useDark } from '@vueuse/core'

const isDark = useDark()
const showMenu = ref(false)
const showVehiclesMenu = ref(false)

const toggleNav = () => (showMenu.value = !showMenu.value)
const toggleVehiclesMenu = () => (showVehiclesMenu.value = !showVehiclesMenu.value)
const toggleDarkMode = () => {
  isDark.value = !isDark.value
}
</script>

<style scoped>
.dot {
  transition: transform 0.3s;
}
input:checked + .block .dot {
  transform: translateX(2.5rem);
}
input:not(:checked) + .block .dot {
  transform: translateX(0);
}
</style>
