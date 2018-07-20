<template>
  <div class="menu-wrapper">
    <template v-if="!item.subs">
      <el-menu-item :index="item.url" :class="{'submenu-title-noDropdown':!isNest}">
        <i class="el-icon-info"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
    </template>
    <template v-else>
      <el-submenu :index="item.url">
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span slot="title">{{item.name}}</span>
        </template>
        <template v-for="child in item.subs">
          <el-menu-item :index="child.url">
            <i class="el-icon-menu"></i>
            <span slot="title">{{child.name}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>

  </div>
</template>

<script>
  import path from 'path'

  export default {
    name: 'SidebarItem',
    props: {
      // route配置json
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        onlyOneChild: null
      }
    },
    methods: {
      hasOneShowingChild(children) {
        const showingChildren = children.filter(item => {
          if (item.hidden) {
            return false
          } else {
            // temp set(will be used if only has one showing child )
            this.onlyOneChild = item
            return true
          }
        })
        if (showingChildren.length === 1) {
          return true
        }
        return false
      },
      resolvePath(...paths) {
        return path.resolve(this.basePath, ...paths)
      }
    }
  }
</script>
