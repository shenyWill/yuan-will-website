<template>
    <div class="tags">
        <div class="tags-title">标签云</div>
        <ul class="tag-nav">
            <li :class="['tag-list', 'color-'+item.id%5]" v-for="(item) in tagList" :key="item.id"><a :href="'/tag?id=' + item.id">{{item.name}}</a></li>
        </ul>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { smoothscroll } from '@/utils';
export default {
    computed: {
        ...mapGetters([
            'tagList'
        ])
    },
    mounted () {
        smoothscroll();
    }
};
</script>

<style lang="scss" scoped>
.tags {
    text-align: left;
    overflow: hidden;
    .tags-title {
        width: 100px;
        margin: 0 auto;
        height: 50px;
        line-height: 50px;
        font-size: 22px;
        border-bottom: 1px solid #dcdcdc;
        text-align: center;
    }
    .tag-nav {
        overflow: hidden;
        margin: 0;
        padding: 50px 20px 30px 40px;
        font-size: 20px;
        min-height: 500px;
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
