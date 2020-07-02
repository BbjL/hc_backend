<template>
    <div class="team-surrounding" v-loading="loading">
      <EditorTool  @editing="editing" :isClear="isClear" :isUpdate="isUpdate" />
      <el-button type="primary" style="margin-top: 20px" @click="submitUpdate">修改</el-button>
    </div>
</template>

<script>
    import {reqSurrounding,updateSurrounding} from "../../api";
    import EditorTool from '../../components/EditorTool/EditorTool'
    export default {
        name: "TeamSurrounding",
        components:{EditorTool},
        data(){
          return {
            loading:false,
            isClear:false,           //是否清空内容
            isUpdate:'' ,          // 获取内容
            ruleForm:{              //编辑器内容
              content:''
            }
          }
        },
        mounted() {
          this.init()
        },
        methods:{
          //编辑器通信
          editing(html,empty){ // html为接收的内容 empty判断内容是否为空
            this.ruleForm.content = html;
            if(empty ===1){     // 如果编辑器内容为空
              this.ruleForm.content = ''  // 将发送内容置为空
            }
            this.isClear = false;
          },

          async init(id=32){
            this.loading = true
            const content = await reqSurrounding(id)
            // console.log(content.obj.atmDetail);
            if(content.status == 200 ){
              this.ruleForm.content = this.isUpdate  = content.obj.atmDetail
              this.loading = false
            }else{
              this.loading = false
            }
          },

          submitUpdate(){
              this.$confirm('确定要上传吗？' , '提示' ,{
                type:"warning",
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(()=>{
                ( async ()=>{
                  this.loading = true
                  const _content = this.ruleForm.content;
                  const result = await updateSurrounding(32,_content)
                  if(result.status == 200){
                    this.$message({type: 'success', message:'修改成功！'});
                    this.init();        //重新加载页面
                  }else{
                    this.$message({type: 'error', message:'修改失败！'});
                  }
                  this.loading = false
                })();
              }).catch(()=>{
                this.loading = false
                this.$message({ message:'取消修改！'});
              })
          }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .team-surrounding
    padding 15px
    background-color #ffffff
</style>
