export default {
    async login(context, payload) {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/auth/login', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
            })
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to Login!')
        }

        const token = responseData.access_token;
        localStorage.setItem('token', token)

        context.commit('setUser', {
            token: token,
            user: responseData.user,
        });
    },
    async register(context, payload) {
        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/auth/register', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: payload.name,
                email: payload.email,
                password: payload.password,
                password_confirmation: payload.passwordConfirmation,
                phone: payload.phone,
            })
        })

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to register')
        }

        const token = responseData.access_token;
        localStorage.setItem('token', token)

        context.commit('setUser', {
            token: token,
            user: responseData.user,
        });
    },
    async tryLogin(context) {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/profile', {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Authorization': 'Bearer '+ token
            },
        });

        const responseData = await response.json();

        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to fetch user')
        }

        context.commit('setUser', {
            token: token,
            user: responseData.data,
        });
    },
    async logout(context) {
        const token = localStorage.getItem('token');

        const response = await fetch(import.meta.env.VITE_API_BASE_URL + '/auth/logout', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                'Authorization': 'Bearer '+ token
            },
        });

        if (!response.ok) {
            throw new Error('Failed to logout')
        }

        localStorage.removeItem('token');

        context.commit('setUser', {
            token: null,
            user: null,
        });
    }
};