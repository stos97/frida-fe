export default {
    setAdditions(state, payload) {
        state.additions = payload.additions;
    },
    addAddition(state, payload) {
        state.additions.push(payload.addition);
    },
    deleteAddition(state, payload) {
        state.additions = state.additions.filter(addition => addition.id !== payload.id);
    }
}