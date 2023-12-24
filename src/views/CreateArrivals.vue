<template>
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-bold mb-4">Reservations Create</h1>
        <button @click="redirectToListArrival" class="text-green-500 hover:underline cursor-pointer">List
            Reservation</button>
        <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
    </div>
    <div class="form-container mx-auto">
        <div class="flex flex-wrap justify-between mb-8">
            <form @submit.prevent="handleCreateReservation" class="w-full max-w-lg">
                <div>
                    <div class="customer-data">
                        <label for="customer">Customer Name:</label>
                        <input id="Customer name" v-model="newReservation.customer" placeholder="Customer name"
                            class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />
                        <label for="customer">Customer Phone:</label>
                        <input id="Customer phone" v-model="newReservation.phone" placeholder="Customer Phone Number"
                            class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />
                        
                        <label for="customer">Customer Email:</label>
                        <input id="Customer email" v-model="newReservation.email" placeholder="Customer Email"
                            class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />
                    </div>
                    <div class="passengers-data">
                        <div>
                            <label for="adults">Adults:</label>
                            <input id="adults" type="number" min="0" max="30" v-model="newReservation.adult"
                                class="appearance-none block w-full bg-white-200 text-gray-700 border border-black-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray focus:border-black-500">
                        </div>
                        <div>
                            <label for="kid">Kids:</label>
                            <input id="kid" type="number" min="0" max="30" v-model="newReservation.kid"
                                class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500">
                        </div>
                        <div>
                            <label for="carseat">Car Seat:</label>
                            <input id="carseat" type="number" min="0" max="30" v-model="newReservation.carseat"
                                class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500">
                        </div>
                        <div>
                            <label for="boosterseat">Booster Seat:</label>
                            <input id="boosterseat" type="number" min="0" max="30" v-model="newReservation.boosterseat"
                                class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500">
                        </div>
                    </div>
                </div>
                <div>
                    <div class="reservation-data">
                        <div class="oneway-roundtrip">
                            <div class="flex items-center">
                                <input id="One Way" name="way" type="radio" value="One Way" v-model="newReservation.way"
                                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                <label for="One Way" class="ml-3 block text-sm font-medium text-white-700">
                                    One Way
                                </label>
                            </div>
                            <div class="flex items-center ">
                                <input id="Round Trip" name="way" type="radio" value="Round Trip"
                                    v-model="newReservation.way"
                                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                <label for="Round Trip" class="ml-3 block text-sm font-medium text-white-700">
                                    Round Trip
                                </label>
                            </div>
                            <label>You choose: {{ newReservation.way }}</label>
                        </div>

                        <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                            for="reservation-from">
                            <p>From:</p>
                        </label>
                        <div class="flex items-center" v-if="newReservation.way === 'One Way'">
                            <div class="oneway-roundtrip">
                                <div class="flex items-center ">
                                    <input id="Round Trip" name="from" type="radio" value="Hayden airport"
                                        v-model="newReservation.from"
                                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                    <label for="Pick-up from the Hayden airport"
                                        class="ml-3 block text-sm font-medium text-white-700">
                                        Pick-up from the Hayden airport
                                    </label>
                                </div>
                                <div class="flex items-center">
                                    <input id="Pick-up from Steamboat" name="from" type="radio" value="Steamboat" v-model="newReservation.from"
                                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                    <label for="One Way" class="ml-3 block text-sm font-medium text-white-700">
                                        Pick-up from Steamboat
                                    </label>
                                </div>


                            </div>
                        </div>


                        <div v-else-if="newReservation.way === 'Round Trip'">
                            <div class="oneway-roundtrip">
                                <div class="flex items-center ">
                                    <input id="Round Trip" name="from" type="radio" value="Hayden airport"
                                        v-model="newReservation.from"
                                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                    <label for="Pick-up from the Hayden airport"
                                        class="ml-3 block text-sm font-medium text-white-700">
                                        Pick-up from the Hayden airport
                                    </label>
                                </div>
                                <div class="flex items-center">
                                    <input id="Pick-up from Steamboat" name="from" type="radio"
                                        value="Steamboat" v-model="newReservation.from"
                                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                    <label for="One Way" class="ml-3 block text-sm font-medium text-white-700">
                                        Pick-up from Steamboat
                                    </label>
                                </div>


                            </div>
                        </div>
                        <div v-if="newReservation.way === 'One Way'">
                            <div v-if="newReservation.from === 'Steamboat'">
                                <h5>One way from Steamboat Spring</h5>
                                <div class="flex flex-wrap -mx-6 mb-6">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                            for="reservation-pick-time">
                                            Pick-up location in Steamboat Springs:
                                        </label>
                                        <input id="Pick-up" v-model="newReservation.pick_location"
                                            placeholder="Pick-up location"
                                            class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />
                                    </div>

                                    <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                        for="reservation-pickup-time">
                                        Date and pick-up Time:
                                    </label>
                                    <VueDatePicker v-model="newReservation.pickup_time" :is-24="false" :formatter="formatter" :timezone="'America/Denver'"
                                        class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded">
                                    </VueDatePicker>
                                    
                                    <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                        for="reservation-pickup-time">
                                        Departure Time:
                                    </label>
                                    <VueDatePicker v-model="newReservation.departure_time" type="time" time-picker
                                        :is-24="false"
                                        class="appearance-none block w-full bg-black-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500">
                                    </VueDatePicker>
                                    
                                    <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                        for="reservation-to">
                                        Droping Location:
                                    </label>
                                    <input id="to" v-model="newReservation.to" placeholder="Drop-off location "
                                        class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />



                                </div>

                            </div>

                            <div v-else-if="newReservation.from === 'Hayden airport'">
                                <h5>One Way From Hayden Airport</h5>
                                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Date and pick-up Time:
                                </label>
                                <VueDatePicker v-model="newReservation.pickup_time" :is-24="false"
                                    class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded">
                                </VueDatePicker>
                                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Landing Time:
                                </label>
                                <VueDatePicker v-model="newReservation.landing_time" time-picker type="time" :is-24="false"
                                    class="appearance-none block w-full bg-black-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500">
                                </VueDatePicker>
                                <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                    for="reservation-to">
                                    Airline and flight number:
                                </label>
                                <input id="airline" v-model="newReservation.flight" placeholder="Airline and flight number "
                                    class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                                <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                    for="reservation-to">
                                    Droping Location in Steamboat:
                                </label>
                                <input id="to" v-model="newReservation.to" placeholder="Drop-off location "
                                    class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                            </div>

                        </div>
                        <div v-else-if="newReservation.way === 'Round Trip'">

                            <div v-if="newReservation.from === 'Steamboat'">
                                <h5>Round Trip from Steamboat Spring</h5>
                                <div class="flex flex-wrap -mx-6 mb-6">
                                    <div class="w-full px-3">
                                        <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                            for="reservation-pick-time">
                                            Pick-up location in Steamboat Springs:
                                        </label>
                                        <input id="Pick-up" v-model="newReservation.pick_location"
                                            placeholder="Pick-up location"
                                            class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />
                                    </div>

                                    <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                        for="reservation-pickup-time">
                                        Date and pick-up Time:
                                    </label>
                                    <VueDatePicker v-model="newReservation.pickup_time" :is-24="false"
                                        class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded">
                                    </VueDatePicker>

                                    <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                        for="reservation-pickup-time">
                                        Departure Time:
                                    </label>
                                    <VueDatePicker v-model="newReservation.departure_time" time-picker :is-24="false"
                                        class="appearance-none block w-full bg-black-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500">
                                    </VueDatePicker>
                                    <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                        for="reservation-to">
                                        Droping Location :
                                    </label>
                                    <input id="to" v-model="newReservation.tosec" placeholder="Drop-off location "
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
                                    <VueDatePicker v-model="newReservation.re_pickup_time" :is-24="false"
                                        class="returning w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded">
                                    </VueDatePicker>
                                    <label
                                        class="returning block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                        for="reservation-pickup-time">
                                        Landing Time:
                                    </label>
                                    <VueDatePicker v-model="newReservation.landing_time" time-picker :is-24="false"
                                        class="returning appearance-none block w-full bg-black-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500">
                                    </VueDatePicker>
                                    <label class="returning  uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                        for="reservation-to">
                                        Airline and flight number:
                                    </label>
                                    <input id="airline" v-model="newReservation.flight"
                                        placeholder="Airline and flight number "
                                        class="returning appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />



                                    <label
                                        class="returning block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                        for="reservation-to">
                                        Droping Location in Steamboat:
                                    </label>
                                    <input id="to" v-model="newReservation.to" placeholder="Drop-off location "
                                        class="returning appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                                </div>
                            </div>
                            <div v-else-if="newReservation.from === 'Hayden airport'">
                                <h5>Round Trip from Hayden Airport</h5>
                                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Date and pick-up Time:
                                </label>
                                <VueDatePicker v-model="newReservation.pickup_time" :is-24="false"
                                    class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded">
                                </VueDatePicker>
                                <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Landing Time:
                                </label>
                                <VueDatePicker v-model="newReservation.landing_time" time-picker :is-24="false"
                                    class="appearance-none block w-full bg-black-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500">
                                </VueDatePicker>
                                <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                    for="reservation-to">
                                    Airline and flight number:
                                </label>
                                <input id="airline" v-model="newReservation.flight" placeholder="Airline and flight number "
                                    class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                                <label class="block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                    for="reservation-to">
                                    Droping Location in Steamboat:
                                </label>
                                <input id="to" v-model="newReservation.to" placeholder="Drop-off location "
                                    class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                                <label class="returning block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Return from Steamboat -
                                </label>
                                <label class="returning block uppercase tracking-wide text-white-700 text-xs font-bold mb-2"
                                    for="reservation-to">
                                    Pick-up Location Address:
                                </label>
                                <input id="airline" v-model="newReservation.address" placeholder="Pick-up Location Address"
                                    class="returning appearance-none block w-full bg-white-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                                <label class="returning block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Date and Pick-up Time:
                                </label>
                                <VueDatePicker v-model="newReservation.re_pickup_time" :is-24="false"
                                    class="returning w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded">
                                </VueDatePicker>
                                <label class="returning block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                                    for="reservation-pickup-time">
                                    Departure Time:
                                </label>
                                <VueDatePicker v-model="newReservation.departure_time" time-picker :is-24="false"
                                    class="returning appearance-none block w-full bg-black-200 text-white-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-black focus:border-black-500">
                                </VueDatePicker>

                            </div>
                        </div>
                        <label class="block uppercase tracking-wide text-black-700 text-xs font-bold mb-2"
                            for="reservation-pickup-time">
                            Reservation Date:
                        </label>
                        <VueDatePicker v-model="newReservation.date_reserv" :enable-time-picker="false"
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
                                <input id="Amount" name="text1" type="text" v-model="newReservation.cost"
                                    class="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <label for="Gratuity" class="block mt-4 text-sm font-medium text-white-700">
                                    Gratuity
                                </label>
                                <input id="Gratuity" name="Gratuity" type="text" v-model="newReservation.tip"
                                    class="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div v-if="newReservation.way === 'Round Trip'" class="mt-4">
                                <label for="text5" class="block mt-4 text-sm font-medium text-white-700">
                                    Second trip amount (return)
                                </label>
                                <input id="text5" name="text5" type="text" v-model="newReservation.costreturn"
                                    class="mt-1 block w-full border border-white-300 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <label for="text6" class="block mt-4 text-sm font-medium text-white-700">
                                    Second trip Gratuity (return)
                                </label>
                                <input id="text6" name="text6" type="text" v-model="newReservation.tipreturn"
                                    class="mt-1 block w-full border border-white-300 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label>Total amount: {{ totalAmount }}</label>
                            </div>
                            <div>
                                <label for="Status payment">Method Payment:</label>
                                <select
                                    class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                                    id="payment methode" v-model="newReservation.payment_met">
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
                                    id="How do you heard about us?" v-model="newReservation.heard">
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
                                    <textarea v-model="newReservation.note" placeholder="add notes"
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
                            id="Status payment" v-model="newReservation.status">
                            <option value="">--Choose Status--</option>
                            <option>Pending</option>
                            <option>Paid</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div>
                        <div v-if="dispatcherResult">
                            <label for="dispatcher">Select a Dispatcher:</label>
                            <select id="dispatcher" v-model="newReservation.dispatcher"
                                class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                                @change="onSelectUser">
                                <option value="">-- Select a dispatcher --</option>
                                <option v-for="dispatcher in dispatcherResult.Dispatcher" :key="dispatcher.id"
                                    :value="dispatcher.name">
                                    {{ dispatcher.name }}</option>
                            </select>
                            <label>Dispathcer: {{ newReservation.dispatcher }}</label>
                        </div>
                    </div>
                    <div>
                        <div v-if="driverResult">
                            <label for="driver">Select a Driver:</label>
                            <select id="driver" v-model="newReservation.driver"
                                class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                                @change="onSelectUser">
                                <option value="">-- Select a driver --</option>
                                <option v-for="driver in driverResult.Driver" :key="driver.id" :value="driver.name">{{
                                    driver.name
                                }}
                                </option>
                            </select>
                            <label> Driver: {{ newReservation.driver }}</label>
                        </div>
                    </div>
                    <div>
                        <label for="vehicle">Vehicle:</label>
                        <select
                            class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                            id="vehicle" v-model="newReservation.vehicle">
                            <option>Van #1</option>
                            <option>Van #2</option>
                            <option>Suburban</option>
                            <option>Yukon</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <label for="vehicle">Company of Reservation</label>
                    <div class="flex items-center ">
                    <input id="Moving Mountains" name="Moving Mountains" type="radio" value="MM"
                                    v-model="newReservation.company"
                                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                <label for="Moving Mountains" class="ml-3 block text-sm font-medium text-white-700">
                                    Moving Mountains
                                </label>
                                <input id="Central of Reservations" name="Central of Reservations" type="radio" value="CRS"
                                    v-model="newReservation.company"
                                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                <label for="Central of Reservations" class="ml-3 block text-sm font-medium text-white-700">
                                    Central of Reservations
                                </label>
                                <input id="First Option Ride Service" name="First Option Ride Service" type="radio" value=""
                                    v-model="newReservation.company"
                                    class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white-300" />
                                <label for="First Option Ride Service" class="ml-3 block text-sm font-medium text-white-700">
                                    First Option Ride Service
                                </label>
                            </div>
                                
                </div>
                <div class="w-full px-3">
                    <div class="flex flex-wrap -mx-3 mb-6">
                        <div class="w-full px-3">
                            <input type="submit" value="Create reservation"
                                class="bg-green-500 hover:bg-green-700 text-black font-bold py-2 px-4 rounded" />
                        </div>
                    </div>

                </div>
            </form>
        </div>
    </div>
