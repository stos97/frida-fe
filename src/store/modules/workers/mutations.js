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
}
