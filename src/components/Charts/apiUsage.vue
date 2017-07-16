<template>
    <div :class="className" :id="id" :style="{height:height,width:width}">
    </div>
</template>
<script>
    // 引入 ECharts 主模块
    const echarts = require('echarts/lib/echarts');

    require('echarts/lib/chart/line');
    // 引入提示框和标题组件
    require('echarts/lib/component/tooltip');
    require('echarts/lib/component/title');
    require('echarts/lib/component/legend');
    require('echarts/lib/component/dataZoom');
    export default {
      name: 'apiQuotaUsage',
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
        dim: {
          type: String,
          default: 'day'
        },
        usage: {
          type: Array,
          default: []
        }
      },

      mounted() {
        this.initChart()
      },

      watch: {
        quota() {
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
            // title: {
                // text: this.$route.params.user + ' / ' + this.usage[0].api + ' / ' + this.dim
            // },
            tooltip : {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            dataZoom: [{
                show: true,
                height: 30,
                xAxisIndex: [ 0 ],
                bottom: 30,
                start: 10,
                end: 80,
                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                handleStyle: {
                  color: '#d3dee5'
                },
                textStyle: { color: '#fff' },
                borderColor: '#90979c'
              }, {
                type: 'inside',
                show: true,
                height: 15,
                start: 1,
                end: 35
              }],
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
          return this.usage.map(x=>x['trunctime'].substr(11, 2))
        },

        series() {
          // console.log("series quota: ")
          // console.log(this.usage)
          var usedData = this.usage.map(x=>x[this.dim + '_used'])
          var remainingData = this.usage.map(x=>x[this.dim + '_limit']
                - x[this.dim + '_used'])

          return [{
            name: 'used',
            type: 'line',
            stack: 'usage',
            areaStyle: {normal: {}},
            data: usedData
          },{
            name: 'remaining',
            type: 'line',
            stack: 'usage',
            areaStyle: {normal: {}},
            data: remainingData
          }]
        }
      }
    }
</script>
