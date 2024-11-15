import {createApp} from 'vue'
import App from './App.vue'
import router from './router/index.js';

import {IonicVue} from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
import '@ionic/vue/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import store from "@/store/index.js";
import BaseSpinner from "@/components/base/BaseSpinner.vue";
import BaseLayout from "@/components/base/BaseLayout.vue";
import TheMenu from "@/components/layout/TheMenu.vue";
import BaseCard from "@/components/base/BaseCard.vue";

const app = createApp(App)
    .use(IonicVue)
    .use(router)
    .use(store);

app.component('base-spinner', BaseSpinner);
app.component('base-layout', BaseLayout);
app.component('base-card', BaseCard);
app.component('TheMenu', TheMenu);

router.isReady().then(() => {
    app.mount('#app');
});
