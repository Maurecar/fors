<template>
    <div class="flex items-center justify-between mb-8">
        <h1 class="text-sm sm:text-4xl font-bold mb-4">New Reservations</h1>
        <button @click="redirectToListArrival" class="text-sm sm:text-2xl text-green-500 hover:underline cursor-pointer">Booked Reservations</button>
        <button @click="logout" class="text-red-500 hover:underline cursor-pointer">Logout</button>
    </div>
    <div>
        <div></div>
        <option  v-for="x in reservation2Result.X" :key="x.id" :value="x.id"> 
        <p>The # of reservation is {{ x.id }}</p>
        </option>
    </div>
    <div class="form-container mx-auto ">
        <div class="">
            <form @submit.prevent="handleCreateReservation" class="grid grid-cols-1 sm:grid-cols-3">
                <div>
                    <div class="customer-data">
                        <label for="customer">Customer Name:</label>
                        <input id="Customer name" v-model="newReservation.customer" placeholder="Customer name"
                            class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />
                        <label for="customer">Customer Phone:</label>
                        <input v-mask="'(###) ###-####'" id="Customer phone" v-model="newReservation.phone" placeholder="(987) 123-4567"
                            class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />

                        <label for="customer">Customer Email:</label>
                        <input id="Customer email" v-model="newReservation.email" placeholder="Customer Email"
                            class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500" />
                    </div>
                    <div class="passengers-data">
                        <div>
                            <label for="adults">Adults:</label>
                            <input id="adults"  v-model="newReservation.adult"
                                class="appearance-none block w-full bg-white-200 text-gray-700 border border-black-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray focus:border-black-500">
                        </div>
                        <div>
                            <label for="kid">Kids:</label>
                            <input id="kid"  v-model="newReservation.kid"
                                class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500">
                        </div>
                        <div>
                            <label for="carseat">Car Seat:</label>
                            <input id="carseat"  v-model="newReservation.carseat"
                                class="appearance-none block w-full bg-white-200 text-gray-700 border border-white-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-white-500">
                        </div>
                        <div>
                            <label for="boosterseat">Booster Seat:</label>
                            <input id="boosterseat" v-model="newReservation.boosterseat"
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
                                    <input id="Pick-up from Steamboat" name="from" type="radio" value="Steamboat"
                                        v-model="newReservation.from"
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
                                    <input id="Pick-up from Steamboat" name="from" type="radio" value="Steamboat"
                                        v-model="newReservation.from"
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
                                    <VueDatePicker v-model="newReservation.pickup_time" :is-24="false"
                                        :formatter="formatter"
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
                                <h5>One Way From Hayden airport</h5>
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

                                        Return from the Airport -
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
                                <h5>Round Trip from Hayden airport</h5>
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
                                    class="block w-full bg-white-200 text-black border-white-200 rounded py-3 px-4 mb-3" />

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
                                    <label for="Gratuity" class="block mt-4 text-sm font-medium text-white-700">
                                    Square App Fee
                                </label>
                                <input id="Fee" name="Fee" type="text" v-model="newReservation.fee"
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
                                    <label for="Gratuity" class="block mt-4 text-sm font-medium text-white-700">
                                    Square App Fee (return)
                                </label>
                                <input id="Fee" name="Fee" type="text" v-model="newReservation.fee2"
                                    class="mt-1 block w-full border border-gray-300 text-gray-700 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label>Total amount: {{ totalAmount }}</label>
                            </div>
                            <div>
                                <label for="Status payment">Method Payment:</label>
                                <select
                                    class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                                    id="payment  method" v-model="newReservation.payment_met">
                                    <option value="">--Choose Payment Method--</option>
                                    <option>Payment Link</option>
                                    <option>Credit Card</option>
                                    <option>Cash</option>
                                    <option>CRS - paid</option>
                                    <option>other</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div class="others">
                            <div>
                                <label for="How do you heard about us?">How did you hear about us?</label>
                                <select
                                    class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                                    id="How do you heard about us?" v-model="newReservation.heard">
                                    <option value="">--Choose Option--</option>
                                    <option>Google search</option>
                                    <option>Hotel´s front desk</option>
                                    <option>Steamboat Central Reservations</option>
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
                            <option>CRS - Paid</option>
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
                        </div>
                    </div>
                    <div>
                        <label for="vehicle">Vehicle:</label>
                        <select
                            class="w-full bg-white-200 border border-white-200 text-black text-xs py-3 px-4 pr-8 mb-3 rounded"
                            id="vehicle" v-model="newReservation.vehicle">
                            <option value="">--Choose a vehicle</option>
                            <option>Van #1</option>
                            <option>Van #2</option>
                            <option>Van #3</option>
                            <option>Suburban</option>
                            <option>Suburban Carlos</option>
                            <option>Ford-E Librado</option>
                            <option>Yukon #1</option>
                            <option>Yukon #2</option>
                            <option>Other</option>
                        </select>
                    </div>
                    <div v-if="newReservation.way === 'Round Trip'" class="mt-4">
                        <div>
                            <div v-if="driverResult">
                                <label for="driver2">Select a Driver for returning:</label>
                                <select id="driver2" v-model="newReservation.driver2"
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
                                id="vehicle" v-model="newReservation.vehicle2">
                                <option value="">--Choose a vehicle for returning</option>
                                <option>Van #1</option>
                                <option>Van #2</option>
                                <option>Van #3</option>
                                <option>Suburban</option>
                                <option>Suburban Carlos</option>
                                <option>Ford-E Librado</option>
                                <option>Yukon #1</option>
                                <option>Yukon #2</option>
                                <option>Other</option> 
                                <!-- crear logica para agregar automaticamente un vehiculo desde la base de datos -->
                            </select>
                        </div>

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
import {TheMask} from 'vue-the-mask'

