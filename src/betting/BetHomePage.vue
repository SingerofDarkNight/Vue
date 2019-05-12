<template>
	<div>
		<div class="content-bg">
			<div class="content-pic-font"></div>
			<headPic></headPic>
		</div>
		<div class="content-game-title">
			<div class="coming-game"></div>
		</div>
		<div class="game-content">
			<game-list v-for="game in gamesList" v-bind:game="game" :key="game.id">
			</game-list>
		</div>
	</div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import headPic from '../components/headPic.vue';
  import GameList from './components/GameList.vue';
  import {ApiService} from '../common/api.service';
  import {ListGameReply, ListGameRequest, Game, BetRequest, BetReply} from '../proto/bbuhot/service/game_pb';

  @Component({
    components: {
      'game-list': GameList,
      headPic: headPic,
    }
  })
  export default class BetHomePage extends Vue {
    gamesList: Array<Game> = new Array<Game>();

    // request
    private async listGameRequest() {
      const listGameRequest = new ListGameRequest();
      listGameRequest.setGameStatus(Game.Status.PUBLISHED);

      var listGameReply: ListGameReply = await ApiService.listGame(listGameRequest);

      if (listGameReply.hasAuthErrorCode()) {
        // TODO: deal with error.
      }

      this.gamesList = listGameReply.getGamesList();
    }

    async mounted() {
      this.listGameRequest();
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

