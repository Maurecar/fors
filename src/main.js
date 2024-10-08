import { createApp } from 'vue'
import './main.css'

import App from './App.vue'
import VueTheMask from 'vue-the-mask'


import { createApolloClient } from '@nhost/apollo'
import { NhostClient } from '@nhost/vue'
import { DefaultApolloClient } from '@vue/apollo-composable'

import { createRouter, createWebHistory } from 'vue-router' 


import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'


const nhost = new NhostClient({
    subdomain: 'tfbyfdknrcrltxoxtjhx',
    region: 'us-east-1'
   
})

const apolloClient = createApolloClient({ nhost })
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./views/Home.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/van1',
        name: 'van1',
        component: () => import('./views/Van1.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/van2',
        name: 'van2',
        component: () => import('./views/Van2.vue'),
        meta: {
            protected: true
        }
    },
        {
        path: '/suburban',
        name: 'suburban',
        component: () => import('./views/Suburban.vue'),
        meta: {
            protected: true
        }
    },
    
    {
        path: '/yukon',
        name: 'yukon',
        component: () => import('./views/Yukon.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/createcustomers',
        name: 'createcustomers',
        component: () => import('./views/CreateCustomer.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/drivers',
        name: 'drivers',
        component: () => import('./views/Drivers.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/createdrivers',
        name: 'createdrivers',
        component: () => import('./views/CreateDrivers.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/dispatchers',
        name: 'dispatchers',
        component: () => import('./views/Dispatchers.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/createdispatchers',
        name: 'createdispatchers',
        component: () => import('./views/CreateDispatchers.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/arrivals',
        name: 'arrivals',
        component: () => import('./views/Arrivals.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/vehicles',
        name: 'vehicles',
        component: () => import('./views/Vehicles.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/trip',
        name: 'trip',
        component: () => import('./views/Trip.vue'),
        meta: {
            protected: false
        }
    },
    {
        path: '/createarrivals',
        name: 'createarrivals',
        component: () => import('./views/CreateArrivals.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/departures',
        name: 'departures',
        component: () => import('./views/Departures.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/createdepartures',
        name: 'createdepartures',
        component: () => import('./views/CreateDepartures.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/check',
        name: 'check',
        component: () => import('./views/Check.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/createvehicles',
        name: 'createvehicles',
        component: () => import('./views/CreateVehicles.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/finance',
        name: 'finance',
        component: () => import('./views/Finance.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/pricing',
        name: 'pricing',
        component: () => import('./views/PricingTable.vue'),
        meta: {
            protected: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('./views/Login.vue'),
        meta: { hideNavbar: true }
    }
];

const router = createRouter({ 
    history: createWebHistory(),
    routes
});

router.beforeEach(async (to, from, next) => { 
    if (to.matched.some(record => record.meta.protected)) {
        const isAuthenticated = await nhost.auth.isAuthenticatedAsync()  
        if (!isAuthenticated) {
            return next('/login')
        }
    }
    next()
    const hideNavbar = to.meta.hideNavbar
    
})


createApp(App)
    .provide(DefaultApolloClient, apolloClient)
    .use(nhost)
    .use(router)
    .use(VueTheMask)
    .component('VueDatePicker', VueDatePicker)
    .mount('#app')
