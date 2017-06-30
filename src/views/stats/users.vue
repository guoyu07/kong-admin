<template>
  <div class="components-container" style='height:100vh'>
    <template v-if="apiQuotaUsage && Object.keys(apiQuotaUsage).length > 0">
      <template v-for="dim in ['second', 'minute', 'hour', 'day', 'month', 'year']">
        <div class='chart-container' v-for='(usage, api) in apiQuotaUsage'>
          <apiQuotaUsage :id="api + dim" :dim="dim" height='100%' width='100%' :usage="usage"/>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
    import apiQuotaUsage from 'components/Charts/apiQuotaUsage';
    export default {
      components: { apiQuotaUsage },
      mounted: function() {
        console.log("mounted, loading data for user " + this.$route.params.user)
        var url = 'http://gw-test.qingmang.me/api/stats/' + this.$route.params.user
        console.log('URL: ', url)
        this.$http.get(url)
        .then(r => {
          console.log('quota usage data fetched')
          console.log(r.data)
          this.apiQuotaUsage = r.data
          console.log(this.apiQuotaUsage)
        })
      },
      data: function() {
        return {
          apiQuotaUsage: undefined
        }
      }
    };
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: 300px;
}
</style>
