<template>
  <div class="components-container" style='height:100vh'>
    <template v-if="apiQuota && Object.keys(apiQuota).length > 0">
      <template v-for="(user, userName) in apiQuota">
        <div class='chart-container' v-for="(api, apiName) in user">
          <apiQuotaSummary :id="userName + '_' + apiName" height='100%' width='100%' :quota="api[0]"/>
        </div>
      </template>
    </template>
  </div>
</template>

<script>
    import apiQuotaSummary from 'components/Charts/apiQuotaSummary';
    export default {
      components: { apiQuotaSummary },
      mounted: function() {
        console.log("mounted, loading data")
        this.$http.get('http://gw-test.qingmang.me/api/stats')
        .then(r => {
          console.log('quota data fetched')
          console.log(r.data)
          this.apiQuota = r.data
          console.log(this.apiQuota)
        })
      },
      data: function() {
        return {
          apiQuota: undefined
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
