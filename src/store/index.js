import {createStore} from "vuex";

import authModule from "./modules/auth/index.js"
import categoriesModule from "./modules/categories/index.js"

const store = createStore({
    modules: {
        authModule,
        categoriesModule
    }
});

export default store;
