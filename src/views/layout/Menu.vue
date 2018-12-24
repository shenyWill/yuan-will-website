<template>
    <div class="menu">
        <div class="menu-list">
            <img :src="logoImg" alt="" class="logo-img">
            <el-menu mode="horizontal" :router="true" class="menu-nav">
                <el-menu-item index="/"><i class="iconfont icon-zhuye"> 主页</i></el-menu-item>
                <el-menu-item index="/case/index"><i class="iconfont icon-xiangmu"> 实战案例</i></el-menu-item>
                <el-submenu index="3">
                    <template slot="title"><i class="iconfont icon-biji"> Web前端</i></template>
                    <el-menu-item index="/index/1">选项1</el-menu-item>
                    <el-menu-item index="/index/2">选项2</el-menu-item>
                    <el-menu-item index="/index/3">选项3</el-menu-item>
                </el-submenu>
                <el-menu-item index="/index/4"><i class="iconfont icon-fenxiang"> JAVA</i></el-menu-item>
                <el-menu-item index="/index/4"><i class="iconfont icon-fenxiang"> NodeJS</i></el-menu-item>
                <el-menu-item index="/index/5"><i class="iconfont icon-biji"> 生活随笔</i></el-menu-item>
                <el-submenu index="8">
                    <template slot="title"><i class="iconfont icon-biji"> 关于博主</i></template>
                    <el-menu-item index="/index/8">选项1</el-menu-item>
                    <el-menu-item index="/index/9">选项2</el-menu-item>
                    <el-menu-item index="/index/7">选项3</el-menu-item>
                </el-submenu>
            </el-menu>
        </div>
        <!-- 子页面 -->
        <div class="content">
            <div class="content-left"><router-view></router-view></div>
            <div class="content-right">
                <RightBar></RightBar>
            </div>
        </div>
    </div>
</template>

<script>
import RightBar from '@/views/common/RightBar';
export default {
  data () {
    return {
        logoImg: require('@/assets/images/logo.png')
    };
  },
  components: {
    RightBar
  }
};
</script>

<style lang="scss" scoped>
.menu {
  .el-menu-item,.el-submenu {
    font-size: 20px;
  }
  .el-submenu__title {
      font-size: 20px;
  }
  .menu-list {
      position: relative;
      overflow: hidden;
      height: 100px;
      box-sizing: border-box;
      padding: 23px 150px;
      background-color: #fff;
      .is-active,.el-menu-item {
          border: 0 !important;
      }
  }
  .logo-img {
      width: 106px;
      height: 53px;
      margin-right: 30px;
      float: left;
  }
  .menu-nav {
      border: 0;
      float: left;
      .iconfont {
          color: #000;
          font-size: 20px;
      }
      .is-active .iconfont {
          color: #0066ff;
      }
      .el-submenu {
          margin-top: 0px;
      }
  }
  .content {
    width: 80%;
    margin: 0 auto;
    overflow: hidden;
    .content-right {
        width: 24%;
        float: right;
        margin-top: 10px;
    }
    .content-left {
        width: 74%;
        // height: 2000px;
        margin-top: 10px;
        background-color: #fff;
        float: left;
        position: relative;
        border-radius: 10px;
    }
  }
}
</style>
