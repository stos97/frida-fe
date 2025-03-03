export default {
    async getAllServices(context, payload) {
        const baseUrl = import.meta.env.VITE_API_BASE_URL + '/services';
        const params = {
            worker_id: payload?.worker_id
        };
        const queryString = payload?.worker_id ? new URLSearchParams(params).toString() : '';

        const response = await fetch(`${baseUrl}?${queryString}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
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
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });

        if (!response.ok) {
            throw new Error('Failed to delete!')
        }

        context.commit('deleteService', {
            id: serviceId,
        });
    },
    async detachAdditionFromService(context, payload) {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/services/' + payload.id + '/additions', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                additions: payload.additions.map(addition => addition.id),
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to detach addition!')
        }

        this.commit('updateService', {
            id: payload.id,
            additions: payload.additions,
        })
    },
    async attachAdditionFromService(context, payload) {
        this.commit('attachAdditionToService', {
            id: payload.id,
            addition: payload.addition,
        });

        const additions = context.getters.services.find(item => item.id === payload.id).additions;
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/services/' + payload.id + '/additions', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                additions: additions.map(addition => addition.id),
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to detach addition!')
        }

    },
    async addService(context, payload) {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/services', {
            method: 'POST',
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                name: payload.name,
                category_id: payload.category_id,
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to add service');
        }

        context.commit('addService', {
            service: responseData.data
        });
    },
    async getServiceById(context, payload) {
        const id = payload.id;
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/services/' + id, {
            headers: {
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to fetch service!');
        }

        context.commit('setService', {
            service: responseData.data,
        });
    }
}
