import Vue from 'vue'
import App from '@/aresrpg.vue'
import router from './router'
import VueMq from 'vue-mq'
import Ripple from 'vue-ripple-directive'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import './registerServiceWorker'

const eventBus = new Vue()

Vue.config.productionTip = false
Vue.directive('rp', Ripple)
Vue.use(VueMq, {
	breakpoints: {
		sm: 800,
		lg: Infinity,
	},
})

window.loadComponent = name => ({
	component: import(`@cmp/${name}.vue`),
	loading: () => import('@cmp/loading.vue'),
	error: () => import('@cmp/loading.vue'), // TODO
	delay: 200,
	timeout: 5000, // TODO
})

window.eventBus = {
	on: eventBus.$on,
	off: eventBus.$off,
	once: eventBus.$once,
	send: eventBus.$emit,
	events: {
		TRIGGER_MENU_LOCK: 'lockmenu',
		TRIGGER_MENU_OPEN: 'forcemenu',
		MENU_FLOATING: 'menufloating',
		MENU_OPENNED: 'menuopenned',
		TRIGGER_SCROLL: 'scrollto',
	},
}

new Vue({
	router,
	methods: {
		// litle npm script to disable body scroll on all devices (because those IOS suckers think different)
		lockScroll: el => disableBodyScroll(el),
		unlockScroll: el => enableBodyScroll(el),
	},
	render: h => h(App),
}).$mount('#app')
