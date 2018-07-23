<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/home' }">
                    <i class="el-icon-menu"></i>首页</el-breadcrumb-item>
                <el-breadcrumb-item>
                    {{ $route.name}}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <el-tabs v-model="active_name" @tab-click="handleClick">
                <el-tab-pane label="平板端" name="first"></el-tab-pane>
                <el-tab-pane label="手机端" name="second"></el-tab-pane>
                <el-tab-pane label="平板锁屏广告" name="third"></el-tab-pane>
            </el-tabs>
        </div>
        <div>
            <el-button type="success" @click="addAds">添加广告</el-button>
        </div>
        <div style="margin:20px 0">
            <el-table :data="ads" border fit style="width: 100%">
                <el-table-column label="广告图" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <img :src="ip+scope.row.img_url" style="width:100%;height:100%" />
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="广告标题" show-overflow-tooltip>
                </el-table-column>
                <el-table-column prop="update_at" :formatter="date_format" label="发布时间" show-overflow-tooltip>
                </el-table-column>
                <el-table-column fixed="right" label="操作">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row)">编辑</el-button>
                        <el-button @click="del(scope.row.id)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import { allAd, delAd } from '../../api/server.js'
import { time_format } from '../../utils/date.js'
import { ip } from '../../utils/local.js';
export default {
    data() {
        return {
            value: '',
            loading: false,
            dialogTableVisible: false,
            dialogFormVisible: false,
            select_word: '',
            addForm: {

            },
            ip: ip,
            formLabelWidth: '120px',
            ads: [],
            // active_name: this.advertType == 'pd' ? 'first' : this.advertType == 'app' ? 'second' : 'third'
            active_name: 'first'
        }
    },
    created() {
        // this.getAds(1, 10, this.advertType)
        this.handleClick()
    },
    computed: {
        ...mapState({
            advertType: state => state.Ads.advert_type ? state.Ads.advert_type : 'pd'
        }),
    },

    methods: {
        ...mapActions(['saveAds', 'saveType', 'clearAds']),
        addAds() {
            this.clearAds()
            this.$router.push({
                path: '/adsEdit'
            })
        },
        edit(row) {
            this.saveAds(row)
            this.$router.push({
                path: '/adsEdit'
            })
        },
        del(advert_id) {
            console.log('id', this.advertType)
            delAd({ advert_id })
                .then(res => {
                    if (res.code === '000000') {
                        this.getAds(1, 10, this.advertType)
                        this.$message.success('删除成功')
                    }
                })
        },

        handleClick() {
            console.log('点击', this.active_name)
            if (this.active_name == 'first') {
                this.getAds(1, 10, 'pd')
                this.saveType('pd')
            } else if (this.active_name == 'second') {
                this.getAds(1, 10, 'app')
                this.saveType('app')
            } else {
                this.getAds(1, 10, 'stdby')
                this.saveType('stdby')
            }
        },
        getAds(page, pageSize, advertType) {
            allAd({ page, pageSize, advertType })
                .then(res => {
                    console.log(res)
                    if (res.code == '000000') {
                        this.ads = res.result
                    }
                })
        },
        date_format(row, col) {
            if (row.create_at)
                return time_format(row.create_at, 'yyyy-MM-dd hh:mm:ss')
        }


    }
}
</script>
<style lang="scss" scoped>
.handle-box {
  margin-bottom: 1%;
  .search {
    width: 30%;
  }
}

.block {
  text-align: center;
  margin-top: 1%;
}
.input_width {
  width: 50%;
}
</style>