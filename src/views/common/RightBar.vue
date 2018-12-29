<template>
    <div class="right-bar">
        <Notice></Notice>
        <Statistics></Statistics>
        <Tag></Tag>
        <Comment></Comment>
    </div>
</template>
<script>
import Notice from '@/views/common/Notice.vue';
import Comment from '@/views/common/Comment.vue';
import Statistics from '@/views/common/Statistics.vue';
import Tag from '@/views/common/Tag.vue';
export default {
    components: {
        Notice,
        Comment,
        Statistics,
        Tag
    }
};
</script>
