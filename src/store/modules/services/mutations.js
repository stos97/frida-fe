export default {
    setServices(state, payload) {
        state.services = payload.services;
    },
    deleteService(state, payload) {
        state.services = state.services.filter(service => service.id !== payload.id);
    }
}
