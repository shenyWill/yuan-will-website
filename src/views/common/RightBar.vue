<template>
    <div class="right-bar">
        <Notice></Notice>
        <Comment></Comment>
    </div>
</template>
<script>
import Notice from '@/views/common/Notice.vue';
import Comment from '@/views/common/Comment.vue';
export default {
    components: {
        Notice,
        Comment
    }
};
</script>
