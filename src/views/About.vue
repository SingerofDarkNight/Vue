<template>
  <div class="home">
    <div class="container">
      <div class="container-slider batman">
        <div class="white-box">
          <img src="" width="100%" height="100%">
        </div>
        <div class="team-name">PSG.LGD</div>
        <div class="proportion">1:1.8</div>
      </div>
      <div class="container-box">
        <div class="box-pic">
          <img src="" width="100%" height="100%">
        </div>
        <div class="match-name">The International 8</div>
        <div class="match-type">淘汰赛 BO5</div>
        <div class="match-time">2018-12-12 18:30</div>
        <div class="match-pic">
          <img src="" width="100%" height="100%">
        </div>
        <div class="bets-end-time">下注截止时间</div>
        <div class="bets-time">2018-12-12 18：30</div>
      </div>
      <div class="container-slider joker">
        <div class="white-box">
          <img src="" width="100%" height="100%">
        </div>
        <div class="team-name">OG</div>
        <div class="proportion">1:0.1</div>
      </div>
    </div>
    <div class="card-group">
      <matchCard/>
    </div>
    <div class="game-bottom">
      <div class="bottom-bar">您还未选择任何盘口，请先选择</div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import matchCard from '../components/matchCard.vue';
  import {ApiService} from "@/common/api.service";
  import {ListGameRequest, ListGameReply, Game} from '@/proto/bbuhot/service/game_pb';

  @Component({
    components: {
      matchCard
    }
  })
  export default class About extends Vue {

    listReplay: any = new ListGameReply().toObject();

    // request
    listRequest() {
      const listGameRequest = new ListGameRequest();
      listGameRequest.setGameStatus(Game.Status.PUBLISHED);
      ApiService.listGame(listGameRequest).then(
          ListGameReply => {
            console.log('about ', ListGameReply.toObject());
            this.listReplay = ListGameReply.toObject();
          }
      );
    }

    mounted() {
      this.listRequest()
    }
  }
</script>

<style>
.container {
  height: 580px;
  width: 100%;
  padding: 40px 165px 60px 165px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
}

.container-slider {
  width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 63px 80px;
}

.container-box {
  width: 360px;
  height: 100%;
  padding: 53px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.white-box {
  width:200px;
  height:200px;
  background:rgba(255,255,255,0.1);
  border-radius:6px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.batman {
  background-size: 100% 100%;
  background: url('../assets/imgs/card-bg-batman.png');
}

.joker {
  background-size: 100% 100%;
  background: url('../assets/imgs/card-bg-joker.png');
}

.team-name {
  font-size:36px;
  font-weight:900;
  color:rgba(255,255,255,1);
  font-family: Arial-Black;
  line-height:51px;
}

.proportion {
  font-size:56px;
  font-weight:600;
  color:rgba(255,255,255,1);
  line-height:78px;
}

.box-pic {
  width: 80px;
  height: 85px;
}

.match-name {
  font-size:24px;
  font-weight:600;
  color:rgba(51,51,51,1);
  line-height:33px;
  white-space: nowrap;
}

.match-type {
  font-size:18px;
  font-weight:600;
  color:rgba(51,51,51,1);
  line-height:25px;
}

.match-time {
  font-size:18px;
  font-weight:600;
  color:rgba(102,102,102,1);
  line-height:25px;
}

.match-pic {
  width: 161px;
  height: 52px;
}

.bets-end-time {
  width:140px;
  height:28px;
  background:rgba(251,13,13,1);
  border-radius:50px;
  font-size:16px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(255,255,255,1);
  line-height:28px;
  display: flex;
  align-content: center;
  justify-content: center;
}

.bets-time {
  font-size:18px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(251,13,13,1);
  line-height:25px;
}

.card-group {
  padding: 42px 165px;
}

.game-bottom {
  padding: 10px 165px;
}

.bottom-bar {
  height: 80px;
  width: 100%;
  background:rgba(255,255,255,1);
  box-shadow:6px 6px 10px 4px rgba(216,214,214,0.5);
  display: flex;
  padding: 0 20px;
  justify-content: flex-start;
  align-items: center;
  font-size:22px;
  font-family:PingFangSC-Semibold;
  font-weight:600;
  color:rgba(51,51,51,1);
  line-height:30px;
  letter-spacing:1px;
}
</style>

