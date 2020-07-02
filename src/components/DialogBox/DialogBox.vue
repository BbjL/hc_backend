<template>
  <!--dialog-->
  <el-dialog title="组别介绍" :visible.sync="dialogFormVisible">
    <div slot="dialogContent"></div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
    export default {
        name: "DialogBox" ,
        props:{
          tit:String
        },
        data(){
          return {
            dialogFormVisible: false,
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*dialog*/
  .dialog_article
    letter-spacing 2px
    line-height 20px
    max-height 500px
    overflow-y auto
    width 100%
</style>
