<template>
  <div :class="className" :style="{height:height,width:width}"></div>
</template>

<script>
  import echarts from 'echarts' // echarts theme
  import {debounce} from '@/utils'
  import {statsGetPadUser, statsPadGetList} from '@/api/server'
  import {setStore, getStore, rasPublic} from '@/utils/local'

  require('echarts/theme/macarons')

  export default {
    props: {
      className: {
        type: String,
        default: 'chart'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '350px'
      },
      autoResize: {
        type: Boolean,
        default: true
      },
      chartData: {
        type: Object
      }
    },
    data() {
      return {
        chart: null,
        list: null
      }
    },
    mounted() {
      // this.initChart()
      if (this.autoResize) {
        this.__resizeHanlder = debounce(() => {
          if (this.chart) {
            this.chart.resize()
          }
        }, 100)
        window.addEventListener('resize', this.__resizeHanlder)
      }

      // 监听侧边栏的变化
      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.addEventListener('transitionend', this.__resizeHanlder)
    },
    beforeDestroy() {
      if (!this.chart) {
        return
      }
      if (this.autoResize) {
        window.removeEventListener('resize', this.__resizeHanlder)
      }

      const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
      sidebarElm.removeEventListener('transitionend', this.__resizeHanlder)

      this.chart.dispose()
      this.chart = null
    },
    watch: {
      chartData: {
        deep: true,
        handler(val) {
          this.setOptions(val)
        }
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList() {
        if (getStore('roleid') == 2) {
          statsPadGetList()
            .then(res => {
              this.list = res.data
              if (this.list.length) {
                this.initChart()
              }
            })
        } else {
          statsGetPadUser()
            .then(res => {
              this.list = res.data
              if (this.list.length) {
                this.initChart()
              }
            })
        }


      },
      setOptions({expectedData, actualData} = {}) {
        this.chart.setOption({
          title: {
            text: '每日平板用户'
          },
          xAxis: {
            data: [
              this.list[0].createDate != null ? this.list[0].createDate : this.list[0].createdate,
              this.list[1].createDate != null ? this.list[1].createDate : this.list[1].createdate,
              this.list[2].createDate != null ? this.list[2].createDate : this.list[2].createdate,
              this.list[3].createDate != null ? this.list[3].createDate : this.list[3].createdate,
              this.list[4].createDate != null ? this.list[4].createDate : this.list[4].createdate,
              this.list[5].createDate != null ? this.list[5].createDate : this.list[5].createdate,
              this.list[6].createDate != null ? this.list[6].createDate : this.list[6].createdate
            ],
            boundaryGap: false,
            axisTick: {
              show: false
            }
          },
          grid: {
            left: 10,
            right: 10,
            bottom: 20,
            top: 40,
            containLabel: true
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            },
            padding: [5, 10]
          },
          yAxis: {
            axisTick: {
              show: false
            }
          },
          legend: {
            data: ['expected', 'actual']
          },
          series: [{
            name: '每日平板用户数',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#FF005A',
                lineStyle: {
                  color: '#FF005A',
                  width: 2
                }
              }
            },
            data: [
              this.list[0].totalNum != null ? this.list[0].totalNum : this.list[0].totalnum,
              this.list[1].totalNum != null ? this.list[1].totalNum : this.list[1].totalnum,
              this.list[2].totalNum != null ? this.list[2].totalNum : this.list[2].totalnum,
              this.list[3].totalNum != null ? this.list[3].totalNum : this.list[3].totalnum,
              this.list[4].totalNum != null ? this.list[4].totalNum : this.list[4].totalnum,
              this.list[5].totalNum != null ? this.list[5].totalNum : this.list[5].totalnum,
              this.list[6].totalNum != null ? this.list[6].totalNum : this.list[6].totalnum
            ],
            animationDuration: 2800,
            animationEasing: 'cubicInOut'
          }
            // {
            //   name: '用户总数',
            //   smooth: true,
            //   info: 'line',
            //   itemStyle: {
            //     normal: {
            //       color: '#3888fa',
            //       lineStyle: {
            //         color: '#3888fa',
            //         width: 2
            //       },
            //       areaStyle: {
            //         color: '#f3f8ff'
            //       }
            //     }
            //   },
            //   data: [
            //     this.list[0].total+100,
            //     this.list[1].total+100,
            //     this.list[2].total+100,
            //     this.list[3].total+100,
            //     this.list[4].total+100,
            //     this.list[5].total+100,
            //     this.list[6].total+100
            //   ],
            //   animationDuration: 2800,
            //   animationEasing: 'quadraticOut'
            // }
          ]
        })
      },
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons')
        this.setOptions(this.chartData)
      }
    }
  }
</script>
