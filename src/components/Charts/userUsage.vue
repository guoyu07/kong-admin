<template>
    <div :class="className" :id="id" :style="{height:height,width:width}">
    </div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');

    require('echarts/lib/chart/bar');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    export default {
      name: 'UserUsage',
      props: {
        className: {
          type: String,
          default: 'chart'
        },
        id: {
          type: String,
          default: 'chart'
        },
        width: {
          type: String,
          default: '200px'
        },
        height: {
          type: String,
          default: '120px'
        },
        usage: {
          type: Object
        }
      },

      mounted() {
        this.initChart();
      },

      watch: {
        usage() {
          console.log('usage updated')
          this.setOption()
        }
      },

      methods: {
        initChart() {
          this.chart = echarts.init(document.getElementById(this.id));
          this.setOption();
        },

        setOption() {
          this.chart.setOption({
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                data: this.legend()
            },
            xAxis: {
                type: 'value'
            },
            yAxis: {
              type: 'category',
              inverse: true,
              data: this.yAxis()
            },
            series: this.series()
          })
        },

        legend() {
          if (!this.usage) return []

          let result = new Set()
          for(let user of Object.keys(this.usage)) {
            for(let api of Object.keys(this.usage[user])) {
              result.add(api)
            }
          }
          return [...result].sort()
        },

        yAxis() {
          if (!this.usage) return []
          return Object.keys(this.usage).sort()
        },

        series() {
          let result = []
          let users = this.yAxis()
          let apis = this.legend()
          for (let api of apis) {
            result.push({
                name: api,
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: false,
                        position: 'insideLeft'
                    }
                },
                data: users.map((user) => this.usage[user][api] ? this.usage[user][api]['usage'] : 0)
            })
          }

          console.log('yAxis: ', users)
          console.log('legend: ', apis)
          console.log('data: ', result)
          return result
        }
      }
    }
</script>
