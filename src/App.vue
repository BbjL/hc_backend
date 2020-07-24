<template>
  <div id="app" >
    <router-view />
  </div>
</template>


<script>
  export default {



  }
</script>

<style>
  #app{
    height: 100% ;
    background-color: white;
  }
  .clearfix{
    *zoom: 1;
  }
  .clearfix:after{
    display: block;
    content: '';
    clear:both;
  }

</style>

