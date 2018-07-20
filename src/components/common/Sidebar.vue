<template>
  <div class="sidebar">
    <el-radio-group v-model="isCollapse">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" :collapse="isCollapse" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.url">
            <template slot="title">
              <i class="el-icon-menu"></i><span slot="title">{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.url">
              {{ subItem.name }}
            </el-menu-item>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.url">
            <i class="el-icon-menu"></i><span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import {getStore} from '../../utils/local';

  export default {
    data() {
      return {
        isCollapse: false
      }
    },
    created() {
      console.log('menus', this.items)
    },
    // 计算属性——代替模板中直接使用表达式
    // 不同于method要携带()
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      },
      ...mapState({
        menu_: state => state.Login.items
      }),
      items() {
        console.log('menu_', this.menu_)
        if (this.menu_.length > 0) {
          return this.menu_
        }
        return JSON.parse(getStore('m'))
      }

    }
  }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  /*.sidebar {*/
    /*display: block;*/
    /*position: absolute;*/
    /*width: 200px;*/
    /*left: 0;*/
    /*top: 70px;*/
    /*bottom: 80px;*/
  /*}*/
  /*.sidebar > ul {*/
    /*height: 100%;*/
    /*overflow: auto;*/
  /*}*/
</style>
