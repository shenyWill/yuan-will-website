<template>
    <div class="statistics">
        <div class="statistics-title"><i class="iconfont icon-tongji"></i>站点统计</div>
        <div class="statistics-content">
            <span>文章总数：{{this.articleCount}}篇</span>
            <span>评论总数：{{this.commentCount}}个</span>
            <span>最后更新：{{this.updateTime}}</span>
            <span>运行时间：{{distanceTime}}天</span>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { disTime } from '@/utils';
export default {
    computed: {
        ...mapGetters([
            'articleCount',
            'commentCount',
            'updateTime'
        ]),
        distanceTime () {
            let nowDate = new Date();
            let firstDate = new Date('2018-12-05');
            let distance = disTime(firstDate, nowDate);
            return distance;
        }
    }
};
</script>

<style lang="scss" scoped>
.statistics {
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    text-align: left;
    margin-top: 20px;
    .statistics-title {
        font-size: 24px;
        position: relative;
        padding: 40px 30px 20px 70px;
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
        i {
            position: absolute;
            left: 30px;
            top: 43px;
            font-size: 26px;
        }
    }
    .statistics-content {
        padding: 0px 0px 10px 30px;
        font-size: 16px;
        color: #666;
        overflow: hidden;
        span {
            display: block;
            float: left;
            width: 50%;
            text-align: left;
            padding-bottom: 20px;
        }
    }
}
</style>
