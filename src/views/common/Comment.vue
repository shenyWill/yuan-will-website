<template>
    <div class="comment">
        <div class="comment-title"><i class="iconfont icon-pinglun1"></i>最新评论</div>
        <ul class="comment-nav" v-for="item in commentList" :key="item.id+Math.random()">
            <li class="comment-list">
                <div class="comment-author">
                    <img :src="item.author ? adminSrc : customerSrc" alt="">
                    <div class="comment-author-detail">
                        <span class="comment-author-name">{{item.name}}</span>
                        <span class="comment-author-time">{{item.time}}</span>
                    </div>
                </div>
                <div class="comment-say">
                    <span>评论了：&nbsp;</span>
                    <span class="comment-say-article"><router-link :to="'/detail?id=' + item.id">{{item.articleTitle && (item.articleTitle.length > 9 ? (item.articleTitle.substring(0,9) + '...') : item.articleTitle)}}</router-link></span>
                    <span>&nbsp;&nbsp;说：</span>
                </div>
                <div class="comment-context">{{item.articleContext}}</div>
            </li>
        </ul>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import { mapActions, mapGetters } from 'vuex';
import { parseTime } from '@/utils';
export default {
    data () {
        return {
            commentList: [],
            adminSrc: 'http://www.yuanwill.cn/wordpress/wp-content/uploads/2018/12/517c04c8t658394f6e6c2.jpg',
            customerSrc: 'http://www.yuanwill.cn/wordpress/wp-content/uploads/2018/12/52874d1f1c8558ca9bf6739f61e93deb.jpg'
        };
    },
    async mounted () {
        await this.init();
        this.responseAPI();
    },
    computed: {
        ...mapGetters([
            'articleTitleList'
        ])
    },
    methods: {
        ...mapActions([
            'changeArticleTitleList',
            'changeArticleCount',
            'changeCommentCount',
            'changeUpdateTime'
        ]),
        async init () {
            const response = await api.get(config.home.lastestArt, {per_page: 99});
            const articleCount = response.headers['x-wp-total'];
            const updateTime = parseTime(response.headers['date']).split(' ')[0];
            this.changeUpdateTime(updateTime);
            this.changeArticleCount(articleCount);
            if (Number(response.status) === 200) {
                const list = [];
                response.data.forEach(item => {
                    list[item.id] = item.title.rendered;
                });
                this.changeArticleTitleList(list);
            }
        },
        async responseAPI () {
            const response = await api.get(config.comments.list, {page: 1});
            const commentCount = response.headers['x-wp-total'];
            this.changeCommentCount(commentCount);
            if (Number(response.status) === 200) {
                response.data.forEach(item => {
                    let obj = {};
                    obj.name = item['author_name'];
                    obj.time = parseTime(item.date);
                    obj.author = item.author;
                    obj.id = item.post;
                    obj.articleTitle = this.articleTitleList[item.post];
                    obj.articleContext = item.content.rendered.replace(/<\/?.+?>/g, '');
                    this.commentList.push(obj);
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.comment {
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    text-align: left;
    margin-top: 20px;
    margin-bottom: 50px;
    .comment-title {
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
            top: 45px;
            font-size: 26px;
        }
    }
    .comment-nav {
        padding: 10px 20px 10px 30px;
        margin: 5px 0;
    }
    .comment-list {
        height: 140px;
        width: 100%;
        overflow: hidden;
        position: relative;
    }
    .comment-author {
        height: 42px;
        width: 100%;
        overflow: hidden;
        img {
            width: 40px;
            height: 40px;
            border-radius: 5px;
        }
    }
    .comment-author-detail {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding-left: 50px;
        width: 100%;
        height: 42px;
        overflow: hidden;
    }
    .comment-author-name,.comment-author-time {
        font-size: 18px;
        color: #000;
        height: 20px;
        line-height: 20px;
        display: block;
        margin-top: 2px;
    }
    .comment-author-time {
        font-size: 12px;
        color: #999;
    }
    .comment-say {
        height: 22px;
        line-height: 22px;
        color: #333333;
        font-size: 16px;
        margin-top: 15px;
        width: 100%;
        overflow: hidden;
        a {
            text-decoration: none;
            color: #0066ff;
            &:active {
                color: #0066ff;
            }
        }
    }
    .comment-say-article {
        display: inline-block;
        max-width: 200px;
        height: 22px;
    }
    .comment-context {
        font-size: 14px;
        color: #666;
        display: -webkit-box;
        overflow: hidden;
        height: 50px;
        -webkit-box-orient: vertical;
        margin-top: 10px;
        word-break: break-all;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        line-height: 27px;
    }
}
</style>
