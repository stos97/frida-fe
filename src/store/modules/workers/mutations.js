export default {
    setWorkers(state, payload) {
        state.workers = payload.workers;
    },
    setCurrentWorker(state, payload) {
        state.currentWorker = payload.worker;
    },
    setWorkerServices(state, payload) {
        state.workerServices = payload.workerServices;
    },
    deleteWorkerService(state, payload) {
        for (const category in state.workerServices) {
            if (state.workerServices.hasOwnProperty(category)) {
                state.workerServices[category] = state.workerServices[category].filter(service => service.service_id !== payload.id);
            }
        }
    },
}
