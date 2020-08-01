<template>
    <div class="login-wrap" v-loading="loading">
      <div id="back">
        <div class="backRight">
          <div class="log-wrapper">
            <img src="../../assets/images/logo.png" alt="logo">
          </div>
        </div>
        <div class="backLeft">
          <div class="log-wrapper">
            <img src="../../assets/images/logo.png" alt="logo">
          </div>
        </div>
      </div>
      <div id="slideBox">
        <div class="topLayer">
          <div class="left">
            <div class="content">
              <form id="form-signup" method="post" onsubmit="return false;">
                <h2>找管理员要个账号呗~~~</h2>
                <div class="first-div">
                  <div class="eye-left-div"></div>
                  <div class="eye-right-div"></div>
                  <div class="mouth-div"></div>
                  <div class="tear-div"></div>
                </div>
                <div class="form-element form-submit">
                  <button id="signUp" class="signup" type="submit" name="signup">注册</button>
                  <button id="goLeft" class="signup off">登陆</button>
                </div>
              </form>
            </div>
          </div>
          <div class="right">
            <div class="content">
              <h2>海创</h2>
              <form id="form-login" method="post" onsubmit="return false;">
                <div class="form-element form-stack">
                  <label for="username-login" class="form-label">账号</label>
                  <input v-model="account" id="username-login" type="text" name="username">
                </div>
                <div class="form-element form-stack">
                  <label for="password-login" class="form-label">密码</label>
                  <input v-model="pwd" required id="password-login" type="password" name="password">
                </div>
                <div class="form-element form-submit">
                  <button id="logIn" class="login" type="submit" name="login" @click="login">登陆</button>
                  <button id="goRight" class="login off" name="signup">注册</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: "index",
  data(){
    return {
      account:'',
      pwd:'',
      redirect:'',
      loading:false
    }
  },
  mounted() {
    this.toggleAnimate()
  },
  methods:{
    toggleAnimate(){
      $(document).ready(function () {
        $('#goRight').on('click', function () {
          $('#slideBox').animate({
            'marginLeft': '0' });

          $('.topLayer').animate({
            'marginLeft': '100%' });

        });
        $('#goLeft').on('click', function () {
          if (window.innerWidth > 769) {
            $('#slideBox').animate({
              'marginLeft': '50%' });

          } else
          {
            $('#slideBox').animate({
              'marginLeft': '20%' });

          }
          $('.topLayer').animate({
            'marginLeft': '0' });

        });
      });
    },

    //登陆
    login(){
      const _account = this.account;
      const _pwd = this.pwd;

      if(_account&&_pwd != ''){
        this.loading = true
        this.$store.dispatch('loginIn' , {username:_account ,password: _pwd})
          .then( () => {
            this.$router.push({path: this.redirect || '/home' })
          })
          .catch(err => {
            this.loading = false
            this.$message({type:'error' , message:'账号或密码错误'})
          })
      }
    },

    //校验
    loginValide(){
      Promise.resolve()
        .then(() => {
          return this.dispatch('getSessionID')
        })
        .then(res => {
          if( !auth.getAdminInfo('username' )){
            return Promise.reject()
          }
        })
        .catch(err => {
          this.$router.push({path:'/login'});
        })
    }
  },
  watch:{
    $route:{
      handler:function(route){
        const query = route.query
        if(query){
          this.redirect = query.redirect;
        }

      },
      immediate:true
    },
  }
}
</script>

