<template>
    <div class="d-flex card">
      <div class="card-title d-flex justify-content-center">
        <div class="card-title-p d-flex align-items-center">猜输赢</div>
        <div class="card-title-status red align-self-center d-flex align-items-center justify-content-center">进行中</div>
      </div>
      <div class="card-body d-flex">
        <div class="win left-win">
          <div class="win-font d-flex align-items-center justify-content-center">
            <div class="win-font-1">胜</div>
          </div>
        </div>
        <div class="card-content flex-column d-flex justify-content-around align-items-center">
          <div class="d-flex justify-content-center align-items-center content-left">0.18</div>
          <div class="name">PSG.LGD</div>
        </div>
        <div class="card-content flex-column d-flex justify-content-around align-items-center">
          <div class="d-flex justify-content-center align-items-center content-right">0.18</div>
          <div class="name">PSG.LGD</div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
  import Vue from 'vue';

	export default class MatchCard extends Vue {

	}
</script>

<style>
.card {
    width: 350px;
    height: 184px;
    border: none;
    box-shadow: 6px 6px 10px 4px rgba(216,214,214,0.5);
    background: rgba(255,255,255,1);
    flex-direction: column;
    margin: 0 30px 30px 0;
}

.card-title {
    height: 53px;
    width: 100%;
    margin: 0;
    border-bottom: 1px solid rgba(238,238,238,1);
}

.card-title-p {
    color: #333;
    font-size: 22px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51,51,51,1);
    line-height: 30px;
    letter-spacing: 2px;
}

.red {
    background: rgba(251,13,13,1);
}

.green {
    background: rgba(60,203,89,1);
}

.card-title-status {
    border-radius: 50px;
    font-size: 12px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255,255,255,1);
    line-height: 20px;
    letter-spacing: 1px;
    width: 80px;
    margin-left: 10px;
}

.card-body {
    margin: 0;
    padding: 0;
    width: 100%;
    position: relative;
}

.card-content {
    width: 50%;
    height: 131px;
    flex-direction: column;
    /* height: 100%; */
    padding: 10px 0;
    border: 1px solid rgba(238,238,238,0.6);
    /* position: absolute; */
}

.content-left {
    width: 101px;
    height: 46px;
    background: rgba(34,30,30,1);
    box-shadow: 0px 2px 4px 0px rgba(31,29,28,0.6);
    border-radius: 4px;
    font-size:22px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255,255,255,1);
    line-height: 30px;
    letter-spacing: 2px;
}

.content-right {
    width: 101px;
    height: 46px;
    background: rgba(60,51,99,1);
    box-shadow: 0px 2px 4px 0px rgba(31,29,28,0.6);
    border-radius: 4px;
    font-size:22px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(255,255,255,1);
    line-height: 30px;
    letter-spacing: 2px;
}

.name {
    font-size: 18px;
    font-family: PingFangSC-Semibold;
    font-weight: 600;
    color: rgba(51,51,51,1);
    line-height: 25px;
    letter-spacing: 2px;
}

.win {
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 34px 34px 0;
    border-color: transparent #fb0d0d transparent transparent;
}

.left-win {
    right: 50%;
}

.right-win {
    right: 0;
}

.win-font {
    font-size: 12px;
    transform: translate(6px, -6px);
    width: 34px;
    height: 34px;
}

.win-font-1 {
    transform: rotate(45deg);
    color: #fff;
}

.d-flex {
  display: -webkit-box !important;
  display: -ms-flexbox !important;
  display: flex !important;
}

.justify-content-center {
  -webkit-box-pack: center !important;
  -ms-flex-pack: center !important;
  justify-content: center !important;
}

.justify-content-between {
  -webkit-box-pack: justify !important;
  -ms-flex-pack: justify !important;
  justify-content: space-between !important;
}

.justify-content-around {
  -ms-flex-pack: distribute !important;
  justify-content: space-around !important;
}

.align-items-center {
  -webkit-box-align: center !important;
  -ms-flex-align: center !important;
  align-items: center !important;
}

.align-self-center {
  -ms-flex-item-align: center !important;
  align-self: center !important;
}
</style>
