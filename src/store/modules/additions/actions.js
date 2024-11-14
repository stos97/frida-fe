export default {
    async getAllAdditions(context) {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/additions', {
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

        context.commit('setAdditions', {
            additions: responseData.data,
        })
    },
}