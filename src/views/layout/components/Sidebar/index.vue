<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="onRoutes"
      :collapse="isCollapse"
      router
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <template>
        <el-menu-item index="/dashboard" class="submenu-title-noDropdown">
          <!--<i class="el-icon-info"></i>-->
          <i class="sidebar-icon fa fa-tachometer"></i>
          <span slot="title">首页</span>
        </el-menu-item>
      </template>
      <sidebar-item v-for="route in routes" :key="route.id" :item="route" :base-path="route.url"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getStore} from '@/utils/local.js'
  import {mapState} from 'vuex'
  import SidebarItem from './SidebarItem'

  export default {
    components: {SidebarItem},
    computed: {
      onRoutes() {
        //        return this.$route.path.replace('/', '');
        return this.$route.path;
      },
      ...mapState({
        menu_: state => state.Login.menu,
        _sidebar: state => state.App.sidebar
      }),
      routes() {
        if (this.menu_.length > 0) {
          return this.menu_
        } else {
          return JSON.parse(getStore('menu'))
        }
      },
      isCollapse() {
        return !this._sidebar.opened
      }
    }
  }
</script>
<style>
  /* 2018-08-02 */
  .sidebar-icon {
    width: 14px;
    height: 14px;
    margin-right: 10px;
  }
</style>
