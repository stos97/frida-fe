export default {
    async getAllWorkers(context) {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/workers', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to fetch workers!')
        }

        context.commit('setWorkers', {
            workers: responseData.data
        });
    },
    setCurrentWorker(context, payload) {
        context.commit('setCurrentWorker', payload);
    },
    async getWorkerServices(context, payload) {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/worker-service/' + payload.id, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to fetch worker services!');
        }

        context.commit('setWorkerServices', {
            workerServices: responseData.data,
        });
    },
    async deleteWorkerService(context, payload) {
        const workerId = payload.workerId;
        const serviceId = payload.serviceId;
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/worker-service/' + workerId, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                service_id: serviceId,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to delete worker service!')
        }

        context.commit('deleteWorkerService', {
            id: serviceId,
        });
    },
    async addServiceToWorker(context, payload) {
        const workerId = payload.workerId;
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/worker-service/' + workerId, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                service_id: payload.serviceId,
                price: payload.price,
                minutesNeeded: payload.minutesNeeded,
                additions: payload.additions,
            }),
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to create worker service')
        }
    },
    async updateWorkerService(context, payload) {
        const workerId = payload.workerId;
        const serviceId = payload.serviceId;
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + `/worker/${workerId}/service/${serviceId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                service_id: serviceId,
                price: payload.price,
                minutesNeeded: payload.minutesNeeded,
                additions: payload.additions
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to update worker service!');
        }
    }
}
