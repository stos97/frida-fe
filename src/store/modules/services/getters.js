export default {
    services(state) {
        return state.services;
    },
    filteredServices(state) {
        const transformedData = {};

        state.services.forEach(service => {
            const categoryName = service.category.name;

            if (!transformedData[categoryName]) {
                transformedData[categoryName] = [];
            }
            transformedData[categoryName].push(service);
        });

        return transformedData;
    },
}