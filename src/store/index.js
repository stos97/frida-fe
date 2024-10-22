import {createStore} from "vuex";

import authModule from "./modules/auth/index.js"

const store = createStore({
    modules: {
        authModule
    }
});

export default store;
