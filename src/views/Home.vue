<template>
  <div class="wrapper">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <div class="content">
      <transition name="move" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  // 头部
  import vHead from '../components/common/Header.vue';
  // 左部导航
  import vSidebar from '../components/common/Sidebar.vue';
  import { mapActions } from 'vuex'
  export default {
    components: {
      vHead,
      vSidebar
    },
    created() {},
    methods: {}
  }
</script>

