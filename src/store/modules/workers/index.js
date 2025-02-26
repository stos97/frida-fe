import getters from './getters.js';
import actions from './actions.js';
import mutations from './mutations.js';

export default {
    state() {
        return {
            workers: [],
            currentWorker: null,
            workerServices: [],
        }
    },
    getters,
    actions,
    mutations
};