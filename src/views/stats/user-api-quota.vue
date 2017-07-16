<template>
  <div class="components-container" style='height:100vh'>
    <h1>用户API用量</h1>
    <el-row>
      <el-radio-group v-model="groupUnit">
        <el-radio-button label="Daily"></el-radio-button>
        <el-radio-button label="Hourly"></el-radio-button>
      </el-radio-group>
    </el-row>
    <br/>
    <template v-if="apiUsage && Object.keys(apiUsage).length > 0">
      <template v-for="dim in ['second', 'minute', 'hour', 'day', 'month', 'year']">
        <div class='chart-container' v-for='(usage, api) in apiUsage'>
          <label> {{$route.params.user}} </label> / {{api}} / {{dim}}
          <apiUsage :id="api + dim" :dim="dim" height='100%' width='100%' :usage="usage"/>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
    import apiUsage from 'components/Charts/apiUsage'
    import { getUserQuota } from 'api/admin'

    export default {
      components: {
        apiUsage
      },
      created: function() {
        this.fetchData()
      },
      data: function() {
        return {
          groupUnit: 'Daily',
          apiUsage: undefined
        }
      },
      watch: {
        groupUnit() {
          this.fetchData()
        }
      },
      methods: {
        fetchData: function() {
          getUserQuota(this.$route.params.user, this.groupUnit).then(r => {
            this.apiUsage = r.data
          })
        }
      }
    };
</script>

<style scoped>
.chart-container{
  /*position: relative;*/
  width: 100%;
  height: 300px;
}
</style>
