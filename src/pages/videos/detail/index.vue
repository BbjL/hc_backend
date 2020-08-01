<template>
    <div>
      <div class="video-content">
        <el-row  :gutter="10">
          <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
            <video-player class="video-player vjs-custom-skin"
                          style="width: 100%;"
                          ref="videoPlayer"
                          :playsinline="true"
                          :options="playerOptions">
            </video-player>
          </el-col>
          <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6" >
             <div class="info-item">
               <span class="item-title">视频名：</span>
               <span class="item-content">{{videoInfo.name}}</span>
             </div>
            <div class="info-item">
              <span class="item-title">所属组别：</span>
              <span class="item-content">{{videoInfo.group}}</span>
            </div>
            <div class="info-item">
              <span class="item-title">上传人员：</span>
              <span class="item-content">{{videoInfo.auth}}</span>
            </div>
            <div class="info-item">
              <span class="item-title">上传时间：</span>
              <span class="item-content">{{videoInfo.createdTime}}</span>
            </div>
            <div class="info-item">
              <span class="item-title">视频简介：</span>
              <span class="item-content">{{videoInfo.shortIntro}}</span>
            </div>
          </el-col>
        </el-row>
        <el-row class="video-detail">
          <el-col :span="24">
            <span>详细介绍：</span>
            <div v-html="videoInfo.details"></div>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script>
export default {
  name: "Detail",
  data() {
    return {
      videoInfo:{
        name:'',
        group:'',
        createdTime:'',
        auth:"",
        shortIntro:'',
        details:''
      },
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], // 可选的播放速度
        autoplay: false, // 如果为true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: true, // 是否视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [{
          type: "video/mp4", // 类型
          src: 'http://vjs.zencdn.net/v/oceans.mp4'//url地址
          // src: require('../../../assets/VID_20190629_172118.mp4')
        }],
        poster: '', // 封面地址
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true, // 当前时间和持续时间的分隔符
          durationDisplay: true, // 显示持续时间
          remainingTimeDisplay: false, // 是否显示剩余时间功能
          fullscreenToggle: true // 是否显示全屏按钮
        }
      }
    }
  },
  mounted() {
    console.log(this.$route.query)
    const _id = this.$route.query.id
    this.$store.dispatch('reqVidByID' ,_id)
      .then(res => {
        console.log(res)
        if(res.status === 200){
          this.videoInfo.name = res.obj.videoName;
          this.videoInfo.group = res.obj.videoGroupZh;
          this.videoInfo.createdTime = res.obj.createTime
          this.videoInfo.shortIntro = res.obj.videoIntro
          this.videoInfo.details = res.obj.videoDetail
        }
      })
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.video-content
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  font-size:20px
  color: #606266
  line-height:1.5em
.info-item
  margin:40px 0

.video-detail
  margin-top:30px
</style>
