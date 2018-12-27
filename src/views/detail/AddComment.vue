<template>
    <div class="add-comment">
        <div class="comment-title">
            <span class="comment-title-explain">发表评论</span>
            <span class="comment-title-desc">电子邮件地址不会被公开，必填项已用<span style="color:red"> * </span>标注</span>
            <div class="comment-content">
                <span>评论<i style="color:red"> * </i></span>
                <textarea placeholder="请输入您的评论" v-model="obj.content"></textarea>
            </div>
            <div class="comment-content">
                <span>昵称<i style="color:red"> * </i></span>
                <input placeholder="请输入您的昵称" v-model="obj['author_name']" />
            </div>
            <div class="comment-content">
                <span>电子邮箱<i style="color:red"> * </i></span>
                <input placeholder="请输入您的电子邮箱" v-model="obj['author_email']"/>
            </div>
            <div class="comment-content">
                <span>您的站点</span>
                <input placeholder="请输入您的站点" v-model="obj['author_url']" />
            </div>
            <div class="comment-btn" @click="submit">提交评论</div>
        </div>
    </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
export default {
    props: ['id'],
    data () {
        return {
            obj: {}
        };
    },
    methods: {
        async submit () {
            let url;
            if (!this.obj.content) {
                this.$message({message: '请填写您的评论再提交，谢谢！', type: 'error'});
                return;
            }
            if (!this.obj['author_name']) {
                this.$message({message: '请填写您的昵称再提交，谢谢！', type: 'error'});
                return;
            }
            if (!this.obj['author_email']) {
                this.$message({message: '请填写您的邮箱地址再提交，谢谢！', type: 'error'});
                return;
            }
            url = `?post=${this.id}&content=${this.obj.content}&author_name=${this.obj['author_name']}&author_email=${this.obj['author_email']}`;
            if (this.obj['author_url']) {
                url += `&author_url=${this.obj['author_url']}`;
            }
            const response = await api.post(config.comments.list + url).catch(item => {
                this.$message({message: '请您填写有效邮箱，别重复提交相同评论，谢谢！', type: 'error'});
            });
            if (response.data) {
                this.$message({message: '评论已经提交，等待博主审核，感谢您的支持！', type: 'success'});
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.add-comment {
    background-color: #fff;
    margin: 20px auto;
    border-radius: 10px;
    padding: 15px;
    position: relative;
    font-size: 20px;
    color: #666;
    .comment-title-explain {
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
    .comment-title-desc {
        font-size: 16px;
        text-indent: 20px;
        display: block;
        color: #999;
    }
    .comment-content{
        margin: 20px 0 20px 20px;
        span {
            display: block;
            margin-bottom: 10px;
        }
        textarea {
            width: 80%;
            height: 120px;
            text-indent: 20px;
            padding-top: 10px;
            background-color: #eee;
            border: 1px solid #dcdcdc;
            font-size: 20px;
        }
        input {
            height: 40px;
            line-height: 40px;
            background-color: #eee;
            border: 1px solid #dcdcdc;
            text-indent: 20px;
            border-radius: 10px;
            width: 400px;
            font-size: 18px;
        }
    }
    .comment-btn {
        display: block;
        margin: 0 auto;
        width: 100px;
        text-align: center;
        height: 45px;
        line-height: 45px;
        border-radius: 10px;
        background-color: #008aff;
        color: #fff;
        cursor: pointer;
        &:hover {
            background-color: #0066ff;
        }
    }
}
</style>
