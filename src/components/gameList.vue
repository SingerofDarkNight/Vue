<template>
    <div class="list-bg">
        <div class="game-type">
            <div class="game-logo">
                <img src="" width="100%" height="100%">
            </div>
            <div class="game-time">
                <div>12-12</div>
                <div>18:00</div>
            </div>
        </div>
        <div class="team">
            <div class="team-name">PSG.LGD</div>
            <div class="team-p">1:1023</div>
        </div>
        <div class="team-logo">
            <div class="logo">
                <img src="" width="100%" height="100%">
            </div>
        </div>
        <div class="btn-group">
            <div class="bo-n">{{game.name}}</div>
            <div style="width:80%">
                <Button type="error" long>预测</Button>
            </div>
            <div style="width:80%">
                <Button type="error" ghost long>详情</Button>
            </div>
        </div>
        <div class="team-logo">
            <div class="logo">
                <img src="" width="100%" height="100%">
            </div>
        </div>
        <div class="team">
            <div class="team-name">PSG.LGD</div>
            <div class="team-p">1:1023</div>
        </div>
        <div class="game-type">
            <div class="game-time">
                <div>12-12</div>
                <div>18:00</div>
            </div>
            <div class="game-logo">
                <img src="" width="100%" height="100%">
            </div>
        </div>
    </div>
</template>

<script lang="ts">
	import Vue from "vue";
  import { Component, Prop} from 'vue-property-decorator'
  import {Game} from "@/proto/bbuhot/service/game_pb";

	@Component
  export default class GameList extends Vue {
    @Prop({}) game!: Game;

    loadGame() {
      let time = this.game.getEndTimeMs();
      console.log(time)
    }

    mounted() {
      this.loadGame();
    }
  }
</script>

<style>
.list-bg {
    width: 1200px;
    height: 170px;
    background: #fff;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.game-type {
    display: flex;
    justify-content: space-around;
    width: 140px;
}

.game-logo {
    width: 68px;
    height: 68px;
}

.game-time {
    width: 68px;
    height: 68px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    font-size:20px;
    font-weight: 600;
    color: rgba(85,85,85,1);
    line-height: 28px;
}

.team {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    height: 68px;
}

.team-name {
    font-size: 24px;
    font-weight: 600;
    color: rgba(51,51,51,1);
    line-height: 33px;
}

.team-p {
    font-size: 18px;
    font-weight: 500;
    color: rgba(251,13,13,1);
    line-height: 25px;
}

.team-logo {
    width: 150px;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.logo {
    width: 59px;
    height: 92px;
}

.btn-group {
    width: 150px;
    height: 150px;
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.bo-n {
    font-size:24px;
    font-weight: 600;
    color: rgba(245,51,19,1);
    line-height: 33px;
}
</style>


