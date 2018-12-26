import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    articleTitleList: [], // 文章标题列表
    articleCount: 0, // 文章数量
    commentCount: 0, // 评论数量
    updateTime: '', // 最近更新时间
    categoriesList: [], // 分类列表
    mediaList: [], // 图片列表
    loading: false // 全局loading
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
    },
    CHANGE_LOADING (state, boolean) {
        state.loading = boolean;
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
    },
    changeLoading ({commit}, value) {
        commit('CHANGE_LOADING', value);
    }
};

const getters = {
    articleTitleList: state => state.articleTitleList,
    articleCount: state => state.articleCount,
    commentCount: state => state.commentCount,
    updateTime: state => state.updateTime,
    categoriesList: state => state.categoriesList,
    mediaList: state => state.mediaList,
    loading: state => state.loading
};

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});

export default store;
