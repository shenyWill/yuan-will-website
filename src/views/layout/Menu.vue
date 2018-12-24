<template>
    <div class="menu">
        <div class="menu-list">
            <img :src="logoImg" alt="" class="logo-img">
            <el-menu mode="horizontal" :router="true" class="menu-nav">
                <el-menu-item index="/"><i class="iconfont icon-zhuye"> 主页</i></el-menu-item>
                <el-menu-item index="/case/index"><i class="iconfont icon-xiangmu"> 实战案例</i></el-menu-item>
                <el-submenu index="3">
                    <template slot="title"><i class="iconfont icon-biji"> 笔记</i></template>
                    <el-menu-item index="/index/1">选项1</el-menu-item>
                    <el-menu-item index="/index/2">选项2</el-menu-item>
                    <el-menu-item index="/index/3">选项3</el-menu-item>
                </el-submenu>
                <el-menu-item index="/index/4"><i class="iconfont icon-fenxiang"> 软件分享</i></el-menu-item>
                <el-menu-item index="/index/5"><i class="iconfont icon-biji"> 生活随笔</i></el-menu-item>
            </el-menu>
        </div>
        <!-- 子页面 -->
        <router-view></router-view>
    </div>
</template>

<script>
export default {
  data () {
    return {
        logoImg: require('@/assets/images/logo.png')
    };
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
}
</style>
