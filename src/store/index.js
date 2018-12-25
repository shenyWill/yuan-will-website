import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    articleTitleList: [],
    articleCount: 0,
    commentCount: 0,
    updateTime: '',
    categoriesList: [],
    mediaList: []
};

const mutations = {
    CHANGE_ARTICLE_TITLE_LIST (state, list) {
        state.articleTitleList = [...list];
    },
    CHANGE_ATRICLE_COUNT (state, count) {
        state.articleCount = count;
    },
    CHANGE_COMMENT_COUNT (state, count) {
        state.commentCount = count;
    },
    CHANGE_UPDATE_TIME (state, dataTime) {
        state.updateTime = dataTime;
    },
    SET_CATEGORIES_LIST (state, list) {
        state.categoriesList = [...list];
    },
    SET_MEDIA_LIST (state, list) {
        state.mediaList = [...list];
    }
};

const actions = {
    changeArticleTitleList ({commit}, value) {
        commit('CHANGE_ARTICLE_TITLE_LIST', value);
    },
    changeArticleCount ({commit}, value) {
        commit('CHANGE_ATRICLE_COUNT', value);
    },
    changeCommentCount ({commit}, value) {
        commit('CHANGE_COMMENT_COUNT', value);
    },
    changeUpdateTime ({commit}, value) {
        commit('CHANGE_UPDATE_TIME', value);
    },
    setCategoriesList ({commit}, value) {
        commit('SET_CATEGORIES_LIST', value);
    },
    setMediaList ({commit}, value) {
        commit('SET_MEDIA_LIST', value);
    }
};

const getters = {
    articleTitleList: state => state.articleTitleList,
    articleCount: state => state.articleCount,
    commentCount: state => state.commentCount,
    updateTime: state => state.updateTime,
    categoriesList: state => state.categoriesList,
    mediaList: state => state.mediaList
};

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});

export default store;
