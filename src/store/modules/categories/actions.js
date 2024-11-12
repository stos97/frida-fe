export default {
    async getAllCategories(context) {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/categories', {
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

        context.commit('setCategories', {
            categories: responseData.data,
        })
    },
    async deleteCategory(context, payload) {
        const id = payload.id;

        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/categories/' + id, {
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

        context.commit('deleteCategory', {
            id: id
        })
    },
    async addCategory(context, payload) {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/categories/', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer '+ localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: payload.name
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to delete!');
        }

        context.commit('addCategory', {
            category: responseData.data
        })
    }
};