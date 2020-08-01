<template>
  <div class="tab-container" v-loading="loading">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.id" :label="item.name" :name="item.id+''">
        <keep-alive>
          <tab-pane v-if="activeName==item.id" :type="item.id+''" @create="showCreatedTimes" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import TabPane from './components/TabPane'
import { mapActions } from 'vuex'

export default {
  name: 'Tab',
  components: { TabPane },
  data() {
    return {
      loading:true,
      tabMapOptions: [],
      activeName: '1',
      createdTimes: 0,
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  created() {
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  mounted(){
    this.getEleSortedGroups()
  },
  methods: {
    ...mapActions([
      'reqAllGroups'
    ]),

    //获取存在的分组
    async getEleSortedGroups(){
      let groupsArr = [];

      const res = await this.reqAllGroups({})
      if(res.status === 200) {
        res.obj.forEach(item => {
          groupsArr.push({id:item.id , name:item.groupName})
        })
        this.tabMapOptions = groupsArr
        console.log(this.tabMapOptions )
      }
      this.loading = false
    },

    showCreatedTimes() {
      this.createdTimes = this.createdTimes + 1
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
