export default {
    setServices(state, payload) {
        state.services = payload.services;
    },
    deleteService(state, payload) {
        state.services = state.services.filter(service => service.id !== payload.id);
    },
    updateService(state, payload) {
        state.services.find(service => service.id === payload.id).additions = payload.additions;
    },
    attachAdditionToService(state, payload) {
        state.services.find(service => service.id === payload.id).additions.push(payload.addition);
    },
    addService(state, payload) {
        state.services.push(payload.service);
    }
}
