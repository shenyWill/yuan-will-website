<template>
    <div class="tag">
        <div class="tag-title"><i class="iconfont icon-biaoqian"></i>标签云</div>
        <ul class="tag-nav">
            <li v-if="index < 11" :class="['tag-list', 'color-'+item.id%5]" v-for="(item, index) in tagList" :key="item.id"><a :href="'/tag?id=' + item.id">{{item.name}}</a></li>
        </ul>
        <a href="#/tags" class="tag-more">更多>></a>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import { mapActions, mapGetters } from 'vuex';
export default {
    mounted () {
        this.responseAPI();
    },
    data () {
        return {
            currTagList: [],
            currPage: 1
        };
    },
    methods: {
        ...mapActions([
            'setTagList'
        ]),
        async responseAPI (data = {page: 1}) {
            const response = await api.get(config.tags.list, data);
            if (Number(response.status) === 200) {
                let list = [];
                response.data.forEach(item => list.push({id: item.id, count: item.count, name: item.name}));
                this.currTagList = [...this.currTagList, ...list];
                if (Number(this.currPage) < Number(response.headers['x-wp-totalpages'])) {
                    this.currPage++;
                    this.responseAPI({page: this.currPage});
                } else {
                    this.setTagList(this.currTagList);
                }
            }
        }
    },
    computed: {
        ...mapGetters([
            'tagList'
        ])
    }

};
</script>

<style lang="scss" scoped>
.tag {
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    text-align: left;
    margin-top: 20px;
    .tag-title {
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
            top: 46px;
            font-size: 24px;
        }
    }
    .tag-nav {
        overflow: hidden;
        margin: 0;
        padding: 0 20px 30px 40px;
        font-size: 20px;
        a {
            text-decoration: none;
        }
    }
    .tag-list {
        background-color: #0066ff;
        float: left;
        padding: 5px 10px;
        height: 28px;
        line-height: 28px;
        margin: 5px;
        border-radius: 8px;
        cursor: pointer;
        border: 1px solid #0066ff;
    }
    .color-0 {
        background-color: #b2e0c7;
        border-color: #009944;
        a {
            color: #009944;
        }
    }
    .color-1 {
        background-color: #b2d1ff;
        border-color: #0066ff;
        a {
            color: #0066ff;
        }
    }
    .color-2 {
        background-color: #ffd1b2;
        border-color: #ff6600;
        a {
            color: #ff6600;
        }
    }
    .color-3 {
        background-color: #ffb2ff;
        border-color: #ff00ff;
        a {
            color: #ff00ff;
        }
    }
    .color-4 {
        background-color: #ffb2b2;
        border-color: #ff0000;
        a {
            color: #ff0000;
        }
    }
    .tag-more {
        display: block;
        text-decoration: none;
        font-size: 18px;
        text-align: right;
        margin-bottom: 20px;
        box-sizing: border-box;
        padding-right: 30px;
        color: #0066ff;
        float: right;
        &:active {
            color: #0066ff;
        }
    }
}
</style>
