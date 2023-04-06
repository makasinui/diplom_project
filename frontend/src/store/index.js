import { createStore } from "vuex";
import UserService from "../services/UserService";

const store = createStore({
    state: {},
    mutations:{
        setUser(state, user) {
            localStorage.setItem('user', JSON.stringify(user));
            window.dispatchEvent(new CustomEvent('user'), {
                detail: user
            });
        } 
    },
    getters:{
        user() {
            return JSON.parse(localStorage.getItem('user') || '{}')
        }
    },
    actions: {
        async getUser({ commit }) {
            const userService = new UserService();
            const user = await userService.getUser();
            commit('setUser', user);
            return user;
        }
    }
});

export default store;