</template>

<script setup>

import { ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import { useSignOut, useUserId } from '@nhost/vue';
import { useQuery, useMutation } from "@vue/apollo-composable";
import { gql } from "@apollo/client/core";
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import Swal from 'sweetalert2';


const router = useRouter()
const { signOut } = useSignOut()
const { userId } = useUserId()
const totalAmount = ref(0);


const logout = () => {
    signOut()
    router.push('/login')
}

const newReservation = ref({

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
    company:"",

})
const reserdatestr = new Date(newReservation.date_reserv).toLocaleDateString();

const { mutate: createReservation } = useMutation(gql`
        mutation InsertReservation($customer: String, $phone: String, $phone2: String, $email: String, $adult: Int, $kid: Int, $carseat: Int, $boosterseat: Int, $way: String, $from: String, $pick_location: String, $to: String, $flight: String, $tosec: String, $address: String, $date_reserv: date, $payment_met: String, $heard: String, $note: String, $status: String, $dispatcher: String, $driver: String, $vehicle: String, $cost: float8, $costreturn: float8, $departure_time: String, $landing_time: String, $re_pickup_time: timestamptz, $pickup_time: timestamptz, $tip: float8, $tipreturn: float8, $company: String ) {
  insert_reservation(objects: {customer: $customer, phone: $phone, phone2: $phone2, email: $email, adult: $adult, kid: $kid, carseat: $carseat, boosterseat: $boosterseat, way: $way, from: $from, pick_location: $pick_location, to: $to, flight: $flight, tosec: $tosec, address: $address, date_reserv: $date_reserv, payment_met: $payment_met, heard: $heard, note: $note, status: $status, dispatcher: $dispatcher, driver: $driver, vehicle: $vehicle, cost: $cost, costreturn: $costreturn, departure_time: $departure_time, landing_time: $landing_time, re_pickup_time: $re_pickup_time, pickup_time: $pickup_time, tip: $tip, tipreturn: $tipreturn, company: $company}) {
    affected_rows
    returning {
      id
      customer
      phone
      phone2
      email
      adult
      kid
      carseat
      boosterseat
      way
      from
      pick_location
      pickup_time
      departure_time
      to
      landing_time
      flight
      tosec
      re_pickup_time
      address
      date_reserv
      cost
      tip
      costreturn
      tipreturn
      payment_met
      heard
      note
      status
      dispatcher
      driver
      vehicle
      company
    }
  }
} 
`)


const handleCreateReservation = async () => {
    if (

        !newReservation.value.pickup_time

    ) {
        return alert("Please fill all fields")

    }
    
    const { data, errors } = await createReservation({

        customer: newReservation.value.customer,
        phone: newReservation.value.phone,
        phone2: newReservation.value.phone2,
        email: newReservation.value.email,
        adult: newReservation.value.adult,
        kid: newReservation.value.kid,
        carseat: newReservation.value.carseat,
        boosterseat: newReservation.value.boosterseat,
        way: newReservation.value.way,
        from: newReservation.value.from,
        pick_location: newReservation.value.pick_location,
        pickup_time: dateToString(newReservation.value.pickup_time),
        departure_time: formatTime(newReservation.value.departure_time),
        to: newReservation.value.to,
        landing_time: formatTime(newReservation.value.landing_time),
        flight: newReservation.value.flight,
        tosec: newReservation.value.tosec,
        re_pickup_time:dateToString(newReservation.value.re_pickup_time),
        address: newReservation.value.address,
        date_reserv: formatDate(newReservation.value.date_reserv),
        cost: newReservation.value.cost,
        tip: newReservation.value.tip,
        costreturn: newReservation.value.costreturn,
        tipreturn: newReservation.value.tipreturn,
        payment_met: newReservation.value.payment_met,
        heard: newReservation.value.heard,
        note: newReservation.value.note,
        status: newReservation.value.status,
        vehicle: newReservation.value.vehicle,
        driver: newReservation.value.driver,
        dispatcher: newReservation.value.dispatcher,
        company: newReservation.value.company,

    })
    if (errors) {
        console.error(errors);
    } else {
        const contenidoTexto = `
        Date: ${dateToString(newReservation.value.pickup_time)},
        customer: ${newReservation.value.customer},
        phone: ${newReservation.value.phone},
        phone2: ${newReservation.value.phone2},
        email: ${newReservation.value.email},
        adult: ${newReservation.value.adult},
        kid: ${newReservation.value.kid},
        carseat: ${newReservation.value.carseat},
        boosterseat: ${newReservation.value.boosterseat},
        way: ${newReservation.value.way},
        from: ${newReservation.value.from},
        pick_location: ${newReservation.value.pick_location},
        departure_time: ${formatTime(newReservation.value.departure_time)},
        to: ${newReservation.value.to},
        landing_time: ${formatTime(newReservation.value.landing_time)},
        flight: ${newReservation.value.flight},
        tosec: ${newReservation.value.tosec},
        re_pickup_time:${dateToString(newReservation.value.re_pickup_time)},
        address: ${newReservation.value.address},
        date_reserv: ${formatDate(newReservation.value.date_reserv)},
        cost: ${newReservation.value.cost},
        tip: ${newReservation.value.tip},
        costreturn: ${newReservation.value.costreturn},
        tipreturn: ${newReservation.value.tipreturn},
        payment_met: ${newReservation.value.payment_met},
        heard: ${newReservation.value.heard},
        note: ${newReservation.value.note},
        status: ${newReservation.value.status},
        vehicle: ${newReservation.value.vehicle},
        driver: ${newReservation.value.driver},
        dispatcher: ${newReservation.value.dispatcher},
POLICIES

Cancellations

Cancellations made 48 hours prior to the trip will receive a full refund minus a 5% service charge fee.

Cancellations on the day of the trip, or any no-shows will incur in:

– 50% fee in a roundtrip.
– 100% fee in one way rides.

Liability

First Option Ride Service LLC We will not be responsible for canceled flights, 
bad traffic conditions, or delays caused by weather or any other conditions beyond our control. 
However, in the event of a flight delay, we are willing to reschedule your pick-up time
based on our availability
        `;

        const blob = new Blob([contenidoTexto], { type: 'text/plain' });
        const contenidoURL = URL.createObjectURL(blob);

        await Swal.fire({
            icon: 'success',
            title: 'Successfully',
            html: `
                <p>Reservation created successfully</p>
                <a href="${contenidoURL}" download="Reservation ${newReservation.value.customer}.txt">
                    <button class="swal2-confirm swal2-styled" type="button">
                        Descargar Datos
                    </button>
                </a>
            `,
            showCancelButton: false,
            showCloseButton: false,
            allowOutsideClick: false,
        });

        newReservation.value = {

            pick_location: '',
            to: '',
            landing_time: '',
            pickup_time: '',
            customer: '',
            flight: '',
            adult: 0,
            kid: 0,
            carseat: 0,
            boosterseat: 0,
            way: '',
            cost: 0,
            tip: 0,
            costreturn: 0,
            tipreturn: 0,
            total_amount: 0,
            payment_met: '',
            status: '',
            driver: '',
            dispatcher: '',
            vehicle: '',
            date_reserv: '',

            heard: '',
            note: '',
            customer: '',
            phone: '',
            email: '',
        };

        redirectToListArrival();
    }
}



const redirectToListArrival = () => {
    router.push('/arrivals')
    router.afterEach(() => {
        window.location.reload();
    });
}
const formatter = ref({
    date: "MMM dd yyyy ",
    month: "MMM",
    time: "HH:mm tt"
});
const selectedDate = ref(null);
const datePickerFormat = 'yyyy-MM-dd hh:mm tt';


watchEffect(() => {
    const cost = parseFloat(newReservation.value.cost) || 0;
    const tip = parseFloat(newReservation.value.tip) || 0;
    const tipreturn = parseFloat(newReservation.value.tipreturn) || 0;
    const costreturn = parseFloat(newReservation.value.costreturn) || 0;
    totalAmount.value = cost + tip + tipreturn + costreturn;
});

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
  /* const timezone = (timezoneOffset < 0 ? '+' : '-') +
    String(offsetHours).padStart(2, '0') +
    ':' +
    String(offsetMinutes).padStart(2, '0'); */

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


</script>
<style scoped>
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
    /* Ajusta la posición vertical del título según sea necesario */
    left: 10px;
    /* Ajusta la posición horizontal del título según sea necesario */
    background-color: #050a69;
    /* Mantén el mismo color de fondo */
    padding: 0 5px;
    /* Ajusta el espaciado del título según sea necesario */
    font-weight: bold;
    border: 1px solid #000;
    /* Bordes alrededor del título */
    border-bottom: none;
    /* Elimina el borde inferior para que no se duplique */
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
    /* Ajusta la posición vertical del título según sea necesario */
    left: 10px;
    /* Ajusta la posición horizontal del título según sea necesario */
    background-color: #701010;
    /* Mantén el mismo color de fondo */
    padding: 0 5px;
    /* Ajusta el espaciado del título según sea necesario */
    font-weight: bold;
    border: 1px solid #000;
    /* Bordes alrededor del título */
    border-bottom: none;
    /* Elimina el borde inferior para que no se duplique */
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