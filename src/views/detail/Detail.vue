<template>
    <div class="detail">
        <div class="detail-title">{{title}}</div>
        <p class="detail-explain">{{author}} 发表于：{{time}} &nbsp;&nbsp;&nbsp;分类：{{category}}</p>
        <div class="detail-content" v-html="content"></div>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import { mapGetters, mapActions } from 'vuex';
import { parseTime, smoothscroll } from '@/utils';
export default {
    data () {
        return {
            title: '',
            author: 'yuanwill',
            time: '',
            category: '',
            categories: '',
            content: ''
        };
    },
    computed: {
        ...mapGetters([
            'categoriesList'
        ])
    },
    methods: {
        ...mapActions([
            'changeLoading'
        ]),
       async responseAPI () {
           this.changeLoading(true);
           const response = await api.get(config.home.lastestArt + '/' + this.$route.query.id);
           if (Number(response.status) === 200) {
               this.title = response.data.title.rendered;
               this.time = parseTime(response.data.date);
               this.categories = response.data.categories[0];
               this.categoriesList.forEach(item => {
                   if (item.id === this.categories) {
                       this.category = item.name;
                   } else if (item.children.length) {
                       item.children.forEach(childItem => {
                           if (childItem.id === this.categories) {
                               this.category = childItem.name;
                           }
                       });
                   }
               });
               this.content = response.data.content.rendered;
           }
           this.changeLoading(false);
       }
    },
    mounted () {
        this.responseAPI();
        smoothscroll();
    },
    watch: {
        '$route' (to, from) {
            this.responseAPI();
            smoothscroll();
        },
        categoriesList () {
            this.categoriesList.forEach(item => {
                if (item.id === this.categories) {
                    this.category = item.name;
                } else if (item.children.length) {
                    item.children.forEach(childItem => {
                        if (childItem.id === this.categories) {
                            this.category = childItem.name;
                        }
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.detail {
    text-align: left;
    overflow: hidden;
    .detail-title {
        height: 80px;
        line-height: 80px;
        padding-left: 30px;
        text-align: center;
        font-size: 24px;
    }
    .detail-explain {
        text-align: center;
        font-size: 20px;
        margin: 0 10px 10px 10px;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
    }
    .detail-content {
        position: relative;
        overflow: hidden;
        font-size: 20px;
        padding: 20px;
        line-height: 35px;
    }
}
</style>
<style lang="scss">
@import '../../assets/css/prism.css';
.detail-content {
    color: #666;
    h2 {
        margin: 30px 0 10px 0;
        padding-left: 10px;
        border-left: 5px solid #0066ff;
        background-color: #f0f2f7;
        font-size: 20px;
        font-weight: 700;
        color: #666;
        letter-spacing: 2px;
        height: 45px;
        line-height: 45px;
    }
    p {
        color: #666;
        font-size: 18px;
    }
    ul {
        padding-left: 0;
    }
    li {
        position: relative;
        text-indent: 30px;
        &:before {
            content: '\E6C3';
            font-family: "iconfont" !important;
            font-size: 18px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            position: absolute;
            left: 5px;
            top: 0;
            text-indent: 0;
            color: #0066ff;
        }
    }
    blockquote {
        margin: 0;
        width: 100%;
        pre {
            margin-top:0;
        }
    }
    h3 {
        margin:0;
        padding: 0;
        width: 100%;
        background: #0066ff;
        border-radius: 10px 10px 0 0;
        height: 45px;
        color: #fff;
        line-height: 45px;
        text-indent: 40px;
        border: 1px solid #0066ff;
        border-left-width: 2px;
        transform: translateX(-1px);
        font-size: 20px;
        position: relative;
        &::before {
            content: '\E64D';
            position: absolute;
            left: 10px;
            top: 1px;
            font-family: "iconfont" !important;
            font-size: 20px;
            font-style: normal;
            -webkit-font-smoothing: antialiased;
            text-indent: 0;
            color: #fff;
            font-weight: normal;
        }
    }
}
</style>
