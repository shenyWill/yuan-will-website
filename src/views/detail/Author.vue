<template>
    <div class="author">
        <img src="http://www.yuanwill.cn/wordpress/wp-content/uploads/2018/12/517c04c8t658394f6e6c2.jpg" alt="">
        <div class="author-explain">
            <p class="author-name">作者简介 : yuanwill, 90后前端爱好者,技术比较菜，正在持续学习中~~</p>
            <span class="author-desc">Any distant dream is nothing but a fool's insistence</span>
            <div class="author-link">
                <a href="/">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-tianchongzhuye"></use>
                    </svg>
                </a>
                <a href="http://wpa.qq.com/msgrd?v=3&amp;uin=775486362&amp;site=qq&amp;menu=yes" target="_black">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-QQ"></use>
                    </svg>
                </a>
                <a href="https://github.com/shenyWill/yuan-will-website" target="_black">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-GitHub"></use>
                    </svg>
                </a>
                <a href="/">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-weixin"></use>
                    </svg>
                </a>
                <a href="mailto:775486362@qq.com">
                    <svg class="icon" aria-hidden="true">
                        <use xlink:href="#icon-youxiang"></use>
                    </svg>
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.author {
    background-color: #fff;
    margin: 20px auto;
    border-radius: 10px;
    padding: 15px;
    position: relative;
    img {
        width: 150px;
        height: 150px;
        border-radius: 5px;
    }
    .author-explain {
        position: absolute;
        box-sizing: border-box;
        top: 0;
        left: 0;
        padding: 15px 15px 15px 170px;
        height: 100%;
        width: 100%;
    }
    .author-name {
        font-size: 20px;
        color: #666;
        border-bottom: 1px solid #eee;
        padding-bottom: 10px;
        position: relative;
        text-indent: 10px;
        line-height: 30px;
        margin-bottom: 10px;
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
    .author-desc {
        font-size: 20px;
        color: #666;
        text-indent: 20px;
        display: block;
    }
    .author-link {
        margin-left: 10px;
        margin-top: 15px;
        a {
            display: inline-block;
            width: 40px;
            height: 40px;
            text-align: center;
            line-height: 45px;
            border-radius: 5px;
            background-color: #f0f2f7;
            margin-right: 10px;
        }
        svg {
            width: 25px;
            height: 25px;
        }
    }
}
</style>
