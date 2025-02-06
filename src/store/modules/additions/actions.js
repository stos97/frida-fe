export default {
    async getAllAdditions(context, payload) {
        const baseUrl = import.meta.env.VITE_API_BASE_URL + '/additions';
        const params = {
            service_id: payload?.service_id
        };
        const queryString = payload?.service_id ? new URLSearchParams(params).toString() : '';
        const response = await fetch( `${baseUrl}?${queryString}`, {
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
    async addAddition(context, payload) {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/additions', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            },
            body: JSON.stringify( {
                type: payload.type,
                name: payload.name
            })
        })

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to store addition!');
        }

        context.commit('addAddition', {
            addition: responseData.data
        });
    },
    async deleteAddition(context, payload) {
        const id = payload.id;
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/additions/' + id, {
            method: 'DELETE',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            }
        })

        if (!response.ok) {
            throw new Error('Failed to delete!')
        }

        context.commit('deleteAddition', {
            id
        });
    }
}