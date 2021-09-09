import { httpRequest } from "../../util/util.js";

const state = {
    userDetails: {},
};
const mutations = {
    SET_USER_DETAILS(state, userDetails) {
        state.userDetails = userDetails;
    },
};

const getters = {};

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
};

export default { state, getters, actions, mutations };
