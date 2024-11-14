import {createStore} from "vuex";

import authModule from "./modules/auth/index.js"
import categoriesModule from "./modules/categories/index.js"
import servicesModule from './modules/services/index.js'

const store = createStore({
    modules: {
        authModule,
        categoriesModule,
        servicesModule
    }
});

export default store;