const router = useRouter()
const { signOut } = useSignOut()
const { userId } = useUserId()
const totalAmount = ref(0);
const Totalarrive = ref(0);
const Totaldeparture = ref(0);

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
    fee: 0,
    fee2: 0,
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
const reserdatestr = new Date(newReservation.date_reserv).toLocaleDateString();
const { mutate: createReservation } = useMutation(gql`
        mutation InsertReservation($customer: String, $phone: String, $phone2: String, $email: String, $adult: Int, $kid: Int, $carseat: Int, $boosterseat: Int, $way: String, $from: String, $pick_location: String, $to: String, $flight: String, $tosec: String, $address: String, $date_reserv: date, $payment_met: String, $heard: String, $note: String, $status: String, $dispatcher: String, $driver: String, $driver2: String, $vehicle: String, $vehicle2: String, $cost: float8, $costreturn: float8, $departure_time: String, $landing_time: String, $re_pickup_time: timestamptz, $pickup_time: timestamptz, $tip: float8, $fee: float8, $fee2: float8, $tipreturn: float8, $company: String ) {
  insert_reservation(objects: {customer: $customer, phone: $phone, phone2: $phone2, email: $email, adult: $adult, kid: $kid, carseat: $carseat, boosterseat: $boosterseat, way: $way, from: $from, pick_location: $pick_location, to: $to, flight: $flight, tosec: $tosec, address: $address, date_reserv: $date_reserv, payment_met: $payment_met, heard: $heard, note: $note, status: $status, dispatcher: $dispatcher, driver: $driver, driver2: $driver2, vehicle: $vehicle, vehicle2: $vehicle2, cost: $cost, costreturn: $costreturn, departure_time: $departure_time, landing_time: $landing_time, re_pickup_time: $re_pickup_time, pickup_time: $pickup_time, tip: $tip, tipreturn: $tipreturn, fee: $fee, fee2: $fee2, company: $company}) {
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
      fee2
      fee
      payment_met
      heard
      note
      status
      dispatcher
      driver
      vehicle
      driver2
      vehicle2
      company
    }
  }
} 
`)
const handleCreateReservation = async () => {
    let contenidoTexto = '';
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
        re_pickup_time: dateToString(newReservation.value.re_pickup_time),
        address: newReservation.value.address,
        date_reserv: formatDate(newReservation.value.date_reserv),
        cost: newReservation.value.cost,
        tip: newReservation.value.tip,
        costreturn: newReservation.value.costreturn,
        tipreturn: newReservation.value.tipreturn,
        fee: newReservation.value.fee,
        fee2: newReservation.value.fee2,
        payment_met: newReservation.value.payment_met,
        heard: newReservation.value.heard,
        note: newReservation.value.note,
        status: newReservation.value.status,
        vehicle: newReservation.value.vehicle,
        driver: newReservation.value.driver,
        vehicle2: newReservation.value.vehicle2,
        driver2: newReservation.value.driver2,
        dispatcher: newReservation.value.dispatcher,
        company: newReservation.value.company,

    })
    if (errors) {
        console.error(errors);
    } else {
       
        if (newReservation.value.way === "One Way") {
            if (newReservation.value.from === "Steamboat") {
                contenidoTexto = ` DEPARTURE
Date: ${formatDate(newReservation.value.pickup_time)}
from: ${newReservation.value.pick_location}
to: ${newReservation.value.to}
Pick-up time: ${formatTimetwo(newReservation.value.pickup_time)}
Flight departure time: ${formatTime(newReservation.value.departure_time)}
Name: ${newReservation.value.customer}
Phone: ${newReservation.value.phone} ${newReservation.value.phone2}
Adults: ${newReservation.value.adult}
kids: ${newReservation.value.kid}
Car seat: ${newReservation.value.carseat}
Booster seat: ${newReservation.value.boosterseat}
Vehicle: ${newReservation.value.vehicle}
Payment status, already paid: ${newReservation.value.way} cost: $${newReservation.value.cost} + gratuity: $${newReservation.value.tip} = Total: $${Totalarrive.value}
Payment  method: ${newReservation.value.payment_met}
Email: ${newReservation.value.email}
Dispatcher's name: ${newReservation.value.dispatcher}
Driver's name: ${newReservation.value.driver}
Date of reservation: ${formatDate(newReservation.value.date_reserv)}
How do you hear about us?: ${newReservation.value.heard}
NOTES: ${newReservation.value.note}
                `
            } else { contenidoTexto = `ARRIVAL
Date: ${formatDate(newReservation.value.pickup_time)}
from: ${newReservation.value.from} ${newReservation.value.address}
to: ${newReservation.value.to}
Pick-up time: ${formatTimetwo(newReservation.value.pickup_time)}
Landing time: ${formatTime(newReservation.value.landing_time)}
Name: ${newReservation.value.customer}
Phone: ${newReservation.value.phone} ${newReservation.value.phone2}
Adults: ${newReservation.value.adult}
kids: ${newReservation.value.kid}
Car seat: ${newReservation.value.carseat}
Booster seat: ${newReservation.value.boosterseat}
Vehicle: ${newReservation.value.vehicle}
Payment status, already paid: ${newReservation.value.way} cost: $${newReservation.value.cost} + gratuity: $${newReservation.value.tip} = Total: $${Totalarrive.value}
Payment  method: ${newReservation.value.payment_met}
Email: ${newReservation.value.email}
Flight: ${newReservation.value.flight}
Dispatcher's name: ${newReservation.value.dispatcher}
Driver's name: ${newReservation.value.driver}
Date of reservation: ${formatDate(newReservation.value.date_reserv)}
How do you hear about us?: ${newReservation.value.heard}
NOTES: ${newReservation.value.note}
     `
            }
        } else {
            if (newReservation.value.from === "Steamboat") {
                contenidoTexto = `DEPARTURE
Date: ${formatDate(newReservation.value.pickup_time)}
from: ${newReservation.value.pick_location}
to: ${newReservation.value.to}
Pick-up time: ${formatTimetwo(newReservation.value.pickup_time)}
Flight departure time: ${formatTime(newReservation.value.departure_time)}
Name: ${newReservation.value.customer}
Phone: ${newReservation.value.phone} ${newReservation.value.phone2}
Adults: ${newReservation.value.adult}
kids: ${newReservation.value.kid}
Car seat: ${newReservation.value.carseat}
Booster seat: ${newReservation.value.boosterseat}
Vehicle: ${newReservation.value.vehicle}
Payment status, already paid: ${newReservation.value.way} One Way Cost: $${newReservation.value.cost} + gratuity: $${newReservation.value.tip} = Total: $${Totalarrive.value}
Payment  method: ${newReservation.value.payment_met}
Email: ${newReservation.value.email}
Flight: ${newReservation.value.flight}
Dispatcher's name: ${newReservation.value.dispatcher}
Driver's name: ${newReservation.value.driver}
Date of reservation: ${formatDate(newReservation.value.date_reserv)}
How do you hear about us?: ${newReservation.value.heard}
NOTES: ${newReservation.value.note}
=====================================================
ARRIVAL
Date: ${formatDate(newReservation.value.re_pickup_time)}
from: ${newReservation.value.to}
to: ${newReservation.value.from}
Pick-up time: ${formatTimetwo(newReservation.value.re_pickup_time)}
Landing time: ${formatTime(newReservation.value.landing_time)}
Name: ${newReservation.value.customer}
Phone: ${newReservation.value.phone} ${newReservation.value.phone2}
Adults: ${newReservation.value.adult}
kids: ${newReservation.value.kid}
Car seat: ${newReservation.value.carseat}
Booster seat: ${newReservation.value.boosterseat}
Vehicle for returning: ${newReservation.value.vehicle2}
Payment status, already paid: ${newReservation.value.way} One Way Cost: $${newReservation.value.costreturn} + gratuity: $${newReservation.value.tipreturn} = Total: $${Totaldeparture.value}
Payment  method: ${newReservation.value.payment_met}
Email: ${newReservation.value.email}
Flight: ${newReservation.value.flight}
Dispatcher's name: ${newReservation.value.dispatcher}
Driver's name for returning: ${newReservation.value.driver2}
Date of reservation: ${formatDate(newReservation.value.date_reserv)}
How do you hear about us?: ${newReservation.value.heard}
NOTES: ${newReservation.value.note}
                `
            } else {
                contenidoTexto = `ARRIVAL
Date: ${formatDate(newReservation.value.pickup_time)}
from: ${newReservation.value.from}
to: ${newReservation.value.to}
Pick-up time: ${formatTimetwo(newReservation.value.pickup_time)}
Landing time: ${formatTime(newReservation.value.landing_time)}
Name: ${newReservation.value.customer}
Phone: ${newReservation.value.phone} ${newReservation.value.phone2}
Adults: ${newReservation.value.adult}
kids: ${newReservation.value.kid}
Car seat: ${newReservation.value.carseat}
Booster seat: ${newReservation.value.boosterseat}
Vehicle: ${newReservation.value.vehicle}
Payment status, already paid: ${newReservation.value.way} 
One Way Cost: $${newReservation.value.cost} + gratuity: $${newReservation.value.tip} = Total: $${Totalarrive.value}
Payment  method: ${newReservation.value.payment_met}
Email: ${newReservation.value.email}
Flight: ${newReservation.value.flight}
Dispatcher's name: ${newReservation.value.dispatcher}
Driver's name: ${newReservation.value.driver}
Date of reservation: ${formatDate(newReservation.value.date_reserv)}
How do you hear about us?: ${newReservation.value.heard}
NOTES: ${newReservation.value.note}
==============================================================
DEPARTURE
Date: ${formatDate(newReservation.value.re_pickup_time)}
from: ${newReservation.value.address}
to: ${newReservation.value.from}
Pick-up time: ${formatTimetwo(newReservation.value.re_pickup_time)}
Flight departure time: ${formatTime(newReservation.value.departure_time)}
Name: ${newReservation.value.customer}
Phone: ${newReservation.value.phone} ${newReservation.value.phone2}
Adults: ${newReservation.value.adult}
kids: ${newReservation.value.kid}
Car seat: ${newReservation.value.carseat}
Booster seat: ${newReservation.value.boosterseat}
Vehicle for returning: ${newReservation.value.vehicle2}
Payment status, already paid: ${newReservation.value.way} 
One Way Cost: $${newReservation.value.costreturn} + gratuity: $${newReservation.value.tipreturn} = Total: $${Totaldeparture.value}
Payment  method: ${newReservation.value.payment_met}
Email: ${newReservation.value.email}
Dispatcher's name: ${newReservation.value.dispatcher}
Driver's name for returning: ${newReservation.value.driver2}
Date of reservation: ${formatDate(newReservation.value.date_reserv)}
How do you hear about us?: ${newReservation.value.heard}
NOTES: ${newReservation.value.note}
                `
            }
        };
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
            fee: 0,
            fee2: 0,
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
   
    totalAmount.value = cost + tip + tipreturn + costreturn ;
    Totalarrive.value = cost + tip ;
    Totaldeparture.value = costreturn + tipreturn;

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
const {
    loading: reservation2Loading,
    result: reservation2Result,
    refetch: reservation2Refetch
} = useQuery(gql`
            query GetReservation {
                reservation(order_by: {id: desc}, limit: 1) {
            id
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
/* quitar selector de numeros es adultos niños boosterseat y carseat*/
</style>
