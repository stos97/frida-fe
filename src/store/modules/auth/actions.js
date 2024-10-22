export default {
    async login(context, payload) {

        const url = "http://frida.test/api/auth/login";

        const response = await fetch(url, {
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
        const url = "http://frida.test/api/auth/register";

        console.log(payload)
        const response = await fetch(url, {
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
    }
};