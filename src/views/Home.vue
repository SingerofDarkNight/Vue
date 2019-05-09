<template>
	<div>
		<div>
			<div class="content-bg">
				<div class="content-pic-font"></div>
				<headPic></headPic>
			</div>
			<div class="content-game-title">
				<div class="coming-game"></div>
			</div>
			<div v-for="game in gamesList" :key="game.id" class="game-content">
				<div class="game-bg">
					<div style="font-size: 20px">比赛编号: {{game.getId()}}</div>
					<div class="game-bo-n">{{game.getName()}}</div>
					<div class="game-deadline">下注截至日期:<br> {{new Date(game.getEndTimeMs())}}</div>
					<Button @click="showBetModal(game)">查看详情</Button>
					<Modal
							v-model="isShowBetModal"
							title="下注选项"
							@on-ok="requestBetOption"
					>
						<CheckboxGroup v-model="betsList">
							<Checkbox v-for="option in game.getBettingOptionsList()" :key="option.id" :label="option.getName()">
								{{option.getName()}} 赔率: {{option.getOdds()}}
							</Checkbox>
						</CheckboxGroup>
					</Modal>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
  import Vue from "vue";
  import Component from "vue-class-component";
  import headPic from '../components/headPic.vue';
  import {ApiService} from '@/common/api.service';
  import {ListGameReply, ListGameRequest, Game, BetRequest} from '@/proto/bbuhot/service/game_pb'

  @Component({
    components: {
      headPic: headPic,
    }
  })

  export default class Home extends Vue {

    listGameReply: ListGameReply = new ListGameReply();
    gamesList: Array<Game> = new Array<Game>();
    isShowBetModal: boolean = false;
    betsList: Array<Game.Bet> = new Array<Game.Bet>();
    pickedGame: Game = new Game();

    // request
    private async listRequest(): Promise<Array<Game>> {
      const listGameRequest = new ListGameRequest();
      listGameRequest.setGameStatus(Game.Status.PUBLISHED);

      this.listGameReply = await ApiService.listGame(listGameRequest);

      if (this.listGameReply.hasAuthErrorCode()) {
        // TODO: deal with error.
      }

      return this.listGameReply.getGamesList();
    }
    private requestBetOption() {
      const betRequest = new BetRequest();
      betRequest.setGameId(this.pickedGame.getId()!);
      betRequest.setBetsList(this.betsList);
      console.log('request best option', this.betsList);
    }

    private async loadGamesList() {
      this.gamesList = await this.listRequest();
    }

    private showBetModal(game: Game) {
      this.isShowBetModal = !this.isShowBetModal;
      this.betsList = new Array<Game.Bet>();
      this.pickedGame = game;
    }

    async mounted() {
      this.loadGamesList();
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

	.game-bg {
		width: 1200px;
		height: 170px;
		background: #fff;
		margin-bottom: 16px;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.game-bo-n {
		font-size: 48px;
		font-weight: 600;
		color: rgba(245, 51, 19, 1);
		text-align: center;
	}

	.game-deadline {
		width: 400px;
		height: 68px;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 16px;
		font-weight: 600;
		color: rgba(85, 85, 85, 1);
		text-align: center;
	}

</style>