<style scoped>
  .login-wrap {
    margin: 0;
    height: 100%;
    overflow: hidden;
    width: 100% !important;
    box-sizing: border-box;
    font-family: "Roboto", sans-serif;
  }

  .backRight {
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
    background: #03A9F4;
  }

  .backLeft {
    position: absolute;
    left: 0;
    width: 50%;
    height: 100%;
    background: #673AB7;
  }

  #back {
    width: 100%;
    height: 100%;
    position: absolute;
  }

  .canvas-back {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10;
  }

  #slideBox {
    width: 50%;
    max-height: 100%;
    height: 100%;
    overflow: hidden;
    margin-left: 50%;
    position: absolute;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  .topLayer {
    width: 200%;
    height: 100%;
    position: relative;
    left: 0;
    left: -100%;
  }

  label {
    font-size: 0.8em;
    text-transform: uppercase;
  }

  input {
    background-color: transparent;
    border: 0;
    outline: 0;
    font-size: 1em;
    padding: 8px 1px;
    margin-top: 0.1em;
  }

  .left {
    width: 50%;
    height: 100%;
    overflow: scroll;
    background: #2C3034;
    left: 0;
    position: absolute;
  }
  .left label {
    color: #e3e3e3;
  }
  .left input {
    border-bottom: 1px solid #e3e3e3;
    color: #e3e3e3;
  }
  .left input:focus, .left input:active {
    border-color: #03A9F4;
    color: #03A9F4;
  }
  .left input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #2C3034 inset;
    -webkit-text-fill-color: #e3e3e3;
  }
  .left a {
    color: #03A9F4;
  }

  .right {
    width: 50%;
    height: 100%;
    overflow: scroll;
    background: #f9f9f9;
    right: 0;
    position: absolute;
  }
  .right label {
    color: #212121;
  }
  .right input {
    border-bottom: 1px solid #212121;
  }
  .right input:focus, .right input:active {
    border-color: #673AB7;
  }
  .right input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #f9f9f9 inset;
    -webkit-text-fill-color: #212121;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 100%;
    width: 80%;
    margin: 0 auto;
    position: relative;
  }

  .content h2 {
    font-weight: 300;
    font-size: 2.6em;
    margin: 0.2em 0 0.1em;
  }

  .left .content h2 {
    color: #03A9F4;
  }

  .right .content h2 {
    color: #673AB7;
  }

  .form-element {
    margin: 1.6em 0;
  }
  .form-element.form-submit {
    margin: 1.6em 0 0;
  }

  .form-stack {
    display: flex;
    flex-direction: column;
  }

  .checkbox {
    -webkit-appearance: none;
    outline: none;
    background-color: #e3e3e3;
    border: 1px solid #e3e3e3;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
    padding: 12px;
    border-radius: 4px;
    display: inline-block;
    position: relative;
  }

  .checkbox:focus, .checkbox:checked:focus,
  .checkbox:active, .checkbox:checked:active {
    border-color: #03A9F4;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px 1px 3px rgba(0, 0, 0, 0.1);
  }

  .checkbox:checked {
    outline: none;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05), inset 15px 10px -12px rgba(255, 255, 255, 0.1);
  }

  .checkbox:checked:after {
    outline: none;
    content: '\2713';
    color: #03A9F4;
    font-size: 1.4em;
    font-weight: 900;
    position: absolute;
    top: -4px;
    left: 4px;
  }

  .form-checkbox {
    display: flex;
    align-items: center;
  }
  .form-checkbox label {
    margin: 0 6px 0;
    font-size: 0.72em;
  }

  button {
    padding: 0.8em 1.2em;
    margin: 0 10px 0 0;
    width: auto;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 1em;
    color: #fff;
    line-height: 1em;
    letter-spacing: 0.6px;
    border-radius: 3px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
    border: 0;
    outline: 0;
    transition: all 0.25s;
  }
  button.signup {
    background: #03A9F4;
  }
  button.login {
    background: #673AB7;
  }
  button.off {
    background: none;
    box-shadow: none;
    margin: 0;
  }
  button.off.signup {
    color: #03A9F4;
  }
  button.off.login {
    color: #673AB7;
  }

  button:focus, button:active, button:hover {
    box-shadow: 0 4px 7px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.1);
  }
  button:focus.signup, button:active.signup, button:hover.signup {
    background: #0288D1;
  }
  button:focus.login, button:active.login, button:hover.login {
    background: #512DA8;
  }
  button:focus.off, button:active.off, button:hover.off {
    box-shadow: none;
  }
  button:focus.off.signup, button:active.off.signup, button:hover.off.signup {
    color: #03A9F4;
    background: #212121;
  }
  button:focus.off.login, button:active.off.login, button:hover.off.login {
    color: #512DA8;
    background: #e3e3e3;
  }

  @media only screen and (max-width: 768px) {
    #slideBox {
      width: 80%;
      margin-left: 20%;
    }

    .signup-info, .login-info {
      display: none;
    }
  }


  /**
    哭脸
  */
  .first-div{
    width: 300px;
    height: 300px;
    position: relative;
    z-index: 1
  }
  .eye-left-div{
    position:absolute;
    left:40px;
    top:40px;
    width:50px;
    height: 50px;
    background: #03A9F4;
    z-index: 2
  }

  .eye-right-div{
    position:absolute;
    left:210px;
    top:40px;
    width:50px;
    height: 50px;
    background: #03A9F4;
    z-index: 2
  }

  .mouth-div{
    position: absolute;
    width: 48px;
    height: 80px;
    top: 145px;
    left: 50%;
    margin-left: -24px;
    background: #03A9F4;
    -moz-border-radius: 30px;      /* Gecko browsers */
    -webkit-border-radius: 30px;   /* Webkit browsers */
    border-radius:30px;            /* W3C syntax */
    z-index: 2
  }

  .tear-div{
    position: absolute;
    width: 10px;
    height: 24px;
    top: 100px;
    left: 70%;
    background: #03A9F4;
    -moz-border-radius: 10px;      /* Gecko browsers */
    -webkit-border-radius: 10px;   /* Webkit browsers */
    border-radius:10px;            /* W3C syntax */
    z-index: 2
  }

  .log-wrapper{
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    margin: auto;
    height: 300px;
    width: 300px;
  }
  .log-wrapper > img{
    width: 100%;
  }
</style>
