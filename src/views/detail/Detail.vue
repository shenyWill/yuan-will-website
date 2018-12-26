<template>
    <div class="detail">
        <div class="detail-title">{{title}}</div>
        <p class="detail-explain">{{author}} 发表于：{{time}} &nbsp;&nbsp;&nbsp;分类：{{category}}</p>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import { mapGetters } from 'vuex';
import { parseTime } from '@/utils';
export default {
    data () {
        return {
            title: '',
            author: 'yuanwill',
            time: '',
            category: ''
        };
    },
    computed: {
        ...mapGetters([
            'categoriesList'
        ])
    },
    methods: {
       async responseAPI () {
           const response = await api.get(config.home.lastestArt + '/' + this.$route.query.id);
           if (Number(response.status) === 200) {
               this.title = response.data.title.rendered;
               this.time = parseTime(response.data.date);
               this.categoriesList.forEach(item => {
                   if (item.id === response.data.categories[0]) {
                       this.category = item.name;
                   } else if (item.children.length) {
                       item.children.forEach(childItem => {
                           if (childItem.id === response.data.categories[0]) {
                               this.category = childItem.name;
                           }
                       });
                   }
               });
           }
       }
    },
    mounted () {
        this.responseAPI();
    },
    watch: {
        '$route' (to, from) {
            this.responseAPI();
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
        margin: 0 0 10px 0;
    }
}
</style>
