import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    articleTitleList: []
};

const mutations = {
    CHANGE_ARTICLE_TITLE_LIST (state, list) {
        state.articleTitleList = [...list];
    }
};

const actions = {
    changeArticleTitleList ({commit}, value) {
        commit('CHANGE_ARTICLE_TITLE_LIST', value);
    }
};

const getters = {
    articleTitleList: state => state.articleTitleList
};

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});

export default store;
