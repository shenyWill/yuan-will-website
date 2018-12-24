<template>
    <div class="notice">
        <div class="notice-title">网站公告</div>
        <p class="notice-contain">本网站采用vue+wordpress,网站源码存放在个人GitHub上</p>
        <a class="notice-github" href="https://github.com/shenyWill/yuan-will-website" target="_black">
        <img src="http://www.yuanwill.cn/wordpress/wp-content/uploads/2018/12/timg.jpg" alt="图片出差了"></a>
    </div>
</template>

<style lang="scss" scoped>
.notice {
    width: 100%;
    border-radius: 10px;
    background-color: #fff;
    overflow: hidden;
    text-align: left;
    .notice-title {
        font-size: 24px;
        position: relative;
        padding: 40px 30px 20px 30px;
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
    }
    .notice-contain {
        font-size: 18px;
        padding: 0 30px 5px 30px;
        margin-bottom: 0;
        line-height: 35px;
    }
    .notice-github {
        height: 30px;
        display: inline-block;
        padding-left: 30px;
        padding-bottom: 30px;
        img {
            height: 30px;
        }
    }
}
</style>
