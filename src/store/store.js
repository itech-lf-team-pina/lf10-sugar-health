import {createStore} from "vuex";
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
const initialState = {
    accountId: "",
    accountName: "",
    profileId: "",
    profileName: "",
}

export const store = createStore({
    state () {
        return initialState
    },
    mutations: {
        setAccountName (state, name) {
            state.accountName = name;
        },
        setProfileName (state, name) {
            state.profileName = name;
        },
        setAccountId (state, id) {
            state.accountId = id;
        },
        setProfilId (state, id) {
            state.profileId = id;
        }
    },
    plugins: [vuexLocal.plugin]
})
