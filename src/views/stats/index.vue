<template>
  <div v-loading.body="loading" class="components-container" style='height:100vh'>
    <h1>用量总览</h1>
    <UserUsage :usage='usage' height='100%' width='100%'/>
  </div>
</template>

<script>
    import UserUsage from 'components/Charts/userUsage'
    import { getUsage } from 'api/admin'

    export default {
      components: { UserUsage },
      created: function() {
        this.fetchData()
      },
      data() {
        return {
          availability: undefined,
          usage: undefined,
          loading: true
        }
      },
      methods: {
        fetchData() {
            getUsage().then(r => {
              this.usage = r.data
              this.loading = false
              console.log(this.usage)
            })
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
  position: relative;
  width: 100%;
  height: 90vh;
}
</style>
