<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
  <div class="manage tc">
    <button v-on:click="add">新增</button>
    <!-- v-show指令：一开始就加载 -->
    <div class="input-area" v-show="showAdd">
      <!-- v-model:双向绑定，当输入框的值改变，nameVulue也会改变 -->
      <input type="text" placeholder="请输入人员姓名" v-model="nameValue">
      <button v-on:click="addName">确定</button>
    </div>
    <table>
      <tr>
        <th>姓名</th>
        <th>操作</th>
      </tr>
      <tr>
        <td>张三</td>
        <td>
          <span>编辑</span>
          <span>删除</span>
        </td>
      </tr>
      <!-- 列表渲染 -->
      <!--<tr v-for="(item,index) in peoples">-->
        <!--<td>{{item.name}}</td>  &lt;!&ndash; 模板渲染使用{{}} &ndash;&gt;-->
        <!--<td v-bind:id="index">-->
          <!--<span v-on:click="edit">编辑</span>-->
          <!--<span v-on:click="del">删除</span>-->
        <!--</td>-->
      <!--</tr>-->
    </table>
    <div class="warp" v-show="showEdit">
      <div class="content">
        <input type="text" placeholder="请输入新姓名" v-model="newName">
        <button v-on:click="cancel">取消</button>
        <button v-on:click="editName">确定</button>
      </div>
    </div>
    <footer-nav v-bind:class="{'isManage':isNowPage}"></footer-nav>
  </div>
</template>

<script>
/* 引入组件 */
import FooterNav from '../../components/common/Footer.vue'

export default {
  components: {
    FooterNav
  },
  data () {
    return {
      isNowPage: true,
      showAdd: false,
      showEdit: false,
      /* 新增people函数 */
      peoples: [{'name': 'Jack'}, {'name': 'Joe'}],
      nameValue: '',
      newName: '',
      editId: 0
    }
  },
  methods: {
    add () {
      this.showAdd = true
    },
    addName () {
      var v = this.nameValue
      if (v.trim() === '') {
        alert('请输入新增人员姓名')
      } else {
        var data = {}
        data.name = v
        this.peoples.push(data)
      }
    },
    del (e) {
      var id = e.target.offsetParent.id
      this.peoples.splice(id, 1)
    },
    edit (e) {
      var id = e.target.offsetParent.id
      this.showEdit = true
      this.editId = id
      this.newName = this.peoples[id].name
    },
    cancel () {
      this.showEdit = false
    },
    editName () {
      var v = this.newName
      if (v.trim() === '') {
        alert('请输入姓名')
      } else {
        this.peoples[this.editId].name = this.newName
        this.showEdit = false
      }
    }
  }
  // name: "manage"
}
</script>

<style scoped>

</style>
