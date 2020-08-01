<template>
  <div class="logo" id="home">
    HERE WILL BE ADDED <br>
    MORE INFOMATION IN THE FUTURE
  </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
    name: "Home",
    mounted() {
      let home = document.querySelector('#home')
      home.addEventListener('mousemove', function(e) {
      let circle = document.createElement('span');
      circle.style.zIndex = '100'
      circle.className = 'paopao'
      let x = e.offsetX;
      let y = e.offsetY;
      circle.style.left = x + "px";
      circle.style.top = y + "px";
      let size = Math.random() * 100;
      circle.style.width = 20 + size + "px";
      circle.style.height = 20 + size + "px";
      home.appendChild(circle);
      setTimeout(function() {
        circle.remove();
      }, 1800);
    });
  },
    methods:{
      ...mapActions['getSessionID'],

      loginValidate(){

      }

    }
}
</script>

<style >

  .logo {
    position: relative;
    font-family: "Montserrat", sans-serif;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #000;
    font-size: 50px;
    overflow: hidden;
    text-align: center;
    line-height: 2em
  }

  .paopao {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    position: absolute;
    pointer-events: none;
    background: #55b9f3;
    transform: translate(-50%, -50%);
    animation: blow 4s linear infinite;
  }


  @keyframes blow {
    0% {
      transform: translate(-50%, -50%);
      opacity: 1;
      filter: hue-rotate(0deg);
    }
    100% {
      transform: translate(-50%, -1000%);
      opacity: 0;
      filter: hue-rotate(720deg);
    }
  }
</style>
