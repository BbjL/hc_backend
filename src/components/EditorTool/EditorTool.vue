<template>
    <div>
      <div id="editor"></div>
    </div>
</template>


<style>
  .w-e-menu{
    z-index: 100 !important;
  }
  .w-e-text-container{
    height:400px;
    z-index:2 !important;
  }
  .w-e-text{
    overflow-y: auto;
  }
</style>

<script>
  import E from  'wangeditor'
  export default{
    props:{
      isClear:Boolean,
      isUpdate:String,
    },
    data(){
      return {
        editor:{}
      }
    },
    mounted() {


      const editor = new E('#editor');
      this.editor = editor;
      this.editor.customConfig.uploadImgShowBase64 = true;   // 使用 base64 保存图片

      this.editor.customConfig.onchange =  html =>{ // 监听编辑器变化

        const content = html; //获取编辑器内容
        const isEmpty = this.editor.txt.text(); //判断编辑器是否为空，清除textarea内的标签

        if(isEmpty === ''){
          this.$emit('editing',content,true);      //如果内容为空
        }else{
          this.$emit('editing',content,false);
        }

      };

      editor.create();

      this.editor.txt.html('')

    },
    watch:{
      isClear:{
        handler(newV,oldV){
          if(newV){
            this.editor.txt.clear();
          }
        },
        deep:true
      },
      isUpdate:{
        handler(newV,oldV){
          this.editor.txt.html(this.isUpdate);
        },
        deep: true
      }
    }
  }
</script>
