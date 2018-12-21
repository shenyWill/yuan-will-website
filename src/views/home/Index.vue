<template>
    <div class="index">
        <!-- 首页banner -->
        <div class="index-banner">
            <img :src="bannerImg" alt="图片没有找到哦" class="banner-image">
            <span class="banner-title">{{bannerObj.title}}</span>
            <span class="banner-content" v-html="bannerObj.content"></span>
            <span class="banner-time" v-html="bannerObj.time"></span>
        </div>
        <div class="index-content">
            <!-- 文章列表 -->
            <div class="index-content-article">
                <span class="content-article-slog"></span>
                <p class="content-article-title">最新文章</p>
            </div>
            <!-- 评论列表 -->
            <div class="index-content-comment"></div>
        </div>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
export default {
    data () {
        return {
            bannerImg: require('@/assets/images/banner.png'),
            bannerObj: {},
            articleArr: []
        };
    },
    methods: {
        async bannerResponseAPI () {
            const response = await api.get(config.home.lastestArt + '/5');
            if (Number(response.status) === 200) {
                this.$set(this.bannerObj, 'title', response.data.title.rendered);
                this.$set(this.bannerObj, 'content', response.data.content.rendered.replace(/<\/?.+?>/g, ''));
                this.$set(this.bannerObj, 'time', response.data.date.replace('T', ' '));
            }
        },
        async articleResponseAPI () {
            const response = await api.get(config.home.lastestArt);
            const MediaResponse = await api.get(config.home.mediaList);
            if (Number(response.status) === 200 && Number(MediaResponse.status) === 200) {
                response.data.forEach(item => {
                    var obj = {};
                    obj.title = item.title.rendered;
                    obj.desc = item.content.rendered.replace(/<\/?.+?>/g, '');
                });
            }
        }
    },
    async mounted () {
        this.bannerResponseAPI();
        this.articleResponseAPI();
    }
};
</script>

<style lang="scss" scoped>
.index {
    width: 100%;
    overflow: hidden;
    .index-banner{
        width: 100%;
        height: 410px;
        position: relative;
        cursor: pointer;
    }
    .banner-image {
        height: 100%;
        width: 100%;
    }
    .banner-title {
        position: absolute;
        top: 100px;
        left: 150px;
        font-size: 50px;
        color: #000;
    }
    .banner-content {
        position: absolute;
        top: 190px;
        left: 150px;
        font-size: 30px;
        color: #666;
        width: 60%;
        overflow: hidden;
        height: 50px;
        display: block;
        text-overflow:ellipsis;
        white-space:nowrap;
    }
    .banner-time {
        position: absolute;
        top: 255px;
        left: 152px;
        font-size: 20px;
        color: #666;
    }
    .index-content {
        width: 100%;
        overflow: hidden;
        background-color: #eeeeee;
        box-sizing: border-box;
        padding: 10px 120px;
    }
    .index-content-article {
        width: 75%;
        height: 2000px;
        background-color: #fff;
        float: left;
        position: relative;
    }
    .index-content-comment {
        width: 23%;
        height: 1000px;
        background-color: #fff;
        float: right;
    }
    .content-article-slog {
        display: block;
        position: absolute;
        width: 40px;
        height: 10px;
        background-color: #0066ff;
        top: 30px;
        left: 30px;
    }
    .content-article-title {
        text-align: left;
        text-indent: 30px;
        font-size: 24px;
        color: #000;
        font-weight: bold;
        margin: 50px auto 60px auto;
    }
}
</style>
