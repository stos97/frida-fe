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
}
