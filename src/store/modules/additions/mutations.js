export default {
    setAdditions(state, payload) {
        state.additions = payload.additions;
    },
    addAddition(state, payload) {
        state.additions.push(payload.addition);
    }
}