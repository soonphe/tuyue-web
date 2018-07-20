<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu
      mode="vertical"
      :show-timeout="200"
      :default-active="onRoutes"
      :collapse="isCollapse"
      unique-opened router
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in routes" :key="route.id" :item="route" :base-path="route.url"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import {getStore} from '@/utils/local.js'
import { mapState } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    onRoutes() {
      return this.$route.path.replace('/', '');
    },
    // ...mapGetters([
    //   'sidebar'
    // ]),
    ...mapState({
      _sidebar:state => state.App.sidebar,

    }),
    sidebar() {
      return this._sidebar
    },
    routes() {
      // if (this.menu_.length > 0) {
      //   return this.menu_
      // }
      return JSON.parse(getStore('m'))
      // return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
