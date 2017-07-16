<template>
  <div v-loading.body="loading" class="components-container" style='height:100vh'>
    <h1>用户用量</h1>
    <template v-if="apiQuota && Object.keys(apiQuota).length > 0">
      <el-row v-for="(user, userName) in apiQuota" v-bind:key="user">
        <el-col :span="24" class='chart-container' v-for="(api, apiName) in user" v-bind:key="userName + '_' + apiName">
          <label>
            <router-link :to="{name: '用户API用量', params: { user: api.consumer }}" tag="a">
              {{api.consumer}}
            </router-link>
          </label> / {{api.api}} / {{api.time}}
          <apiQuota :id="userName + '_' + apiName" height='100%' width='100%' :quota="api"/>
        </el-col>
      </el-row>
    </template>
  </div>
</template>

<script>
    import apiQuota from 'components/Charts/apiQuota';
    import { getQuota } from 'api/admin'
    // import conf from 'Settings';
    export default {
      components: { apiQuota },

      created: function() {
        this.fetchData()
      },

      methods: {
        fetchData() {
          getQuota().then(r => {
            this.apiQuota = r.data
            this.loading = false
          })
        },
      },

      data() {
        return {
          apiQuota: undefined,
          loading: true
        }
      }
    };
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.chart-container {
  /*position: relative;*/
  width: 100%;
  height: 300px;
}
</style>
