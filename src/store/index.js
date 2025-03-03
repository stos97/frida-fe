import {createStore} from "vuex";

import authModule from "./modules/auth/index.js"
import categoriesModule from "./modules/categories/index.js"
import servicesModule from './modules/services/index.js'
import additionsModule from './modules/additions/index.js'
import workersModule from './modules/workers/index.js';

const store = createStore({
    modules: {
        authModule,
        categoriesModule,
        servicesModule,
        additionsModule,
        workersModule,
    }
});

export default store;
