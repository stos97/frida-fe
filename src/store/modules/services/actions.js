export default {
    async getAllServices(context, payload) {
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
        })
    }
}
