<template>
    <div class="index">
        <!-- 首页banner -->
        <div class="index-banner">
            <img :src="bannerImg" alt="图片没有找到哦" class="banner-image">
            <span class="banner-title">{{bannerObj.title}}</span>
            <span class="banner-content" v-html="bannerObj.content"></span>
            <span class="banner-time" v-html="bannerObj.time"></span>
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
            bannerObj: {}
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
        }
    },
    async mounted () {
        this.bannerResponseAPI();
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
}
</style>
