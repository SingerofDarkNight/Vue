<template>
	<div class="about">
		<div>
			<div class="content-bg">
				<div class="content-pic-font"></div>
				<headPic></headPic>
			</div>
			<div class="content-game-title">
				<div class="coming-game"></div>
			</div>
			<div class="game-content" v-for="game in listReplay.gamesList" :key="game.id">
				<gameList :game="game"></gameList>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import headPic from '../components/headPic.vue';
  import gameList from '../components/gameList.vue';
  import {ApiService} from "@/common/api.service";
  import {ListGameRequest, ListGameReply, Game} from '@/proto/bbuhot/service/game_pb'
  import {AuthReply, AuthRequest} from "@/proto/bbuhot/service/auth_pb";

  @Component({
    components: {
      headPic,
      gameList
    }
  })

  export default class Home extends Vue {

    listReplay: any = new ListGameReply().toObject();

    // request
    listRequest() {
      const listGameRequest = new ListGameRequest();
      listGameRequest.setGameStatus(Game.Status.PUBLISHED);
      ApiService.listGame(listGameRequest).then(
          ListGameReply => {
            console.log('wtf', ListGameReply.toObject());
            this.listReplay = ListGameReply.toObject();
          }
      );
    }

    testAuth() {
      const authRequest = new AuthRequest();
      authRequest.setAuth("7640HhX6wlou6L181RYTMZhcRcRGHBwmlc2n1rNdHtGw9d8X3HJKrcFItar7TEQyrxJzq0OmQ26qxw4Ii9dO");
      authRequest.setSaltKey("BHdZ7VbY");
      ApiService.checkAuth(authRequest).then(
          res => {
            console.log('test auth ', res.toObject())
          }
      )
    }

    mounted() {
      this.listRequest();
      // this.testAuth();
    }
  }
</script>

<style>
.content-bg {
  width: 100%;
  height: 400px;
  background: url('../assets/imgs/bg.png');
  background-size: 100% 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
}

.content-pic-font {
  width: 600px;
  height: 160px;
  background: url('../assets/imgs/banner.png');
  background-size: 100% 100%;
}

.coming-game {
  width: 221px;
  height: 66px;
  background: url('../assets/imgs/logo.png');
  background-size: 100% 100%;
}

.content-game-title {
  padding: 50px;
}

.game-content {
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>

