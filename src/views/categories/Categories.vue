<template>
    <div class="categories">
        <div class="categories-title">
            当前分类：{{categoryName}}
        </div>
        <div class="index-content-article">
            <ul class="content-article-nav" v-for="item in articleArr" :key="item.title">
                <span class="content-article-img-content"><img :src="item.banner" alt="" class="content-article-img"></span>
                <div class="content-article-detail">
                    <span class="detail-title"><router-link :to="'detail?id='+item.id">{{item.title}}</router-link></span>
                    <div class="detail-context">{{item.desc}}</div>
                    <div class="detail-time"><i class="iconfont icon-shijian"></i> &nbsp;{{item.time}}</div>
                    <div class="detail-btn"><router-link :to="'detail?id='+item.id">查看详情>></router-link></div>
                </div>
            </ul>
        </div>
        <div class="index-content-empty" v-if="empty">
            <i class="iconfont icon-empty"></i>
            <span>博主正在努力构建中，请耐心等待~~~</span>
        </div>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import { parseTime } from '@/utils';
import {mapActions, mapGetters} from 'vuex';
export default {
    data () {
        return {
            categoryId: '',
            categoryName: '',
            articleArr: [],
            empty: false
        };
    },
    computed: {
        ...mapGetters([
            'mediaList'
        ])
    },
    mounted () {
        this.categoryId = this.$route.query.id;
        this.categoryName = this.$route.query.title;
        this.articleArr = [];
        this.articleResponseAPI();
    },
    methods: {
        ...mapActions([
            'setMediaList',
            'changeLoading'
        ]),
        async articleResponseAPI () {
            this.changeLoading(true);
            const response = await api.get(config.home.lastestArt, {categories: this.categoryId});
            if (!this.mediaList.length) {
                const mediaResponse = await api.get(config.home.mediaList);
                Number(mediaResponse.status) === 200 && this.setMediaList(mediaResponse.data);
            }
            if (Number(response.status) === 200 && this.mediaList.length) {
                response.data.forEach(item => {
                    var obj = {};
                    obj.title = item.title.rendered;
                    obj.desc = item.content.rendered.replace(/<\/?.+?>/g, '');
                    obj.time = parseTime(item.date);
                    obj.id = item.id;
                    item['_links']['wp:featuredmedia'] && this.mediaList.forEach(mediaItem => {
                        if (item['_links']['wp:featuredmedia'][0].href === mediaItem['_links']['self'][0].href) {
                            obj.banner = mediaItem.guid.rendered;
                        }
                    });
                    this.articleArr.push(obj);
                });
            }
            this.empty = this.articleArr.length === 0;
            this.changeLoading(false);
        }
    },
    watch: {
        '$route' (to, from) {
            this.categoryId = this.$route.query.id;
            this.categoryName = this.$route.query.title;
            this.articleArr = [];
            this.articleResponseAPI();
        }
    }
};
</script>

<style lang="scss" scoped>
.categories {
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    text-align: left;
    margin-top: 20px;
    .categories-title {
        font-size: 24px;
        position: relative;
        padding: 40px 30px 20px 30px;
        box-sizing: border-box;
        color: #000;
        font-weight: bold;
        &::before {
            content: "";
            position: absolute;
            left: 30px;
            top: 20px;
            height: 10px;
            width: 40px;
            background-color: #0066ff;
            display: block;
        }
    }
    .index-content-article {
        width: 100%;
        // height: 2000px;
        background-color: #fff;
        float: left;
        position: relative;
        border-radius: 10px;
    }
    .content-article-img-content{
        display: block;
        height: 185px;
        width: 300px;
        border-radius: 10px;
        overflow: hidden;
    }
    .content-article-nav {
        height: 188px;
        text-align: left;
        overflow: hidden;
        padding: 30px;
        margin: 0;
        border-radius: 10px;
        position: relative;
        &:hover {
            .content-article-img {
                transform: scale(1.1);
            }
        }
    }
    .content-article-img{
        width: 300px;
        transition: all 0.5s;
        height: 185px;
    }
    .content-article-detail {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 30px 30px 30px 345px;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
    .detail-title {
        font-size: 24px;
        color: #333;
        font-weight: lighter;
        margin-bottom: 20px;
        position: relative;
        display: inline-block;
        cursor: pointer;
        &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: 0;
            left: 0;
            background-color: #000;
            visibility: hidden;
            transform: scaleX(0);
            transition-duration: 0.2s;
            transition-timing-function: ease-in-out;
            transition-delay: 0s;
        }
        &:hover {
            &::before {
            visibility: visible;
            transform: scaleX(1);
            }
        }
        a {
            text-decoration: none;
            color: #000;
            &:active {
                color: #000;
            }
        }
    }
    .detail-context {
        font-size: 14px;
        color: #666;
        line-height: 33px;
        display: -webkit-box;
        overflow: hidden;
        height: 90px;
        -webkit-box-orient: vertical;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        line-height: 30px;
    }
    .detail-time {
        font-size: 14px;
        color: #999;
        height: 50px;
        line-height: 50px;
    }
    .detail-btn {
        position: absolute;
        font-size: 16px;
        color: #0066ff;
        right: 40px;
        bottom: 37px;
        cursor: pointer;
        a {
            text-decoration: none;
            color: #0066ff;
            &:active {
                color: #0066ff;
            }
        }
    }
    .index-content-empty {
        height: 700px;
        line-height: 700px;
        position: relative;
        text-align: center;
    }
    .icon-empty {
        font-size: 120px;
        position: absolute;
        top: 200px;
        left: 500px;
        line-height: 30px;
        color: #0066ff;
    }
}
</style>
