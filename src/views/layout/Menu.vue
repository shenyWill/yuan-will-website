<template>
    <div class="menu">
        <div class="menu-list">
            <img :src="logoImg" alt="" class="logo-img">
            <el-menu mode="horizontal" :router="true" class="menu-nav">
                <el-menu-item index="/"><i class="iconfont icon-zhuye"> 主页</i></el-menu-item>
                <el-submenu v-for="item in categoriesList" :key="item.id" v-if="item.children.length" :index="''+item.index">
                    <template slot="title"><i :class="['iconfont', item.icon]"></i> {{item.name}}</template>
                    <el-menu-item v-for="childItem in item.children" :key="childItem.id" :index="'/categories?id='+childItem.id+'&title='+childItem.name">{{childItem.name}}</el-menu-item>
                </el-submenu>
                <el-menu-item v-for="item in categoriesList" :key="item.id" v-if="!item.children.length && (item.icon !== 'uncategorized')" :index="'/categories?id='+item.id+'&title='+item.name"><i :class="['iconfont', item.icon]"></i> {{item.name}}</el-menu-item>
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
import api from '@/api';
import config from '@/config';
import RightBar from '@/views/common/RightBar';
import { mapActions, mapGetters } from 'vuex';
export default {
  data () {
    return {
        logoImg: require('@/assets/images/logo.png')
    };
  },
  computed: {
      ...mapGetters([
          'categoriesList'
      ])
  },
  components: {
    RightBar
  },
  methods: {
      ...mapActions([
          'setCategoriesList'
      ]),
      async initCategories () {
          const response = await api.get(config.categories.list);
          if (Number(response.status) === 200) {
              let list = [];
              response.data.forEach(item => {
                  if (Number(item.parent) === 0) {
                      const obj = {id: item.id, name: item.name, children: [], icon: item.slug};
                      response.data.forEach(childItem => {
                          if (Number(childItem.parent) !== 0) {
                              if (childItem.parent === item.id) {
                                  obj.children.push({id: childItem.id, name: childItem.name});
                              }
                          }
                      });
                      list.push(obj);
                  }
              });
              this.setCategoriesList(list);
          }
      }
  },
  mounted () {
      this.initCategories();
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
      overflow: hidden;
      width: 1200px;
      height: 60px;
      line-height: 60px;
      position: relative;
      .iconfont {
          color: #000;
          font-size: 22px;
      }
      .is-active .iconfont {
          color: #0066ff !important;
      }
      .is-active {
          color: #0066ff !important;
          font-weight: bold;
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

<style lang="scss">
.menu-list {
    .el-menu-item,.el-submenu {
        // width: 170px;
        text-align: center;
        line-height: 60px;
        padding-right: 30px;
        color: #000;
        font-size: 20px;
        &:hover {
            color: #0066ff !important;
            i,.el-submenu__title {
                color: #0066ff !important;
            }
        }
        i {
            color: #000 !important;
            font-size: 22px;
        }
        .el-submenu__title {
            color: #000;
            line-height: 60px;
            font-size: 20px;
        }
    }
    .is-active {
        .el-submenu__title {
            border: 0 !important;
            color: #0066ff !important;
        }
    }
}
.el-menu--popup {
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    .el-menu-item {
        font-size: 18px;
        color: #000 !important;
        padding: 10px !important;
        height: 50px !important;
        line-height: 50px !important;
        &:hover {
            color: #0066ff !important;
        }
    }
}
</style>
