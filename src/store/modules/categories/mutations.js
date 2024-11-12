export default {
    setCategories(state, payload) {
        state.categories = payload.categories;
    },
    deleteCategory(state, payload) {
        state.categories = state.categories.filter(category => category.id !== payload.id);
    }
}