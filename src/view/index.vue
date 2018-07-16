<template xmlns:v-on="http://www.w3.org/1999/xhtml">
  <div>
    欢迎来到人员管理系统
    <!-- 绑定class类名isIndex -->
    <footer-nav v-bind:class="{'isIndex':isNowPage}"></footer-nav>
    <button v-on:click="testHttp">测试网络请求</button>
  </div>
</template>
(1,10)
<script>
import axios from 'axios'
import { getAdvertList } from '../api/server.js'
/* 1.引入组件 */
import FooterNav from '../components/common/Footer.vue'

export default {
  /* 2.局部注册 */
  components: {
    axios,
    FooterNav /* 3.使用组件 */
  },
  data () {
    return {
      isNowPage: true
    }
  },
  methods: {
    testHttp() {
      // 测试请求携带参数
      let pageNum=1
      let pageSize=2
      getAdvertList({pageNum, pageSize}).then(res => {
        console.log(res)
        // if (res.resultCode === 200) {
        //   // this.ads = res.result
        //   alert('请求成功')
        // }
      })
    }

  }
}

</script>

<style scoped>

</style>
