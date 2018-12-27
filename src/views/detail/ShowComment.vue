<template>
    <div class="show-comment">
        <div class="show-commet-title">评论内容</div>
        <div class="show-comment-list" v-for="item in commentList" :key="item.id">
            <img :src="item.author ? adminSrc : customerSrc" alt="">
            <div class="show-comment-detail">
                <div class="show-comment-detail-header">
                    <span class="detail-name">{{item['author_name']}}</span>
                    <span class="detail-time">评论时间：{{item.date}}</span>
                </div>
                <div class="show-comment-detail-content">
                    <a class="detail-point" :href="'#' + 'comment-' + item.parent" v-if="item.parentName">@ <span style="color: #0066ff">{{item.parentName}}</span></a>
                    <a :id="'comment-' + item.id" class="detail-content">{{item.content}}</a>
                </div>
            </div>
        </div>
        <div class="comment-empty" v-if="!commentList.length">
            <i class="iconfont icon-empty"></i>
            暂无评论~~~
        </div>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import { parseTime } from '@/utils';
export default {
    data () {
        return {
            commentList: [],
            adminSrc: 'http://www.yuanwill.cn/wordpress/wp-content/uploads/2018/12/517c04c8t658394f6e6c2.jpg',
            customerSrc: 'http://www.yuanwill.cn/wordpress/wp-content/uploads/2018/12/52874d1f1c8558ca9bf6739f61e93deb.jpg'
        };
    },
    props: ['id'],
    methods: {
        async responseAPI () {
            const response = await api.get(config.comments.list, {post: this.id});
            if (Number(response.status) === 200) {
                this.commentList = [...response.data];
                this.commentList.forEach(item => {
                    item.date = parseTime(item.date);
                    item.content = item.content.rendered.replace(/<\/?.+?>/g, '');
                    if (Number(item.author) === 1) {
                        this.commentList.forEach(childrenItem => {
                            if (item.parent === childrenItem.id) {
                                item.parentName = childrenItem.author_name;
                            }
                        });
                    }
                });
            }
        }
    },
    mounted () {
        if (!this.id) return;
        this.responseAPI();
    },
    watch: {
        id (val) {
            if (!val) return;
            this.responseAPI();
        }
    }
};
</script>

<style lang="scss" scoped>
.show-comment {
    overflow: hidden;
    background-color: #fff;
    margin: 20px auto;
    border-radius: 10px;
    padding: 15px;
    position: relative;
    .show-commet-title {
        font-size: 20px;
        color: #666;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        position: relative;
        text-indent: 10px;
        line-height: 30px;
        margin-bottom: 10px;
        display: block;
        margin-left: 10px;
        &::before {
            content: '';
            position: absolute;
            display: block;
            left: 0;
            top: 0;
            height: 30px;
            width: 5px;
            background-color: #0066ff;
        }
    }
    .show-comment-list {
        background-color: #eee;
        margin: 20px auto;
        border-radius: 10px;
        padding: 15px;
        position: relative;
        height: 81px;
        img {
            width: 80px;
            height: 80px;
            border-radius: 10px;
        }
    }
    .show-comment-detail {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 15px 15px 15px 110px;
    }
    .show-comment-detail-header {
        height: 35px;
        line-height: 35px;
        overflow: hidden;
    }
    .detail-name {
        font-size: 22px;
        color: #666;
        font-weight: lighter;
        display: block;
        height: 35px;
        float: left;
        margin-right: 20px;
    }
    .detail-time {
        font-size: 16px;
        line-height: 35px;
        display: block;
        height: 35px;
        float: left;
        color: #a8b6c0;
    }
    .detail-point {
        text-decoration: none;
        color: #000;
        font-size: 18px;
        padding-right: 20px;
        font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
        &:active {
            color: #000;
        }
    }
    .detail-content {
        color: #666;
        font-size: 18px;
    }
    .comment-empty {
        text-align: center;
        width: 100%;
        height: 500px;
        line-height: 650px;
        position: relative;
        .iconfont {
            font-size: 120px;
            position: absolute;
            top: 200px;
            left: 495px;
            line-height: 30px;
            color: #0066ff;
        }
    }
}
</style>
