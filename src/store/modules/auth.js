import { httpRequest } from "../../util/helper.js";

const state = {
    authUser: {},
    userDetails: {},
    tokenIsExpired: false,
};
const mutations = {
    SET_USER_DETAILS(state, userDetails) {
        state.userDetails = userDetails;
    },
    SET_TOKEN_EXPIRATION_STATE(state, isExpired) {
        state.tokenIsExpired = isExpired;
    },

    SET_AUTH_USER(state, { user, userIsLoggedIn }) {
        state.authUser = user
        state.userIsLoggedIn = userIsLoggedIn
    },
};

const getters = {
    getTokenIsExpiredState: (state) => state.tokenIsExpired,
    getAuthUser: state => state.authUser,
    getUserIsAuthenticated: state => Object.keys(state.authUser).length !== 0
};

const actions = {
    async handleLogin({ commit }, { email, password }) {
        const response = await httpRequest("post", "/api/auth/login", {
            email: email,
            password: password,
        });

        //Save the user details and token in the browser
        localStorage.setItem(
            "WEB_APP_KIT_USER",
            JSON.stringify(response.data.user)
        );
        localStorage.setItem("WEB_APP_KIT_TOKEN", response.data.access_token);

        commit("SET_USER_DETAILS", response.data);
        commit('SET_AUTH_USER', { user: response.data.user, userIsLoggedIn: true })
    },
    async handleLogout({ commit }) {
        await httpRequest(
            "post",
            "/api/auth/logout",
            {},
            localStorage.getItem("WEB_APP_KIT_TOKEN")
        );
        localStorage.removeItem("WEB_APP_KIT_USER");
        localStorage.removeItem("WEB_APP_KIT_TOKEN");

        commit("SET_USER_DETAILS", {});
        commit('SET_AUTH_USER', { user: {}, userIsLoggedIn: false })
    },
    async handleRegistration({ commit }, userDetails) {
        console.log(userDetails);
        const response = await httpRequest(
            "post",
            "/api/auth/register",
            userDetails
        );

        //Save the user details and token in the browser
        localStorage.setItem(
            "WEB_APP_KIT_USER",
            JSON.stringify(response.data.user)
        );
        localStorage.setItem("WEB_APP_KIT_TOKEN", response.data.access_token);

        commit("SET_USER_DETAILS", response.data);
        commit('SET_AUTH_USER', { user: response.data.user, userIsLoggedIn: true })
    },
    async handleEmailAvailability(_, email) {
        const response = await httpRequest(
            "post",
            "/api/auth/show-email-availability",
            { email: email }
        );
        return response.data.email_available;
    },
    async handleForgotPassword(_, email) {
        await httpRequest("post", "/api/auth/forgot-password", {
            email: email,
        });

        return;
    },
    async handleResetPassword(_, payload) {
        await httpRequest("post", "/api/auth/reset-password", payload);
        return;
    },

    handleSetTokenExpirationState({ commit }, state) {
        commit("SET_TOKEN_EXPIRATION_STATE", state);
    },

    autoLogin({ commit }) {
        const token = localStorage.getItem('WEB_APP_KIT_TOKEN')
        const user = localStorage.getItem('WEB_APP_KIT_USER')
        if (!token || !user) return

        commit('SET_AUTH_USER', { user: JSON.parse(user), token })
    },
};

export default { state, getters, actions, mutations };
