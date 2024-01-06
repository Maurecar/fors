<!-- Este es el componente modal que se importa en el componente principal -->
<template>
    <div class="modal">
        <div class="modal-content">
            <span class="close" @click="$emit('close')">close and return to list</span>
            <h2>Edit Reservation</h2>
            <form @submit.prevent="handleUpdateReservation">
                <div>
                    <div class="customer-data">
                        <label for="customer">Customer Name:</label>
                        <input id="updateCustomer" v-model="reservation.customer"
                            class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />
                        <label for="customer">Customer Phone:</label>
                        <input id="Customer phone" v-model="reservation.phone" placeholder="Customer Phone Number"
                            class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                        <label for="customer">Customer Email:</label>
                        <input id="Customer email" v-model="reservation.email" placeholder="Customer Email"
                            class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />
                    </div>
                    <div class="passengers-data">
                        <div>
                            <label for="adults">Adults:</label>
                            <input id="adults" type="number" min="0" max="30" v-model="reservation.adult"
                                class="appearance-none block w-full bg-white-200 text-gray-700 border border-black-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray focus:border-black-500">
                        </div>
                        <div>
                            <label for="kid">Kids:</label>
                            <input id="kid" type="number" min="0" max="30" v-model="reservation.kid"
                                class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500">
                        </div>
                        <div>
                            <label for="carseat">Car Seat:</label>
                            <input id="carseat" type="number" min="0" max="30" v-model="reservation.carseat"
                                class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500">
                        </div>
                        <div>
                            <label for="boosterseat">Booster Seat:</label>
                            <input id="boosterseat" type="number" min="0" max="30" v-model="reservation.boosterseat"
                                class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500">
                        </div>
                    </div>
                </div>
                <div>
                    <div class="reservation-data">
                        <div class="oneway-roundtrip">
                            <div class="flex items-center">
                                <input id="One Way" name="way" type="radio" value="One Way" v-model="reservation.way"
                                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                <label for="One Way" class="ml-3 block text-sm font-medium text-white-700">
                                    One Way
                                </label>
                            </div>
                            <div class="flex items-center ">
                                <input id="Round Trip" name="way" type="radio" value="Round Trip" v-model="reservation.way"
                                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                <label for="Round Trip" class="ml-3 block text-sm font-medium text-white-700">
                                    Round Trip
                                </label>
                            </div>
                            <label>You choose: {{ reservation.way }}</label>
                        </div>

                        <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                            for="reservation-from">
                            <p>From:</p>
                        </label>
                        <div class="flex items-center" v-if="reservation.way === 'One Way'">
                            <div class="oneway-roundtrip">
                                <div class="flex items-center ">
                                    <input id="Round Trip" name="from" type="radio" value="Hayden airport"
                                        v-model="reservation.from"
                                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                    <label for="Pick-up from the Hayden airport"
                                        class="ml-3 block text-sm font-medium text-white-700">
                                        Pick-up from the Hayden airport
                                    </label>
                                </div>
                                <div class="flex items-center">
                                    <input id="Pick-up from Steamboat" name="from" type="radio" value="Steamboat"
                                        v-model="reservation.from"
                                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                    <label for="One Way" class="ml-3 block text-sm font-medium text-white-700">
                                        Pick-up from Steamboat
                                    </label>
                                </div>


                            </div>
                        </div>


                        <div v-else-if="reservation.way === 'Round Trip'">
                            <div class="oneway-roundtrip">
                                <div class="flex items-center ">
                                    <input id="Round Trip" name="from" type="radio" value="Hayden airport"
                                        v-model="reservation.from"
                                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                    <label for="Pick-up from the Hayden airport"
                                        class="ml-3 block text-sm font-medium text-white-700">
                                        Pick-up from the Hayden airport
                                    </label>
                                </div>
                                <div class="flex items-center">
                                    <input id="Pick-up from Steamboat" name="from" type="radio" value="Steamboat"
                                        v-model="reservation.from"
                                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                    <label for="One Way" class="ml-3 block text-sm font-medium text-white-700">
                                        Pick-up from Steamboat
                                    </label>
                                </div>


                            </div>
                        </div>
                        <div v-if="reservation.way === 'One Way'">
                            <div v-if="reservation.from === 'Steamboat'">
                                <h5>One way from Steamboat Spring</h5>
                                <div class="flex flex-wrap -mx-6 mb-6">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                            for="reservation-pick-time">
                                            Pick-up location in Steamboat Springs:
                                        </label>
                                        <input id="Pick-up" v-model="reservation.pick_location"
                                            placeholder="Pick-up location"
                                            class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />
                                    </div>

                                    <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                        for="reservation-pickup-time">
                                        Date and pick-up Time:
                                    </label>
                                    <VueDatePicker v-model="reservation.pickup_time" :is-24="false" :formatter="formatter"
                                        class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded">
                                    </VueDatePicker>

                                    <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                        for="reservation-pickup-time">
                                        Departure Time:
                                    </label>
                                    <VueDatePicker v-model="reservation.departure_time" type="time" time-picker
                                        :is-24="false"
                                        class="appearance-none block w-full bg-black-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500">
                                    </VueDatePicker>

                                    <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                        for="reservation-to">
                                        Droping Location:
                                    </label>
                                    <input id="to" v-model="reservation.to" placeholder="Drop-off location "
                                        class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />



                                </div>

                            </div>

                            <div v-else-if="reservation.from === 'Hayden airport'">
                                <h5>One Way From Hayden Airport</h5>
                                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Date and pick-up Time:
                                </label>
                                <VueDatePicker v-model="reservation.pickup_time" :is-24="false"
                                    class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded">
                                </VueDatePicker>
                                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Landing Time:
                                </label>
                                <VueDatePicker v-model="reservation.landing_time" time-picker type="time" :is-24="false"
                                    class="appearance-none block w-full bg-black-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500">
                                </VueDatePicker>
                                <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                    for="reservation-to">
                                    Airline and flight number:
                                </label>
                                <input id="airline" v-model="reservation.flight" placeholder="Airline and flight number "
                                    class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                                <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                    for="reservation-to">
                                    Droping Location in Steamboat:
                                </label>
                                <input id="to" v-model="reservation.to" placeholder="Drop-off location "
                                    class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                            </div>

                        </div>
                        <div v-else-if="reservation.way === 'Round Trip'">

                            <div v-if="reservation.from === 'Steamboat'">
                                <h5>Round Trip from Steamboat Spring</h5>
                                <div class="flex flex-wrap -mx-6 mb-6">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                            for="reservation-pick-time">
                                            Pick-up location in Steamboat Springs:
                                        </label>
                                        <input id="Pick-up" v-model="reservation.pick_location"
                                            placeholder="Pick-up location"
                                            class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />
                                    </div>

                                    <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                        for="reservation-pickup-time">
                                        Date and pick-up Time:
                                    </label>
                                    <VueDatePicker v-model="reservation.pickup_time" :is-24="false"
                                        class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded">
                                    </VueDatePicker>

                                    <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                        for="reservation-pickup-time">
                                        Departure Time:
                                    </label>
                                    <VueDatePicker v-model="reservation.departure_time" time-picker :is-24="false"
                                        class="appearance-none block w-full bg-black-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500">
                                    </VueDatePicker>
                                    <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                        for="reservation-to">
                                        Droping Location :
                                    </label>
                                    <input id="to" v-model="reservation.tosec" placeholder="Drop-off location "
                                        class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />


                                    <label
                                        class="returning block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                        for="reservation-pickup-time">

                                        Return from the airport -
                                    </label>
                                    <label
                                        class="returning block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                        for="reservation-pickup-time">
                                        Date and Time:
                                    </label>
                                    <VueDatePicker v-model="reservation.re_pickup_time" :is-24="false"
                                        class="returning w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded">
                                    </VueDatePicker>
                                    <label
                                        class="returning block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                        for="reservation-pickup-time">
                                        Landing Time:
                                    </label>
                                    <VueDatePicker v-model="reservation.landing_time" time-picker :is-24="false"
                                        class="returning appearance-none block w-full bg-black-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500">
                                    </VueDatePicker>
                                    <label class="returning  uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                        for="reservation-to">
                                        Airline and flight number:
                                    </label>
                                    <input id="airline" v-model="reservation.flight"
                                        placeholder="Airline and flight number "
                                        class="returning appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />



                                    <label
                                        class="returning block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                        for="reservation-to">
                                        Droping Location in Steamboat:
                                    </label>
                                    <input id="to" v-model="reservation.to" placeholder="Drop-off location "
                                        class="returning appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                                </div>
                            </div>
                            <div v-else-if="reservation.from === 'Hayden airport'">
                                <h5>Round Trip from Hayden Airport</h5>
                                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Date and pick-up Time:
                                </label>
                                <VueDatePicker v-model="reservation.pickup_time" :is-24="false"
                                    class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded">
                                </VueDatePicker>
                                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Landing Time:
                                </label>
                                <VueDatePicker v-model="reservation.landing_time" time-picker :is-24="false"
                                    class="appearance-none block w-full bg-black-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500">
                                </VueDatePicker>
                                <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                    for="reservation-to">
                                    Airline and flight number:
                                </label>
                                <input id="airline" v-model="reservation.flight" placeholder="Airline and flight number "
                                    class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                                <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                    for="reservation-to">
                                    Droping Location in Steamboat:
                                </label>
                                <input id="to" v-model="reservation.to" placeholder="Drop-off location "
                                    class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                                <label class="returning block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Return from Steamboat -
                                </label>
                                <label class="returning block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                    for="reservation-to">
                                    Pick-up Location Address:
                                </label>
                                <input id="airline" v-model="reservation.address" placeholder="Pick-up Location Address"
                                    class="returning appearance-none block w-full bg-white-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                                <label class="returning block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Date and Pick-up Time:
                                </label>
                                <VueDatePicker v-model="reservation.re_pickup_time" :is-24="false"
                                    class="returning w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded">
                                </VueDatePicker>
                                <label class="returning block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Departure Time:
                                </label>
                                <VueDatePicker v-model="reservation.departure_time" time-picker :is-24="false"
                                    class="returning appearance-none block w-full bg-black-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500">
                                </VueDatePicker>

                            </div>
                        </div>
                        <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                            for="reservation-pickup-time">
                            Reservation Date:
                        </label>
                        <VueDatePicker v-model="reservation.date_reserv" :enable-time-picker="false"
                            :format="formatter.date"
                            class="appearance-none block w-full bg-black-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500">
                        </VueDatePicker>


                    </div>
                </div>

                <div>
                    <div>
                        <div class="cost">
                            <div>
                                <label for="Amount" class="block text-sm font-medium text-white-700">
                                    Amount
                                </label>
                                <input id="Amount" name="text1" type="text" v-model="reservation.cost"
                                    class="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <label for="Gratuity" class="block mt-4 text-sm font-medium text-white-700">
                                    Gratuity
                                </label>
                                <input id="Gratuity" name="Gratuity" type="text" v-model="reservation.tip"
                                    class="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div v-if="reservation.way === 'Round Trip'" class="mt-4">
                                <label for="text5" class="block mt-4 text-sm font-medium text-white-700">
                                    Second trip amount (return)
                                </label>
                                <input id="text5" name="text5" type="text" v-model="reservation.costreturn"
                                    class="mt-1 block w-full border border-white-300 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <label for="text6" class="block mt-4 text-sm font-medium text-white-700">
                                    Second trip Gratuity (return)
                                </label>
                                <input id="text6" name="text6" type="text" v-model="reservation.tipreturn"
                                    class="mt-1 block w-full border border-white-300 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label>Total amount: {{ totalAmount }}</label>
                            </div>
                            <div>
                                <label for="Status payment">Method Payment:</label>
                                <select
                                    class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                                    id="payment methode" v-model="reservation.payment_met">
                                    <option value="">--Choose Payment Method--</option>
                                    <option>Payment Link</option>
                                    <option>Credit Card</option>
                                    <option>Cash</option>
                                    <option>other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="others">
                            <div>
                                <label for="How do you heard about us?">How do you heard about us?</label>
                                <select
                                    class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                                    id="How do you heard about us?" v-model="reservation.heard">
                                    <option value="">--Choose Option--</option>
                                    <option>Google search</option>
                                    <option>Front desk hotel</option>
                                    <option>A friend</option>
                                    <option>Returning customer</option>
                                    <option>Facebook / Instagram</option>
                                    <option>Yelp / Trip advisor</option>
                                    <option>Tik - Tok</option>
                                </select>
                            </div>

                            <div class="flex flex-wrap -mx-3 mb-6">
                                <div class="w-full px-3">
                                    <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                        for="reservation-date">
                                        Notes:
                                    </label>
                                    <textarea v-model="reservation.note" placeholder="add notes"
                                        class="appearance-none text-gray-700 block w-full bg-white-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="fors">
                    <div>
                        <label for="Status payment">Payment Status:</label>
                        <select
                            class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                            id="Status payment" v-model="reservation.status">
                            <option value="">--Choose Status--</option>
                            <option>Pending</option>
                            <option>Paid</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <div v-if="dispatcherResult">
                            <label for="dispatcher">Select a Dispatcher:</label>
                            <select id="dispatcher" v-model="reservation.dispatcher"
                                class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                                @change="onSelectUser">
                                <option value="">-- Select a dispatcher --</option>
                                <option v-for="dispatcher in dispatcherResult.Dispatcher" :key="dispatcher.id"
                                    :value="dispatcher.name">
                                    {{ dispatcher.name }}</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div v-if="driverResult">
                            <label for="driver">Select a Driver:</label>
                            <select id="driver" v-model="reservation.driver"
                                class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                                @change="onSelectUser">
                                <option value="">-- Select a driver --</option>
                                <option v-for="driver in driverResult.Driver" :key="driver.id" :value="driver.name">{{
                                    driver.name
                                }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label for="vehicle">Vehicle:</label>
                        <select
                            class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                            id="vehicle" v-model="reservation.vehicle">
                            <option value="">--Choose a vehicle</option>
                            <option>Van #1</option>
                            <option>Van #2</option>
                            <option>Suburban</option>
                            <option>Yukon #1</option>
                            <option>Yukon #2</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div v-if="reservation.way === 'Round Trip'" class="mt-4">
                        <div>
                            <div v-if="driverResult">
                                <label for="driver2">Select a Driver for returning:</label>
                                <select id="driver2" v-model="reservation.driver2"
                                    class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                                    @change="onSelectUser">
                                    <option value="">-- Select a driver for returning --</option>
                                    <option v-for="driver in driverResult.Driver" :key="driver.id" :value="driver.name">{{
                                        driver.name
                                    }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label for="vehicle">Vehicle for returning:</label>
                            <select
                                class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                                id="vehicle" v-model="reservation.vehicle2">
                                <option value="">--Choose a vehicle for returning</option>
                                <option>Van #1</option>
                                <option>Van #2</option>
                                <option>Suburban</option>
                                <option>Yukon #1</option>
                                <option>Yukon #2</option>
                                <option>Other</option>
                            </select>
                        </div>

                    </div>
                    <label for="vehicle">Company of Reservation</label>
                    <div class="flex items-center ">
                        <input id="Moving Mountains" name="Moving Mountains" type="radio" value="MM"
                            v-model="reservation.company"
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                        <label for="Moving Mountains" class="ml-3 block text-sm font-medium text-white-700">
                            Moving Mountains
                        </label>
                        <input id="Central of Reservations" name="Central of Reservations" type="radio" value="CRS"
                            v-model="reservation.company"
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                        <label for="Central of Reservations" class="ml-3 block text-sm font-medium text-white-700">
                            Central of Reservations
                        </label>
                        <input id="First Option Ride Service" name="First Option Ride Service" type="radio" value=""
                            v-model="reservation.company"
                            class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                        <label for="First Option Ride Service" class="ml-3 block text-sm font-medium text-white-700">
                            First Option Ride Service
                        </label>
                    </div>

                </div>

                <button type="cancel" class="close bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    @click="$emit('close')">Close</button>
                <button type="submit" class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Save
                    Changes</button>
            </form>

        </div>
    </div>
</template>
  
<script setup>
import { ref, watchEffect, onMounted, defineProps, reactive, defineEmits } from 'vue';
import { useRouter } from 'vue-router';
import { useSignOut, useUserId } from '@nhost/vue';
import { useQuery, useMutation } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Swal from 'sweetalert2';

const emits = defineEmits();
const totalAmount = ref(0);
const Totalarrive = ref(0);
const Totaldeparture = ref(0);
// const reservation2 = ref({
//     cost2: 0,
//     tip2: 0,
//     tipreturn2: 0,
//     costreturn2: 0,
// });
const reservation = reactive({

    customer: "",
    phone: "",
    phone2: "",
    email: "",
    adult: 0,
    kid: 0,
    carseat: 0,
    boosterseat: 0,
    way: "",
    from: "",
    pick_location: "",
    pickup_time: new Date(),
    departure_time: new Date(),
    to: "",
    landing_time: new Date(),
    flight: "",
    tosec: "",
    re_pickup_time: null,
    address: "",
    date_reserv: "",
    cost: 0,
    tip: 0,
    costreturn: 0,
    tipreturn: 0,
    payment_met: "",
    heard: "",
    note: "",
    status: "",
    dispatcher: "",
    driver: "",
    vehicle: "",
    driver2: "",
    vehicle2: "",
    company: "",

}) 
//const reserdatestr = new Date(newReservation.date_reserv).toLocaleDateString();


// Recibir la reserva como prop
const props = defineProps({
    reservation: {
        type: Object,
        required: true,
    },
});
onMounted(() => {
    // Usar Object.assign para copiar propiedades de props.reservation a reservation
    Object.assign(reservation, props.reservation);
});

// Usar una mutación para actualizar la reserva
const { mutate: updateReservation, onDone: updateDone } = useMutation(
    gql`
      mutation MyMutation($id: Int!, $data: reservation_set_input!) {
  update_reservation_by_pk(pk_columns: {id: $id}, _set: $data) {
    address
    adult
    boosterseat
    carseat
    company
    cost
    costreturn
    customer
    date_reserv
    departure_time
    dispatcher
    driver
    driver2
    email
    flight
    from
    heard
    id
    kid
    landing_time
    note
    payment_met
    phone
    phone2
    pick_location
    pickup_time
    re_pickup_time
    status
    tip
    tipreturn
    to
    tosec
    vehicle
    vehicle2
    way
  }
}
    `
);

// Ejecutar la mutación al enviar el formulario
const handleUpdateReservation = async() => {
    if (

        !reservation.pickup_time

    ) {
        return alert("Please fill all fields")

    }
    const { data, errors } = await updateReservation({
        id: props.reservation.id,
        data: {

        customer: reservation.customer,
        phone: reservation.phone,
        phone2: reservation.phone2,
        email: reservation.email,
        adult: reservation.adult,
        kid: reservation.kid,
        carseat: reservation.carseat,
        boosterseat: reservation.boosterseat,
        way: reservation.way,
        from: reservation.from,
        pick_location: reservation.pick_location,
        pickup_time: dateToString(reservation.pickup_time),
        departure_time: formatTime(reservation.departure_time),
        to: reservation.to,
        landing_time: formatTime(reservation.landing_time),
        flight: reservation.flight,
        tosec: reservation.tosec,
        re_pickup_time: dateToString(reservation.re_pickup_time),
        address: reservation.address,
        date_reserv: formatDate(reservation.date_reserv),
        cost: reservation.cost,
        tip: reservation.tip,
        costreturn: reservation.costreturn,
        tipreturn: reservation.tipreturn,
        payment_met: reservation.payment_met,
        heard: reservation.heard,
        note: reservation.note,
        status: reservation.status,
        vehicle: reservation.vehicle,
        driver: reservation.driver,
        vehicle2: reservation.vehicle2,
        driver2: reservation.driver2,
        dispatcher: reservation.dispatcher,
        company: reservation.company,
        }

    })
    if (errors) {
        console.error(errors);
    }
    await Swal.fire({
            icon: 'success',
            title: 'Successfully',
            html: `
              UPDATE SUCCESFULLY
            `,
            showCancelButton: false,
            showCloseButton: false,
            allowOutsideClick: false,
        });
};

// Emitir un evento de cierre al terminar la mutación
updateDone(() => {
    emits('close');
});

const formatter = ref({
    date: "MMM dd yyyy ",
    month: "MMM",
    time: "HH:mm tt"
});
const selectedDate = ref(null);
const datePickerFormat = 'yyyy-MM-dd hh:mm tt';


/*  watchEffect(() => {
    cost2 = parseFloat(reservation.cost) || 0;
    tip2 = parseFloat(reservation.tip) || 0;
    tipreturn2 = parseFloat(reservation.tipreturn) || 0;
    costreturn2 = parseFloat(reservation.costreturn) || 0;
    totalAmount.value = cost + tip + tipreturn + costreturn;
    Totalarrive.value = cost + tip;
    Totaldeparture.value = costreturn + tipreturn;

});  */

const {
    loading: driverLoading,
    result: driverResult,
    refetch: driverRefetch
} = useQuery(gql`
    query {
      Driver(order_by: { id: desc }) {
        id
        name
        phone
        email
      }
    }
  `)
const {
    loading: dispatcherLoading,
    result: dispatcherResult,
    refetch: dispatcherRefetch
} = useQuery(gql`
    query {
      Dispatcher(order_by: { id: desc }) {
        id
        name
        phone
        email
      }
    }
  `)
function formatTime(timeObject) {

    const time = new Date(0, 0, 0, timeObject.hours, timeObject.minutes, timeObject.seconds);
    return time.toLocaleTimeString('en-Us', { hour: 'numeric', minute: 'numeric', hour12: true });
}
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
function formatDate(date) {
    if (!(date instanceof Date)) {
        console.error('Input is not a valid Date object');
        return null;
    }
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    console.log(date.toLocaleDateString('en-US', options))
    return date.toLocaleDateString('en-US', options);
}
const formatTimetwo = (isoDate) => {
    const date = new Date(isoDate);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return formattedTime;
};

</script>
  
<style scoped>
/* Estilos del modal */
.modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
    background-color: #fefefe;
}

.customer-data {
    border: 1px solid #000;
    padding: 10px;
    margin: 10px;
    background-color: #050a69;
    position: relative;
    color: white;
}

.customer-data::before {
    content: "Customer Data";
    position: absolute;
    top: -20px;
    left: 10px;
    background-color: #050a69;
    padding: 0 5px;
    font-weight: bold;
    border: 1px solid #000;
    border-bottom: none;

}

.passengers-data {
    border: 1px solid #000;
    padding: 10px;
    margin: 10px;
    background-color: #701010;
    position: relative;
    color: white;
}

.passengers-data::before {
    content: "passengers-data";
    position: absolute;
    top: -20px;
    left: 10px;
    background-color: #701010;
    padding: 0 5px;
    font-weight: bold;
    border: 1px solid #000;
    border-bottom: none;
    color: white;
}

.fors {
    border: 1px solid #000000;
    padding: 10px;
    margin: 10px;
    background-color: #696202;
    position: relative;
    color: white;
}

.others {
    border: 1px solid #000;
    padding: 10px;
    margin: 10px;
    background-color: #646cff;
    position: relative;
    color: white;
}

.reservation-data {
    border: 1px solid #000;
    padding: 10px;
    margin: 10px;
    background-color: #213547;
    position: relative;
    color: white;
}

.cost {
    border: 1px solid #000;
    padding: 10px;
    margin: 10px;
    background-color: #2d4721;
    position: relative;
    color: white;
}

.returning {
    border: 1px solid #000;
    padding: 10px;
    margin: 10px;
    background-color: #0a8df8;
    position: relative;
    color: white;

}

.container {
    margin: 0;
    padding: 0;

}
</style>