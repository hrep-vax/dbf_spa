import { httpRequest } from '../../util/helper.js'

const state = {
    profile: {},
}
const mutations = {
    SET_USER_PROFILE(state, profile) {
        state.profile = profile
    },
}

const getters = {}

const actions = {
  async handleDbfShow(_, payload) {
    console.log(_, payload);
        const response = await httpRequest(
            'get',
            '/api/dbf/dbf-show',
            payload,
            localStorage.getItem('WEB_APP_KIT_TOKEN')
    )
    console.log(response.data);
    return response.data
     
    },

}

export default { state, getters, actions, mutations }
