<template>
  <div class="dashboard-container">
    <div class="dashboard-text">username:{{username}}</div>
    <div class="dashboard-text">rolename:{{rolename}}</div>
    <!-- <span v-for='role in roles' :key='role'>{{role}}</span> -->
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'dashboard',
    computed: {
      ...mapState({
        user: state => state.Login.user
      }),
      username(){
        return this.user.name
      },
      rolename(){
        return this.user.rolename
      }
      // ...mapGetters([
      //   'name',
      //   'roles'
      // ])
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" type="text/scss" scoped>
  .dashboard {
    &-container {
      margin: 30px;
    }
    &-text {
      font-size: 30px;
      line-height: 46px;
    }
  }
</style>
