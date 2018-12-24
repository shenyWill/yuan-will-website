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
                <ul class="content-article-nav" v-for="item in articleArr" :key="item.title">
                    <span class="content-article-img-content"><img :src="item.banner" alt="" class="content-article-img"></span>
                    <div class="content-article-detail">
                        <span class="detail-title">{{item.title}}</span>
                        <div class="detail-context">{{item.desc}}</div>
                        <div class="detail-time"><i class="iconfont icon-shijian"></i> &nbsp;{{item.time}}</div>
                        <div class="detail-btn">查看详情>></div>
                    </div>
                </ul>
            </div>
            <!-- 评论列表 -->
            <div class="index-content-comment">
                <RightBar></RightBar>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import { parseTime } from '@/utils';
import RightBar from '@/views/common/RightBar';
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
            const mediaResponse = await api.get(config.home.mediaList);
            if (Number(response.status) === 200 && Number(mediaResponse.status) === 200) {
                response.data.forEach(item => {
                    var obj = {};
                    obj.title = item.title.rendered;
                    obj.desc = item.content.rendered.replace(/<\/?.+?>/g, '');
                    obj.time = parseTime(item.date);
                    obj.id = item.id;
                    item['_links']['wp:featuredmedia'] && mediaResponse.data.forEach(mediaItem => {
                        if (item['_links']['wp:featuredmedia'][0].href === mediaItem['_links']['self'][0].href) {
                            obj.banner = mediaItem.guid.rendered;
                        }
                    });
                    this.articleArr.push(obj);
                });
            }
        }
    },
    components: {
        RightBar
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
        box-sizing: border-box;
        padding: 10px 120px;
        background-color: #eeeeee;
    }
    .banner-image {
        height: 100%;
        border-radius: 10px;
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
        width: 60%;width: 60%;
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
        // height: 2000px;
        background-color: #fff;
        float: left;
        position: relative;
        border-radius: 10px;
    }
    .index-content-comment {
        width: 23%;
        // height: 1000px;
        // background-color: #fff;
        float: right;
        // border-radius: 10px;
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
        margin: 50px auto 0 auto;
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
    }
}
</style>
