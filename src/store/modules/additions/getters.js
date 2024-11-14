export default {
    additions(state) {
        return state.additions;
    },
    transformedAdditions(state) {
        const transformedData = {};

        state.additions.forEach(addition => {
            const type = addition.type;

            if (!transformedData[type]) {
                transformedData[type] = [];
            }
            transformedData[type].push(addition);
        });

        return transformedData;
    },
}