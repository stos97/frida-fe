export default {
    setUser(state, payload) {
        state.token = payload.token;
        state.user = payload.user;
    }
}