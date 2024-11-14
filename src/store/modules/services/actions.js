export default {
    async getAllServices(context) {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/services', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to fetch!')
        }

        context.commit('setServices', {
            services: responseData.data,
        });
    },
    async deleteService(context, payload) {
        const serviceId = payload.id;
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/services/' + serviceId, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete!')
        }

        context.commit('deleteService', {
            id: serviceId,
        });
    }
}
