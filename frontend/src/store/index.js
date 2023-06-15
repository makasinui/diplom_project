import { createStore } from "vuex";
import UserService from "../services/UserService";

const store = createStore({
    state: {
        user: {}
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        } 
    },
    getters: {
        user(state) {
            return state.user;
        }
    },
    actions: {
        getUser({ commit }) {
            if(localStorage.getItem('user')) {
                commit('setUser', JSON.parse(localStorage.getItem('user')));
                return;
            }

        }
    }
});

export default store;