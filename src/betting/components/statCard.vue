<template>
  <div class="card-bg">
    <div class="head-pic">
      <img src="" width="100%" height="100%">
    </div>
    <div class="head-body">
      <div class="nick-name">这里是昵称</div>
      <div class="stat-title">竞猜统计</div>
      <div class="stat-bg">
        <div class="stat-button-bg">
          <Button :ghost="ghost[0]" @click="switchData(0)" class="stat-button" type="info">最近30天</Button>
          <Button :ghost="ghost[1]" @click="switchData(1)"  class="stat-button" type="warning">全部竞猜</Button>
        </div>
        <div class="stat-item-bg">
          <div class="stat-item-1">竞猜次数</div>
          <div class="stat-item-2">365</div>
        </div>
        <div class="stat-item-bg">
          <div class="stat-item-1">胜率</div>
          <div class="stat-item-2">365</div>
        </div>
        <div class="stat-item-bg">
          <div class="stat-item-1">总投注额</div>
          <div class="stat-item-2">365</div>
        </div>
        <div class="stat-item-bg">
          <div class="stat-item-1">总收益</div>
          <div class="stat-item-2">365</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  @Component({})
  export default class statCard extends Vue {
    ghost = [false, true];
    switchData(idx: number) {
      this.ghost = [true, true];
      this.ghost[idx] = false
    }
  }
</script>

<style scoped>
  .card-bg {
    display: flex;
    flex-direction: column;
    width: 270px;
    height: 300px;
    background-color: white;
  }

  .head-pic {
    width: 100%;
    height: 33%;
  }

  .head-body {
    display: flex;
    flex-direction: column;
    background: #fff;
    height: 66%;
    padding: 10px 20px;
  }

  .nick-name {
    color: #000;
    font-size: 22px;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .stat-title {
    color: #000;
    font-size: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
  }

  .stat-bg {
    display: flex;
    flex-direction: column;
    padding-left: 20px;
  }

  .stat-button-bg {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .stat-button {
    width: 50%;
    margin-right: 5px;
  }

  .stat-item-bg {
    display: flex;
    flex-direction: row;
  }
  .stat-item-1 {
    width: 60%;
  }
</style>
