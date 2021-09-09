import { httpRequest, httpRequestUploadFile } from "../../util/util.js";

const state = {
    profile: {},
};
const mutations = {
    SET_USER_PROFILE(state, profile) {
        state.profile = profile;
    },
};

const getters = {};

const actions = {
    async handleChangePassword(_, payload) {
        await httpRequest(
            "put",
            "/api/profile/me/change-password",
            payload,
            localStorage.getItem("WEB_APP_KIT_TOKEN")
        );
    },
    async handleShowUserProfile() {
        const response = await httpRequest(
            "get",
            "/api/profile/me",
            {},
            localStorage.getItem("WEB_APP_KIT_TOKEN")
        );

        return response.data;
    },
    async handleUpdateUserProfile({ commit }, payload) {
        const response = await httpRequest(
            "put",
            "/api/profile/me",
            payload,
            localStorage.getItem("WEB_APP_KIT_TOKEN")
        );

        commit("SET_USER_PROFILE", response.data.user);
        return response.data;
    },
    async handleGetUserProfilePic() {
        const response = await httpRequest(
            "get",
            "/api/profile/me/profile-picture",
            {},
            localStorage.getItem("WEB_APP_KIT_TOKEN")
        );

        console.log(response);
        //console.log(Buffer.from(response.data, "binary").toString("base64"));

        let imageURL =
            "data:image/jpg;base64, " +
            Buffer.from(response.data, "binary").toString("base64");

        return imageURL;
    },

    async handleUploadUserProfilePic({ commit }, formData) {
        const response = await httpRequestUploadFile(
            "post",
            "/api/profile/me/upload-profile-picture",
            formData,
            localStorage.getItem("WEB_APP_KIT_TOKEN")
        );

        commit("SET_USER_PROFILE", response.data.user);
        return response.data.user;
    },
};

export default { state, getters, actions, mutations };
