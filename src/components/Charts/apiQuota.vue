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
      name: 'apiQuota',
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
        quota: {
          type: Object
        }
      },

      mounted() {
        this.initChart();
      },

      watch: {
        quota() {
          console.log('quota updated')
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
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                data: ['used', 'remaining']
            },
            xAxis: {
                data: this.xAxis()
            },
            yAxis: {},
            series: this.series()
          })
        },

        xAxis() {
          return ["second", "minute", "hour", "day", "month", "year"]
        },

        series() {
          let usedData = []
          let remainingData = []
          for (let x of this.xAxis()) {
            let used = this.quota[x + '_' + 'used']
            let limited = this.quota[x + '_' + 'limit']
            let remaining = limited - used
            // console.log(used, limited, remaining)
            usedData.push(used)
            remainingData.push(remaining)
          }

          return [{
              name: 'used',
              type: 'bar',
              stack: 'quota',
              data: usedData
          },{
              name: 'remaining',
              type: 'bar',
              stack: 'quota',
              data: remainingData
          }]
        }
      }
    }
</script>
